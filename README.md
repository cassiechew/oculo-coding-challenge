## Description

This project has been scaffolded using the [NestJS](https://github.com/nestjs/nest) framework. My environment is using:
- node v16.10.0
- npm v8.5.5
- yarn v1.22.18

This challenge has been made and tested with the provided data. Assumptions on structure and function are below.

## Installation

```bash
$ yarn install
```

## Running the app

Prior to using the application, the env file will have to be edited with your values for username, password, database name. I have opted to use postgres here.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Assumptions
I am assuming an incoming data structure for the order route like this:
```json
{
    "flowerList": [
        [10, "R12"],
        [15, "L09"],
        [13, "T58"]
    ]
}
```

I am also interpreting the output to be of this sort of form.

```json
[
    {
        "code": "R12",
        "totalPrice": "12.99",
        "total": 10,
        "bundles": [
            [
                10,
                {
                    "price": 12.99,
                    "quantity": 1
                }
            ]
        ]
    }
]
```

Other assumptions made surround the input. I will be assuming that there is no false input that will be used. 
i.e. 
- using a flowercode that does not exist
- having a quantity that does not conform to the possible bundle combinations.
  - e.g. asking for 13 when the bundle sizes are [2,4,6]

I have allowed for empty orders which has been handled.
