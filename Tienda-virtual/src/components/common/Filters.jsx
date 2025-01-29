/* eslint-disable no-nested-ternary */
import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { applyFilter, resetFilter } from '@/redux/actions/filterActions';
import { selectMax, selectMin } from '@/selectors/selector';
import PriceRange from './PriceRange';

const Filters = ({ closeModal }) => {
  const { filter, isLoading, products } = useSelector((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items
  }));
  const [field, setFilter] = useState({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const didMount = useDidMount();

  const max = selectMax(products);
  const min = selectMin(products);

  const [filterDate, setFilterDate] = useState('');

  const onDateFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  useEffect(() => {
    if (didMount && window.screen.width <= 480) {
      history.push('/');
    }

    if (didMount && closeModal) closeModal();

    setFilter(filter);
    window.scrollTo(0, 0);
  }, [filter]);


  const onPriceChange = (minVal, maxVal) => {
    setFilter({ ...field, minPrice: minVal, maxPrice: maxVal });
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);

    if (field.minPrice > field.maxPrice) {
      return;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

    if (filterFields.some((key) => !!filter[key])) {
      dispatch(resetFilter());
    } else {
      closeModal();
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Marca</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Cargando Filtro</h5>
        ) : (
          <select
            className="filters-brand"
            value={field.brand}
            disabled={isLoading || products.length === 0}
            onChange={onBrandFilterChange}
          >
           <option value="">Todas las marcas</option>
            <option value="nintendo">Nintendo</option>
            <option value="sony">Sony</option>
            <option value="microsoft">Microsoft</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="google">Google</option>
            <option value="amazon">Amazon</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="asus">Asus</option>
            <option value="acer">Acer</option>
            <option value="lg">LG</option>
            <option value="xiaomi">Xiaomi</option>
            <option value="huawei">Huawei</option>
            <option value="panasonic">Panasonic</option>
            <option value="sharp">Sharp</option>
            <option value="toshiba">Toshiba</option>
            <option value="razer">Razer</option>
            <option value="corsair">Corsair</option>
            <option value="logitech">Logitech</option>
            <option value="intel">Intel</option>
            <option value="amd">AMD</option>
            <option value="nvidia">NVIDIA</option>
            <option value="westerndigital">Western Digital</option>
            <option value="seagate">Seagate</option>
            <option value="kingston">Kingston</option>
            <option value="sandisk">SanDisk</option>
            <option value="gopro">GoPro</option>
            <option value="fitbit">Fitbit</option>
            <option value="garmin">Garmin</option>
            <option value="oculus">Oculus</option>
            <option value="htc">HTC</option>
            <option value="canon">Canon</option>
            <option value="nikon">Nikon</option>
            <option value="fujifilm">Fujifilm</option>
            <option value="cocacola">Coca-Cola</option>
            <option value="pepsi">Pepsi</option>
            <option value="nestle">Nestlé</option>
            <option value="unilever">Unilever</option>
            <option value="kraftheinz">Kraft Heinz</option>
            <option value="mondelez">Mondelez</option>
            <option value="mars">Mars</option>
            <option value="generalmills">General Mills</option>
            <option value="tysonfoods">Tyson Foods</option>
            <option value="danone">Danone</option>
            <option value="pepsico">PepsiCo</option>
            <option value="johnsonville">Johnsonville</option>
            <option value="campbells">Campbell’s</option>
            <option value="heinz">Heinz</option>
            <option value="redbull">Red Bull</option>
            <option value="starbucks">Starbucks</option>
            <option value="tacobell">Taco Bell</option>
            <option value="mcdonalds">McDonald’s</option>
            <option value="burgerking">Burger King</option>
            <option value="kfc">KFC</option>
            <option value="subway">Subway</option>
            <option value="dominos">Domino’s</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
            <option value="puma">Puma</option>
            <option value="reebok">Reebok</option>
            <option value="underarmour">Under Armour</option>
            <option value="levis">Levi’s</option>
            <option value="gap">Gap</option>
            <option value="hm">H&M</option>
            <option value="zara">Zara</option>
            <option value="uniqlo">Uniqlo</option>
            <option value="calvinklein">Calvin Klein</option>
            <option value="ralphlauren">Ralph Lauren</option>
            <option value="tommyhilfiger">Tommy Hilfiger</option>
            <option value="victoriassecret">Victoria’s Secret</option>
            <option value="burberry">Burberry</option>
            <option value="chanel">Chanel</option>
            <option value="gucci">Gucci</option>
            <option value="prada">Prada</option>
            <option value="louisvuitton">Louis Vuitton</option>
            <option value="hermes">Hermès</option>
            <option value="ikea">IKEA</option>
            <option value="homedepot">Home Depot</option>
            <option value="lowes">Lowe's</option>
            <option value="walmart">Walmart</option>
            <option value="target">Target</option>
            <option value="costco">Costco</option>
            <option value="walgreens">Walgreens</option>
            <option value="cvs">CVS</option>
            <option value="bestbuy">Best Buy</option>
            <option value="macys">Macy's</option>
            <option value="nordstrom">Nordstrom</option>
            <option value="cargill">Cargill</option>
            <option value="polar">Polar</option>
            <option value="herdez">Herdez</option>
            <option value="cafemadrid">Café Madrid</option>
            <option value="frescolita">Frescolita</option>
            <option value="harpic">Harpic</option>
            <option value="pernodricard">Pernod Ricard</option>
            <option value="nobel">Nobel</option>
            <option value="bic">Bic</option>
            <option value="rexona">Rexona</option>
            <option value="cocacolafemsa">Coca-Cola FEMSA</option>
            <option value="movilnet">Movilnet</option>
            <option value="claro">Claro</option>
            <option value="digitel">Digitel</option>
            <option value="centralmadeirense">Hipermercado Central Madeirense</option>
            <option value="traki">Traki</option>
            <option value="exito">Exito</option>
            <option value="lacasadelascarpas">La Casa de las Carpas</option>
            <option value="beco">Beco</option>
            <option value="farmatodo">Farmatodo</option>

          </select>
        )}
      <div className="filters-field">
      <span>Fecha</span>
      <br /><br />
      <input
        type="date"
        className="filters-date"
        value={filterDate}
        disabled={isLoading || products.length === 0}
        onChange={onDateFilterChange}
      />
      </div>
      </div>
      <div className="filters-field">
        <span>Acomodar por</span>
        <br />
        <br />
        <select
          className="filters-sort-by d-block"
          value={field.sortBy}
          disabled={isLoading || products.length === 0}
          onChange={onSortFilterChange}
        >
          <option value="">Ninguno</option>
          <option value="name-asc">Ascendente A - Z</option>
          <option value="name-desc">Descendente Z - A</option>
          <option value="price-desc">Precio Alto - Low</option>
          <option value="price-asc">Precio Bajo - High</option>
        </select>
      </div>
      <div className="filters-action">
        <button
          className="filters-button button button-small"
          disabled={isLoading || products.length === 0}
          onClick={onApplyFilter}
          type="button"
        >
          Aplicar Filtros
        </button>
        <button
          className="filters-button button button-border button-small"
          disabled={isLoading || products.length === 0}
          onClick={onResetFilter}
          type="button"
        >
          Reiniciar Filtros
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  closeModal: PropType.func.isRequired
};

export default withRouter(Filters);
