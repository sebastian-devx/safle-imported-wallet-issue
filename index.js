const Vault = require('@getsafle/safle-vault');

const vaultStr = 'U2FsdGVkX1+GxDvOgL7d+/Oo8OTPW2T+tSt8kBdZtdrfGyEwe9uYPM7iSUZkboAfwgi6MbbufuLeM68obGCum6Xp18oZ45N+8Qo0xxTUdgivrgw3OEUgFYkTKv59SOCZw3asJI+CiliL4e7e3YbmLw1cf95YM2/JmmFb2Acaw3h1fmg6o20Sp1VLkt8K3HKGkKpVbpmhHX40uGEfE1o+3h2bdKwikg7ZL5ty5ityOPYpmGPKiHRySh6X2SAc60NuSHrE1TJFrqd6W6FbZ8PBQROoMUGW+XGLsDehoz0HStJwxPbDYt7w4szCUo2Bcd6YHE1zKUtGrAMu4VS3FZO38qsBskcvi57grQEwvGeXQyyQKFsiqF1XnLp43I+TdZD7dBNGIIlyW774O1snMWTpU7G+6rDuYux6oJcc2CUh1s/uVpLcj7dhwbEBeqct8M4CkJCjSGMTwwSCQM0g1KDXYxIM2dpVSGO6H1xTX+FR7t7dMJXCmB677qKkXNFyUDdUZcRgz0n8Id/PZ+GiaYKIpufx3rT3IfFTnePAOkYPj2iXylxDomVvGZA7Ulko7LMNuCOFE1SC7qJ3RMUr2eKbGHKhu9H7+L94pZH+zy5ZWT+FPyuIyVB5kazQzAU+7IfUhnjMO0aq40tAO8WRBH/A2wIieK+7+CXKXOEbrpt1Vpo7xLPJWinC3VvEtGbybTrhN+2Fw2JFRqJDlqBxCEDbjZuIUmDPwhkFSXs0otIRjF/eu+1POJRu92M/U1mBItO5doO571olCwKFvdpOQz4raV+xdQPpxkPBUtvGgn2w35iBWexnT1awU4dlO2YyD/V/R1CnhqqyPFvi+7ba1DEF7tnt6C6M8haGDKB9XuzMYsRWMSzhc69GMw56eaFlcfdz0zf+0/C3H1B71HIKISVBmA==';

const decKey = {
    "0": 131,
    "1": 150,
    "2": 76,
    "3": 155,
    "4": 207,
    "5": 192,
    "6": 7,
    "7": 25,
    "8": 160,
    "9": 173,
    "10": 193,
    "11": 93,
    "12": 5,
    "13": 127,
    "14": 63,
    "15": 179,
    "16": 2,
    "17": 210,
    "18": 16,
    "19": 83,
    "20": 205,
    "21": 232,
    "22": 110,
    "23": 213,
    "24": 125,
    "25": 254,
    "26": 252,
    "27": 81,
    "28": 87,
    "29": 40,
    "30": 245,
    "31": 202,
    "32": 196,
    "33": 41,
    "34": 176,
    "35": 192,
    "36": 106,
    "37": 18,
    "38": 76,
    "39": 106,
    "40": 137,
    "41": 1,
    "42": 154,
    "43": 26,
    "44": 247,
    "45": 91,
    "46": 126,
    "47": 8,
    "48": 173,
    "49": 209,
    "50": 200,
    "51": 32,
    "52": 63,
    "53": 203,
    "54": 18,
    "55": 151,
    "56": 94,
    "57": 218,
    "58": 93,
    "59": 110,
    "60": 106,
    "61": 247,
    "62": 233,
    "63": 236
  };

const run = async () => {
    const vault = new Vault( vaultStr );

    const acc = await vault.getAccounts( decKey );
    console.log('accounts', acc );

    //import a wallet
    const nv = await vault.importWallet( '0x0000000000000000000000000000000000000000000000000000000000000082', 222222, decKey );

    await vault.restoreKeyringState( nv.response.vault, 222222, decKey );

    const acc2 = await vault.getAccounts( decKey );
    console.log('accounts after import', acc2 );

    //create a transaction obj, working
    const rawTx = {
        to: '0x384de58015764c50c090bfbc1c7b951800d6ea3d',
        from: acc2.response[0].address,
        value: 100,
        gasLimit: 21000
    }

    await vault.changeNetwork('polygon');
    const trans = await vault.signTransaction( rawTx, 222222, 'polygon' );

    console.log( 'encoded trans - working', trans );

    // notice how the "imported" account sign fails
    const rawTx2 = {
        to: '0x384de58015764c50c090bfbc1c7b951800d6ea3d',
        from: acc2.response[4].address,
        value: 100,
        gasLimit: 21000
    }

    const trans2 = await vault.signTransaction( rawTx2, 222222, 'polygon' );

    console.log( 'encoded trans - failing', trans2 );
}

run();