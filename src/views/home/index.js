/* @flow */
import './style';
import '../../vendor';
import {
  welcome
} from '../../components';
import {
  util
} from '../../components/util';

function home() {
  util();
  welcome('home');

  return 'home';
}

home();

export default home;
