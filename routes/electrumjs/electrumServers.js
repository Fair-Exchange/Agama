let electrumServers = {
  kv: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10016,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'KV',
    serverList: [
      'electrum1.ipv6admin.com:10016',
      'electrum2.ipv6admin.com:10016'
    ],
  },
  bntn: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10026,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BNTN',
    serverList: [
      'electrum1.ipv6admin.com:10026',
      'electrum2.ipv6admin.com:10026'
    ],
  },
  eql: { // !estimatefee
    address:'159.65.91.235',
    port: 10801,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'EQL',
    serverList: [
      '159.65.91.235:10801',
      '167.99.204.42:10801'
    ],
  },
  oot: { // !estimatefee
    address: 'electrum1.utrum.io',
    port: 10088,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'OOT',
    serverList: [
      'electrum1.utrum.io:10088',
      'electrum2.utrum.io:10088'
    ],
  },
  coqui: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10011,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'COQUI',
    serverList: [
      'electrum1.ipv6admin.com:10011',
      'electrum2.ipv6admin.com:10011'
    ],
  },
  chain: { // !estimatefee
    address: 'electrum1.chainmakers.co',
    port: 55417,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'CHAIN',
    serverList: [
      'electrum1.chainmakers.co:55417',
      'electrum2.chainmakers.co:55417'
    ],
  },
  glxt: { // !estimatefee
    address: 'electrum1.glx.co',
    port: 60012,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'GLXT',
    serverList: [
      'electrum1.glx.co:60012',
      'electrum2.glx.co:60012'
    ],
  },
  revs: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10003,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'REVS',
    serverList: [
      'electrum1.ipv6admin.com:10003',
      'electrum2.ipv6admin.com:10003'
    ],
  },
  supernet: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10005,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'SUPERNET',
    serverList: [
      'electrum1.ipv6admin.com:10005',
      'electrum2.ipv6admin.com:10005'
    ],
  },
  dex: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10006,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'DEX',
    serverList: [
      'electrum1.ipv6admin.com:10006',
      'electrum2.ipv6admin.com:10006'
    ],
  },
  bots: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10007,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BOTS',
    serverList: [
      'electrum1.ipv6admin.com:10007',
      'electrum2.ipv6admin.com:10007'
    ],
  },
  crypto: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10008,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'CRYPTO',
    serverList: [
      'electrum1.ipv6admin.com:10008',
      'electrum2.ipv6admin.com:10008'
    ],
  },
  dnr: { // !estimatefee
    address: 'denarius.tech',
    port: 50001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'DNR',
    serverList: [
      '144.202.95.223:50001',
      '45.77.137.111:50001'
    ],
  },
  hodl: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10009,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'HODL',
    serverList: [
      'electrum1.ipv6admin.com:10009',
      'electrum2.ipv6admin.com:10009'
    ],
  },
  pangea: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10010,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'PANGEA',
    serverList: [
      'electrum1.ipv6admin.com:10010',
      'electrum2.ipv6admin.com:10010'
    ],
  },
  bet: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10012,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BET',
    serverList: [
      'electrum1.ipv6admin.com:10012',
      'electrum2.ipv6admin.com:10012'
    ],
  },
  mshark: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10013,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'MSHARK',
    serverList: [
      'electrum1.ipv6admin.com:10013',
      'electrum2.ipv6admin.com:10013'
    ],
  },
  mnz: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10002,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'MNZ',
    serverList: [
      'electrum1.ipv6admin.com:10002',
      'electrum2.ipv6admin.com:10002'/*,
      '18.216.195.109:10002',
      '52.41.58.116:10002',
      '52.67.48.29:10002',
      '13.124.87.194:10002',
      '52.63.107.102:10002'*/
    ],
  },
  wlc: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10014,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'WLC',
    serverList: [
      'electrum1.ipv6admin.com:10014',
      'electrum2.ipv6admin.com:10014'
    ],
  },
  mgw: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10015,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'MGW',
    serverList: [
      'electrum1.ipv6admin.com:10015',
      'electrum2.ipv6admin.com:10015'
    ],
  },
  btch: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10020,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BTCH',
    serverList: [
      'electrum1.ipv6admin.com:10020',
      'electrum2.ipv6admin.com:10020'
    ],
  },
  beer: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10022,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BEER',
    serverList: [
      'electrum1.ipv6admin.com:10022',
      'electrum2.ipv6admin.com:10022'
    ],
  },
  pizza: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10024,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'PIZZA',
    serverList: [
      'electrum1.ipv6admin.com:10024',
      'electrum2.ipv6admin.com:10024'
    ],
  },
  vote2018: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10021,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'VOTE2018',
    serverList: [
      'electrum1.ipv6admin.com:10021',
      'electrum2.ipv6admin.com:10021'
    ],
  },
  ninja: { // !estimatefee
    address: 'electrum1.fund.ninja',
    port: 50001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'NINJA',
    serverList: [
      'electrum1.fund.ninja:50001',
      'electrum2.fund.ninja:50001'
    ],
  },
  jumblr: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10004,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'JUMBLR',
    serverList: [
      'electrum1.ipv6admin.com:10004',
      'electrum2.ipv6admin.com:10004'
    ],
  },
  safecoin: { // !estimatefee
    address: 'local.support',
    port: 10001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'SAFE',
    serverList: [
      'local.support:10001',
      'local.support:10002',
      '45.63.13.60:10001',
      '45.63.13.60:10002'
    ],
  },
  dogecoin: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10060,
    proto: 'tcp',
    txfee: 100000000,
    abbr: 'DOGE',
    serverList: [
      'electrum1.ipv6admin.com:10060',
      'electrum2.ipv6admin.com:10060'
    ],
  },
  viacoin: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10067,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'VIA',
    serverList: [
      'electrum1.ipv6admin.com:10067',
      'electrum2.ipv6admin.com:10067'
    ],
  },
  vertcoin: {
    address: 'electrum1.ipv6admin.com',
    port: 10071,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'VTC',
    serverList: [
      'electrum1.ipv6admin.com:10071',
      'electrum2.ipv6admin.com:10071'
    ],
  },
  namecoin: {
    address: 'electrum1.ipv6admin.com',
    port: 10066,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'NMC',
    serverList: [
      'electrum1.ipv6admin.com:10066',
      'electrum2.ipv6admin.com:10066'
    ],
  },
  monacoin: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10070,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'MONA',
    serverList: [
      'electrum1.ipv6admin.com:10070',
      'electrum2.ipv6admin.com:10070'
    ],
  },
  litecoin: {
    address: 'electrum1.ipv6admin.com',
    port: 10065,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'LTC',
    serverList: [
      'electrum1.ipv6admin.com:10065',
      'electrum2.ipv6admin.com:10065'
    ],
  },
  faircoin: {
    address: 'electrum1.ipv6admin.com',
    port: 10063,
    proto: 'tcp',
    txfee: 1000000,
    abbr: 'FAIR',
    serverList: [
      'electrum1.ipv6admin.com:10063',
      'electrum2.ipv6admin.com:10063'
    ],
  },
  dgb: {
    address: 'electrum1.ipv6admin.com',
    port: 10059,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'DGB',
    serverList: [
      'electrum1.ipv6admin.com:10059',
      'electrum2.ipv6admin.com:10059'
    ],
  },
  dash: {
    address: 'electrum1.ipv6admin.com',
    port: 10061,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'DASH',
    serverList: [
      'electrum1.ipv6admin.com:10061',
      'electrum2.ipv6admin.com:10061'
    ],
  },
  crown: {
    address: 'electrum1.ipv6admin.com',
    port: 10069,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'CRW',
    serverList: [
      'electrum1.ipv6admin.com:10069',
      'electrum2.ipv6admin.com:10069'
    ],
  },
  btc: {
    address: 'e-x.not.fyi',
    port: 50001,
    proto: 'tcp',
    abbr: 'BTC',
    serverList: [
      'electrum1.ipv6admin.com:10000',
      'electrum2.ipv6admin.com:10000',
      'mooo.not.fyi:50011',
      'e-x.not.fyi:50001',
      'vps.hsmiths.com:50001',
      'us.electrum.be:50001',
      'electrumx.bot.nu:50001',
      'btc.asis.io:50001',
      'electrum.backplanedns.org:50001',
      'electrum.festivaldelhumor.org:50001'
    ],
  },
  btg: {
    address: '173.212.225.176',
    port: 10052,
    proto: 'tcp',
    abbr: 'BTG',
    txfee: 10000,
    serverList: [
      '173.212.225.176:10052',
      '94.130.224.11:10052'
    ],
  },
  blk: { // pos
    address: 'electrum1.ipv6admin.com',
    port: 10054,
    proto: 'tcp',
    abbr: 'BLK',
    txfee: 10000,
    serverList: [
      'electrum1.ipv6admin.com:10054',
      'electrum2.ipv6admin.com:10054'
    ],
  },
  sib: {
    address: 'electrum1.ipv6admin.com',
    port: 10050,
    proto: 'tcp',
    abbr: 'SIB',
    txfee: 10000,
    serverList: [
      'electrum1.ipv6admin.com:10050',
      'electrum2.ipv6admin.com:10050'
    ],
  },
  bch: {
    address: 'electrum1.ipv6admin.com',
    port: 10051,
    proto: 'tcp',
    abbr: 'BCH',
    txfee: 10000,
    serverList: [
      'electrum1.ipv6admin.com:10051',
      'electrum2.ipv6admin.com:10051'
    ],
  },
  argentum: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10069,
    proto: 'tcp',
    txfee: 50000,
    abbr: 'ARG',
    serverList: [
      'electrum1.ipv6admin.com:10069',
      'electrum2.ipv6admin.com:10069'
    ],
  },
  chips: { // !estimatefee
    address: 'electrum1.ipv6admin.com',
    port: 10053,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'CHIPS',
    serverList: [
      'electrum1.ipv6admin.com:10053',
      'electrum2.ipv6admin.com:10053'
    ],
  },
  zec: {
    address: 'electrum1.ipv6admin.com',
    port: 10058,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'ZEC',
    serverList: [
      'electrum1.ipv6admin.com:10058',
      'electrum2.ipv6admin.com:10058'
    ],
  },
  hush: {
    address: 'electrum1.ipv6admin.com',
    port: 10064,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'HUSH',
    serverList: [
      'electrum1.ipv6admin.com:10064',
      'electrum2.ipv6admin.com:10064'
    ],
  },
  sng: { // ssl 50002
    address: 'electrumsvr.snowgem.org',
    port: 50001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'SNG',
    serverList: [
      'electrumsvr.snowgem.org:50001',
      'electrumsvr.snowgem.org:50001'
    ],
  },
  xmy: {
    address: 'cetus.cryptap.us',
    port: 50004,
    proto: 'ssl',
    txfee: 5000,
    abbr: 'XMY',
    serverList: [
      'cetus.cryptap.us:50004',
      'kraken.cryptap.us:50004'
    ],
  },
  zcl: {
    address: 'electrum1.ipv6admin.com',
    port: 50055,
    proto: 'tcp',
    txfee: 1000,
    abbr: 'ZCL',
    serverList: [
      'electrum1.ipv6admin.com:10055',
      'electrum2.ipv6admin.com:10055'
    ],
  },
  hodlc: {
    address: 'hodl.amit177.cf',
    port: 17989,
    proto: 'tcp',
    txfee: 5000,
    abbr: 'HODLC',
    serverList: [
      'hodl.amit177.cf:17989',
      'hodl2.amit177.cf:17898'
    ],
  },
  btx: {
    address: 'electrum1.ipv6admin.com',
    port: 10057,
    proto: 'tcp',
    txfee: 50000,
    abbr: 'BTX',
    serverList: [
      'electrum1.ipv6admin.com:10057',
      'electrum2.ipv6admin.com:10057'
    ],
  },
  btcz: {
    address: 'electrum1.ipv6admin.com',
    port: 10056,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BTCZ',
    serverList: [
      'electrum1.ipv6admin.com:10056',
      'electrum2.ipv6admin.com:10056'
    ],
  },
  grs: {
    address: 'electrum10.groestlcoin.org',
    port: 50001,
    proto: 'tcp',
    txfee: 50000,
    abbr: 'GRS',
    serverList: [
      'electrum10.groestlcoin.org:50001',
      'electrum11.groestlcoin.org:50001'
    ],
  },
  qtum: {
    address: 's1.qtum.info',
    port: 50001,
    proto: 'tcp',
    txfee: 400000,
    abbr: 'QTUM',
    serverList: [
      's1.qtum.info:50001',
      's2.qtum.info:50001'
    ],
  },
  // TODO: figure out fees
  btcp: { // multisig?
    address: 'electrum.btcprivate.org',
    port: 5222,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BTCP',
    serverList: [
      'electrum.btcprivate.org:5222',
      'electrum2.btcprivate.org:5222'
    ],
  },
  emc2: {
    address: 'electrum1.ipv6admin.com',
    port: 10062,
    proto: 'tcp',
    txfee: 100000,
    abbr: 'EMC2',
    serverList: [
      'electrum1.ipv6admin.com:10062',
      'electrum2.ipv6admin.com:10062'
    ],
  },
  bcbc: {
    address: 'bsmn0.cleanblockchain.io',
    port: 50001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BCBC',
    serverList: [
      'bsmn0.cleanblockchain.io:50001',
      'bsmn1.cleanblockchain.io:50001'
    ],
  },
  zen: {
    txfee: 10000,
    abbr: 'ZEN',
  },
  xzc: {
    txfee: 10000,
    abbr: 'XZC',
  },
  game: {
    txfee: 100000,
    abbr: 'GAME',
  },
  iop: {
    txfee: 10000,
    abbr: 'IOP',
  },
  sys: {
    txfee: 10000,
    abbr: 'SYS',
  },
  bta: {
    txfee: 100000,
    abbr: 'BTA',
  },
  erc: {
    txfee: 10000,
    abbr: 'ERC',
  },
  lbc: {
    txfee: 1000,
    abbr: 'LBC',
  },
  bsd: {
    txfee: 10000,
    abbr: 'BSD',
  },
  gbx: {
    txfee: 10000,
    abbr: 'GBX',
  },
  efl: {
    txfee: 100000,
    abbr: 'EFL',
  },
  xwc: {
    txfee: 10000,
    abbr: 'XWC',
  },
  vivo: {
    txfee: 10000,
    abbr: 'VIVO',
  },
  xvg: {
    txfee: 10000,
    abbr: 'XVG',
  },
  xvc: {
    txfee: 10000,
    abbr: 'XVC',
  },
  uno: {
    txfee: 10000,
    abbr: 'UNO',
  },
  smart: {
    txfee: 10000,
    abbr: 'SMART',
  },
  rdd: {
    txfee: 10000,
    abbr: 'RDD',
  },
  pivx: {
    txfee: 10000,
    abbr: 'PIVX',
  },
  omni: {
    txfee: 10000,
    abbr: 'OMNI',
  },
  ok: {
    txfee: 10000,
    abbr: 'OK',
  },
  neos: {
    txfee: 10000,
    abbr: 'NEOS',
  },
  nav: {
    txfee: 10000,
    abbr: 'NAV',
  },
  mnx: {
    txfee: 10000,
    abbr: 'MNX',
  },
  lcc: {
    txfee: 10000,
    abbr: 'LCC',
  },
  nlg: {
    txfee: 10000,
    abbr: 'NLG',
  },
  fjc: {
    txfee: 10000,
    abbr: 'FJC',
  },
  flash: {
    txfee: 10000,
    abbr: 'FLASH',
  },
  ftc: {
    proto: 'tcp',
    txfee: 10000,
  },
  excl: {
    txfee: 10000,
    abbr: 'EXCL',
  },
  dmd: {
    proto: 'tcp',
    txfee: 10000,
  },
  crave: {
    txfee: 10000,
    abbr: 'CRAVE',
  },
  club: {
    txfee: 10000,
    abbr: 'CLUB',
  },
  clam: {
    txfee: 10000,
    abbr: 'CLAM',
  },
  bca: {
    txfee: 10000,
    abbr: 'BCA',
  },
  aur: {
    txfee: 10000,
    abbr: 'AUR',
  },
  acc: {
    txfee: 10000,
    abbr: 'ACC',
  },
  // insight
  aby: {
    address: 'http://explorer.artbyte.me/api/',
    proto: 'insight',
    insightRawApi: false,
    txfee: 100000,
    abbr: 'ABY',
    serverList: 'none',
  },
  mac: { // cloudfare captcha :(
    address: 'https://explorer.machinecoin.org/api/',
    proto: 'insight',
    insightRawApi: false,
    txfee: 100000,
    abbr: 'MAC',
    serverList: 'none',
  },
  vot: {
    address: 'http://explorer.votecoin.site/insight-api-zcash/',
    proto: 'insight',
    insightRawApi: false,
    txfee: 10000,
    abbr: 'VOT',
    serverList: 'none',
  },
  bdl: {
    address: 'https://explorer.bitdeal.co.in/api/',
    proto: 'insight',
    insightRawApi: false,
    txfee: 10000,
    abbr: 'BDL',
    serverList: 'none',
  },
};

electrumServers.crw = electrumServers.crown;
electrumServers.fair = electrumServers.faircoin;
electrumServers.arg = electrumServers.argentum;
electrumServers.ltc = electrumServers.litecoin;
electrumServers.mona = electrumServers.monacoin;
electrumServers.nmc = electrumServers.namecoin;
electrumServers.vtc = electrumServers.vertcoin;
electrumServers.via = electrumServers.viacoin;
electrumServers.doge = electrumServers.dogecoin;

module.exports = electrumServers;
