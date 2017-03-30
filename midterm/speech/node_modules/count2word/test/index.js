const expect = require('chai').expect
const count2Word = require('../src')

describe('count words with at least 2 letters ', () => {

  it('should return an object', () => {

    expect(count2Word('Hello World!')).to.be.an('object')

  })

  it('should return each word as a property and their occurence as a value ', () => {

    expect(count2Word(`Home, sweet, home!`)).to.deep.equal({home: 2, sweet: 1})

    expect(count2Word(`Aujourd'hui, je vais à l'école`)).to.deep.equal({"aujourd'hui": 1, je: 1, vais: 1, "école": 1})

    expect(count2Word(`Tôi là duyệt`)).to.deep.equal({tôi: 1, là: 1, duyệt: 1})

    expect(count2Word(`-She's the best??-Yes,she is!`)).to.deep.equal({she: 2, the: 1, best:1, yes:1, is:1})

    expect(count2Word(`He didn't come...`)).to.deep.equal({he: 1, did: 1, come: 1})

    expect(count2Word(`a a a a a a`)).to.deep.equal({})

    expect(count2Word(``)).to.deep.equal({})

    expect(count2Word(`I love unicorns🦄🦄`)).to.deep.equal({love: 1, unicorns: 1})

  })
})
