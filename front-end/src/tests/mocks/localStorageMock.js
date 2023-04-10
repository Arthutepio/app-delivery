const localStorageMock = {
  id: 3,
  email: 'zebirita@email.com',
  name: 'Cliente Zé Birita',
  role: 'customer',
  token: 'superlongtoken',
};

const localStorageAdmin = {
  id: 1,
  email: 'adm@deliveryapp.com',
  name: 'Delivery App Admin',
  role: 'administrator',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBkZWxpdmVyeWFwcC5'
   + 'jb20iLCJpYXQiOjE2NjgxNzMwNTYsImV4cCI6MTY2ODI1OTQ1Nn0.'
   + 'iutuuWzvKIwhTT-9R-OS8oU0_y0Z-Ma6NprJpq0kngY',
};

const localStorageSeller = {
  id: 2,
  email: 'fulana@deliveryapp.com',
  name: 'Fulana pereira',
  role: 'seller',
  token: 'superlongtoken',
};

module.exports = { localStorageMock, localStorageAdmin, localStorageSeller };