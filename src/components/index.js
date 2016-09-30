/* @flow */
import './style';

export function welcome(name: string) {
  console.log(`welcome to ${name} page...`);

  return name;
}

export function unUsed(name?: string) {
  console.log(`unused ${name || ''} page`);

  return name;
}
