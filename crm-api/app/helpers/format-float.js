import Ember from 'ember';

export function formatFloat([value]) {

  return value.toFixed(2);
}

export default Ember.Helper.helper(formatFloat);
