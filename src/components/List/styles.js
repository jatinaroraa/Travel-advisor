import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px', backgroundColor: '#0B285E', 
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#0B285E', backgroundColor: '#0B285E',
  },
  container: {
    padding: '25px',
    backgroundColor: '#0B285E',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
  text: {
    color: 'white',
    paddingBottom: '30px'
  },
  optionText : {
    color: 'white',
    backgroundColor: '#0B285E',
  }
}));