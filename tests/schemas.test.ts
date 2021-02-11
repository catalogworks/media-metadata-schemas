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
      it('requires all keys', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
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
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })
      it('does not allow forbidden audio file formats', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
           body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/mp3",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('requires duration to be > 1ms', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 0,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('requires properties are of the correct type (duration)', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: "213",
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })
      it('requires properties are of the correct type (tokenId)', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: "213",
            mimeType: "audio/aiff",
            isArtworkNft: true,
            artworkDetail: null,
            artworkDetailNft: {
              "chainId": 1,
              "contractAddress": "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
              "tokenId": "69"
            }
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })
      it('does not allow ethereum networks that are not mainnet or rinkeby', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: "213",
            mimeType: "audio/aiff",
            isArtworkNft: true,
            artworkDetail: null,
            artworkDetailNft: {
              "chainId": 2,
              "contractAddress": "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
              "tokenId": 69
            }
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('does not allow an empty title field', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('does not allow an empty artist field', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('requires the public key to be the Catalog wallet address', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0x0000000000000000000000000000000000000000"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })
      it('requires the artwork hash to be 66 characters', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0x",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(false)
      })

      it('validates a valid Catalog metadata schema (with non-NFT cover art)', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: "An unexpected classic",
            duration: 213,
            mimeType: "audio/aiff",
            isArtworkNft: false,
            artworkDetail: {
              uri: "https://www.rockcellarmagazine.com/wp-content/uploads/2019/03/rick-astley-never-gonna-art.jpg",
              hash: "0xc6006808f8677cbefa783d08e9064d252fbb5c8737978b52db5fdf80db42b5e9",
              mimeType: "image/png",
            },
            artworkDetailNft: null
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(true)
      })
      it('validates a valid Catalog metadata schema (with NFT cover art)', () => {
        const validator = new Validator('catalog-20210202')
        const json = {
          body: {
            version: "catalog-20210202",
            title: "Never Gonna Give You Up",
            artist: "Rick Astley",
            description: null,
            duration: 213.1,
            mimeType: "audio/wav",
            isArtworkNft: false,
            artworkDetail: null,
            artworkDetailNft: {
              "chainId": 1,
              "contractAddress": "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7",
              "tokenId": 69
            }
          },
          seal: {
            signature: "0x2d7c0dc8a9252bb8cf0e654c58badb0585f41941270765e46c238a1692243e6d128bbaf072c2886348d49498794365f60f1793a758a7d1c281affc9c81de61ae1b",
            publicKey: "0xc236541380fc0C2C05c2F2c6c52a21ED57c37952"
          }
        }

        const result = validator.validate(json)
        expect(result).toBe(true)
      })
    })
  })
})
