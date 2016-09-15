import Ember from 'ember';

const { Controller, computed, RSVP, run } = Ember;

export default Controller.extend({

  userState: '',
  states: computed(function() {
    return 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
            .split(' ').map((state) => ({ abbrev: state }));
  }),

  sizes: Ember.A([
    'small (12-inch)',
    'medium (14-inch)',
    'large (16-inch)',
    'insane (42-inch)'
  ]),
  vegetables: Ember.A([
    { name: 'Corn', checked: false },
    { name: 'Onions', checked: false },
    { name: 'Kale', checked: false },
    { name: 'Arugula', checked: false },
    { name: 'Peas', checked: false },
    { name: 'Zucchini', checked: false }]),
  /*
   * Fake promise to fetch data, here you would use ember-data, jQuery.ajax or whatever you want.
   */
   actions: {
    searchtest(term) {
      return new RSVP.Promise(function(resolve) {
      // Just wait for 800ms to 2 seconds for a fake progress, so it feels like a query.
      let waitMS = Math.floor(Math.random() * 2000) + 800;

      let dataFromServer = Ember.A([
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' }
      ]);

      run.later(this, function() {
        /*
         * Two arguments to the resolve:
         * - data from the server
         * - callback to be able to get the 'label'.
         */
        resolve(dataFromServer);
      }, waitMS);
    }.bind(this));
   }
  },
  users: computed(function() {
    let _self = this;
    return new RSVP.Promise(function(resolve) {
      // Just wait for 800ms to 2 seconds for a fake progress, so it feels like a query.
      let waitMS = Math.floor(Math.random() * 2000) + 800;

      let dataFromServer = Ember.A([
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' }
      ]);

      run.later(_self, function() {
        /*
         * Two arguments to the resolve:
         * - data from the server
         * - callback to be able to get the 'label'.
         */
        resolve(dataFromServer);
      }, waitMS);

    });
  }),
  groupedToppings: [
    { groupName: 'Meats', options: ['Pepperoni', 'Sausage', 'Ground Beef', 'Bacon'] },
    { groupName: 'Veg', options: ['Mushrooms', 'Onion', 'Green Pepper', 'Green Olives'] } ]
});
