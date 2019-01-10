describe('Integration test example', function() {
  it('get /', async function() {
    await global.agent
      .get('/')
      .expect('Content-Type', /text/)
      .expect('hello')
      .expect(200)
  })
})
