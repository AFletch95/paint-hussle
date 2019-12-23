function UserQuery(options) {
  try {
    const { select, populate } = options;
    if (!select && !populate) throw 'default';

    const modifiers = [];
    if (select) modifiers.push(query => query.select(select));
    if (populate) {
      if (Array.isArray(populate))
        modifiers.push(query => {
          return populate.reduce((query, populate) => (query = query.populate(populate)), query);
        });
      else modifiers.push(query => query.populate(populate));
    }

    this.exec = async ({ User }, id) => {
      let query = User.findById(id);
      modifiers.forEach(modifier => (query = modifier(query)));
      return await query;
    };
  } catch (err) {
    if (err === 'default') this.exec = async ({ User }, id) => await User.findById(id);
    else throw err;
  }
}

module.exports = {
  getUser: options => {
    if (options == null) {
      options = {
        useAuthToken: true,
      };
    } else {
      if (!typeof options === 'object') throw TypeError('options must be an object');

      switch (typeof options.useAuthToken) {
        case 'boolean':
          break;
        case 'undefined':
          options.useAuthToken = true;
          break;
        default:
          throw TypeError('useAuthToken must be an boolean');
      }
    }

    const userQuery = new UserQuery(options);

    return async (req, res, next) => {
      let id;
      if (options.useAuthToken) id = req.authToken.id;
      const user = await userQuery.exec(req.app.get('db'), id);
      if (!user && options.useAuthToken) {
        res.status(401).json({
          status: 401,
          statusText: 'Unauthorized',
        });
      } else {
        req.user = user;
        next();
      }
    };
  },
};
