const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');

admin.initializeApp();

exports.lowercaseProductName = functions.firestore.document('/products/{documentId}')
    .onCreate((snap, context) => {
        const name = snap.data().name;

        functions.logger.log('Lowercasing product name', context.params.documentId, name);

        const lowercaseName = name.toLowerCase();

        return snap.ref.set({ name_lower: lowercaseName }, { merge: true });
    });

exports.uploadProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { productName, productData } = req.body;

    if (!productName || !productData) {
      return res.status(400).send('Bad Request: Missing productName or productData');
    }

    try {
      const response = await axios.post('https://firebasestorage.googleapis.com/v0/b/ecommerce-react-bucket-joseb/o', {
        name: `products/${productName}`,
        data: productData
      });

      return res.status(200).send(response.data);
    } catch (error) {
      functions.logger.error('Error uploading product:', error);
      return res.status(500).send('Internal Server Error');
    }
  });
});