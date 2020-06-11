import { Typography } from '@material-ui/core';
import Page from '../components/Page';
import classes from './index.module.css';
import Map from '../components/Map';
import MapSearch from '../components/MapSearch';
import MapProjectList from '../components/MapProjectList';

const MainPage = () => (
  <Page>
    <div className={classes.promo}>
      <Typography variant="h5" className={classes.title}>
        Сделай свой район лучше!
      </Typography>
      <Typography>
        Мы поддерживаем все инициативы по благоустройству среды
        {' '}
        <br />
        Сноси заборы и парковки, сажай деревья, облагораживай пустыри
        {' '}
        <br />
        Присоединяйся к активным проектам или найди помощников для своей инициативы
      </Typography>
    </div>
    <div className={classes.map}>
      <MapSearch />
      <MapProjectList />
      <Map />
    </div>
  </Page>
);

export default MainPage;
