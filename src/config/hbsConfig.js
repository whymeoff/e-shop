const hbs = require('hbs')

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
})

hbs.registerHelper('multiply', function(a, b)  {
    return a*b
})