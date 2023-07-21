exports.up = knex => knex.schema.createTable('dishes', table =>{
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')

    table.varchar('image').nullable()
    table.text('title')
    table.text('category')
    table.text('description')
    table.decimal('price', 6, 2)

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('dishes')

