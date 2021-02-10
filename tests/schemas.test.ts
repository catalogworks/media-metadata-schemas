import { Validator } from '../src/validator'

describe('schemas', () => {
  describe('zora', () => {
    describe('20210101', () => {
      it('requires all keys', () => {
        const validator = new Validator('zora-20210101')
        const json = {
          description: 'blah',
          mimeType: 'application/json',
          name: 'who cares'
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('does not allow additional properties', () => {
        const validator = new Validator('zora-20210101')
        const json = {
          description: 'blah',
          mimeType: 'application/json',
          name: 'who cares',
          version: 'zora-01012021',
          someAdditionalProperty: 'okay'
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('requires string values', () => {
        const validator = new Validator('zora-20210101')
        const json = {
          description: 'blah',
          mimeType: 'application/json',
          name: 100,
          version: 'zora-01012021'
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('validates a valid schema', () => {
        const validator = new Validator('zora-20210101')
        const json = {
          description: 'blah',
          mimeType: 'application/json',
          name: 'who cares',
          version: 'zora-01012021'
        }

        const result = validator.validate(json)
        expect(result).toBe(true)
      })
    })
  })
  describe('catalog', () => {
    describe('20210202', () => {
      it('requires all keys', () => { // todo - test body & signature as well
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aif",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://f4.bcbits.com/img/a0581187129_10.jpg",
              hash: "TODO",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('does not allow additional properties', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
           body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            grammyNominated: "I wish",
            mimeType: "audio/aif",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://f4.bcbits.com/img/a0581187129_10.jpg",
              hash: "TODO",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "TODO",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

// TODO - check fields are of proper type
      it('requires properties are of the correct type', () => { // ? does duration need to be a string too?
        const validator = new Validator('catalog-20210202')
        const json = {
        body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: "213",
            mimeType: "audio/aif",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://f4.bcbits.com/img/a0581187129_10.jpg",
              hash: "TODO",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "TODO",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('validates a valid Catalog metadata schema', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aif",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://f4.bcbits.com/img/a0581187129_10.jpg",
              hash: "TODO",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "TODO",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(true)
      })
    })
  })
})
