# Smart Contract

Smart contract for Solana Curriculum in [freeCodeCampWeb3](https://web3.freecodecamp.org/).

[Source Repository](https://github.com/ChiefWoods/smart-contract)

## Built With

### Languages

- [![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=f74b00)](https://www.rust-lang.org//)
- [![JavaScript](https://img.shields.io/badge/Javascript-383936?style=for-the-badge&logo=javascript)](https://js.org/index.html)

### Libraries

#### Rust

- [Borsh](https://borsh.io/)
- [Solana Program](https://docs.rs/solana-program/latest/solana_program/)

#### JavaScript

- [Borsh](https://github.com/near/borsh-js)
- [Solana JavaScript SDK](https://solana-labs.github.io/solana-web3.js/)

### Runtime

- [![Node.js](https://img.shields.io/badge/Node.js-233056?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/en)

### Tools

- [![!Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-2c2c32?style=for-the-badge&logo=visual-studio-code&logoColor=007ACC)](https://code.visualstudio.com/)

## Getting Started

### Prerequisites

1. Update your Solana CLI, rustup and npm package to the latest version

```
solana-install update
```

```
rustup update stable
```

```
npm install npm@latest -g
```

2. Set configuration to use localhost as cluster

```
solana config set --url localhost
```

### Setup

1. Clone the repository

```
git clone https://github.com/ChiefWoods/smart-contract.git
```

2. Install all dependencies

```
cargo fetch
```

```
npm install
```

3. In another terminal, start local cluster

```
solana-test-validator
```

4. Create keypair

```
solana-keygen new -o wallet.json
```

5. Set keypair for config

```
solana config set --keypair wallet.json
```

6. Build program

```
npm run build
```

7. Deploy program to localnet

```
npm run deploy
```

## Issues

View the [open issues](https://github.com/ChiefWoods/smart-contract/issues) for a full list of proposed features and known bugs.

## Acknowledgements

### Resources

- [Shields.io](https://shields.io/)

## Contact

[chii.yuen@hotmail.com](mailto:chii.yuen@hotmail.com)