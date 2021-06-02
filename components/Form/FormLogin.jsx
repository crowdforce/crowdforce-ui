import { Typography } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import UserButton from '../UserButton/UserButton';
import formClasses from './Form.module.css';

const FormLogin = ({ message }) => (
  <div className={formClasses.emptyState}>
    <AssignmentIndIcon color="disabled" style={{ width: '200px', height: '200px' }} />
    <Typography className={formClasses.emptyStateActions}>{message}</Typography>
    <UserButton />
  </div>
);

export default FormLogin;
