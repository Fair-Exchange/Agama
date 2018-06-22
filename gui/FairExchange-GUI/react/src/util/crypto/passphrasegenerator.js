/******************************************************************************
 * Copyright © 2016 The Waves Core Developers.                                *
 *                                                                            *
 * See the LICENSE files at                                                   *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Waves software, including this file, may be copied, modified, propagated,  *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

import mainWindow from '../mainWindow';

const PassPhraseGenerator = {
  generatePassPhrase: (bitsval) => {
    return mainWindow.bip39.generateMnemonic(bitsval);
  },

  // checks if it's possible that the pass phrase words supplied as the first parameter
  // were generated with the number of bits supplied as the second parameter
  isPassPhraseValid: (passPhraseWords, bits) => {
    // the required number of words based on the number of bits
    // mirrors the generatePassPhrase function above
    const wordsCount = bits / 32 * 3;
    return passPhraseWords && passPhraseWords.length === wordsCount;
  },

  arePassPhraseWordsValid: (passphrase) => {
    return mainWindow.bip39.validateMnemonic(passphrase);
  },
}

export default PassPhraseGenerator;