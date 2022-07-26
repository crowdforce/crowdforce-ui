import {
  Typography, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Page from '../components/Page';
import classes from './index.module.css';
import Map from '../components/Map';
import ProjectEditor from '../components/ProjectEditor';

const MainPage = () => {
  const [openProjectEditor, setOpenProjectEditor] = useState(false);
  const handleNewProjectClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenProjectEditor(true);
  };

  const handleProjectEditorDialogClose = () => {
    setOpenProjectEditor(false);
  };
  const session = useSession();

  return (
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
        <Map />
      </div>
      <section className={classes.howTo}>
        <Typography variant="h4" className={classes.title}>
          Как это работает
        </Typography>
        <List className={classes.howToList}>
          <ListItem>
            <ListItemAvatar>
              <Typography variant="h3" color="primary">1</Typography>
            </ListItemAvatar>
            <ListItemText primary="Пройдите регистрацию и авторизуйтесь через ваш Телеграм" />
          </ListItem>
          <ListItem>
            <ListItemAvatar className={classes.howToStep}>
              <Typography variant="h3" color="primary">2</Typography>
            </ListItemAvatar>
            <ListItemText primary="Выберите проект, которому Вы можете помочь, или активность" />
          </ListItem>
          <ListItem>
            <ListItemAvatar className={classes.howToStep}>
              <Typography variant="h3" color="primary">3</Typography>
            </ListItemAvatar>
            <ListItemText primary="Телеграм-бот напомнит Вам о времени активности и новостях проекта" />
          </ListItem>
        </List>
      </section>
      <section className={classes.howTo}>
        <Typography variant="h4" className={classes.title}>
          Все через телеграм
        </Typography>
        <List className={classes.howToList}>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6">Авторизация</Typography>}
              secondary={<Typography>Укажи свой телеграм и получи код авторизации</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6">Календарь</Typography>}
              secondary={(
                <Typography>
                  Выбери дату, когда готов помочь, и телеграм-бот напомнит тебе о времени активности
                </Typography>
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6">Общение и новости</Typography>}
              secondary={(
                <Typography>
                  Узнавай первым о последних новостях проектов и достигнутых целях
                </Typography>
              )}
            />
          </ListItem>
        </List>
      </section>
      <section className={classes.howTo}>
        <Typography variant="h4" style={{ paddingBottom: '40px' }}>
          Есть крутая идея по благоустройству, но ты не знаешь как её реализовать?
          {' '}
          <a onClick={handleNewProjectClick} href="#">Предложи проект</a>
          , тебе помогут. Или присоединяйся к активным проектам!
        </Typography>
      </section>
      <ProjectEditor
        open={openProjectEditor}
        onClose={handleProjectEditorDialogClose}
      />
    </Page>
  );
};

export default MainPage;
