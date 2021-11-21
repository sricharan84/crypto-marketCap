import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  flatMap,
  map,
  mergeMap,
  take,
  takeWhile,
  tap,
} from 'rxjs/operators';

const crypto_list = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    id: 2,
    name: 'Litecoin',
    symbol: 'LTC',
  },
  {
    id: 3,
    name: 'Namecoin',
    symbol: 'NMC',
  },
  {
    id: 4,
    name: 'Terracoin',
    symbol: 'TRC',
  },
  {
    id: 5,
    name: 'Peercoin',
    symbol: 'PPC',
  },
  {
    id: 6,
    name: 'Novacoin',
    symbol: 'NVC',
  },
  {
    id: 8,
    name: 'Feathercoin',
    symbol: 'FTC',
  },
  {
    id: 10,
    name: 'Freicoin',
    symbol: 'FRC',
  },
  {
    id: 13,
    name: 'Ixcoin',
    symbol: 'IXC',
  },
  {
    id: 16,
    name: 'WorldCoin',
    symbol: 'WDC',
  },
  {
    id: 18,
    name: 'Digitalcoin',
    symbol: 'DGC',
  },
  {
    id: 25,
    name: 'Goldcoin',
    symbol: 'GLC',
  },
  {
    id: 35,
    name: 'Phoenixcoin',
    symbol: 'PXC',
  },
  {
    id: 37,
    name: 'Megacoin',
    symbol: 'MEC',
  },
  {
    id: 41,
    name: 'Infinitecoin',
    symbol: 'IFC',
  },
  {
    id: 42,
    name: 'Primecoin',
    symbol: 'XPM',
  },
  {
    id: 43,
    name: 'Anoncoin',
    symbol: 'ANC',
  },
  {
    id: 45,
    name: 'CasinoCoin',
    symbol: 'CSC',
  },
  {
    id: 50,
    name: 'Emerald Crypto',
    symbol: 'EMD',
  },
  {
    id: 52,
    name: 'XRP',
    symbol: 'XRP',
  },
  {
    id: 53,
    name: 'Quark',
    symbol: 'QRK',
  },
  {
    id: 56,
    name: 'Zetacoin',
    symbol: 'ZET',
  },
  {
    id: 61,
    name: 'TagCoin',
    symbol: 'TAG',
  },
  {
    id: 64,
    name: 'Public Index Network',
    symbol: 'PIN',
  },
  {
    id: 66,
    name: 'Nxt',
    symbol: 'NXT',
  },
  {
    id: 67,
    name: 'Unobtanium',
    symbol: 'UNO',
  },
  {
    id: 69,
    name: 'Datacoin',
    symbol: 'DTC',
  },
  {
    id: 72,
    name: 'Deutsche eMark',
    symbol: 'DEM',
  },
  {
    id: 74,
    name: 'Dogecoin',
    symbol: 'DOGE',
  },
  {
    id: 77,
    name: 'Diamond',
    symbol: 'DMD',
  },
  {
    id: 78,
    name: 'HoboNickels',
    symbol: 'HBN',
  },
  {
    id: 80,
    name: 'Orbitcoin',
    symbol: 'ORB',
  },
  {
    id: 83,
    name: 'Omni',
    symbol: 'OMNI',
  },
  {
    id: 87,
    name: 'FedoraCoin',
    symbol: 'TIPS',
  },
  {
    id: 90,
    name: 'Dimecoin',
    symbol: 'DIME',
  },
  {
    id: 93,
    name: '42-coin',
    symbol: '42',
  },
  {
    id: 99,
    name: 'Vertcoin',
    symbol: 'VTC',
  },
  {
    id: 109,
    name: 'DigiByte',
    symbol: 'DGB',
  },
  {
    id: 113,
    name: 'SmartCoin (SMC)',
    symbol: 'SMC',
  },
  {
    id: 118,
    name: 'ReddCoin',
    symbol: 'RDD',
  },
  {
    id: 122,
    name: 'PotCoin',
    symbol: 'POT',
  },
  {
    id: 125,
    name: 'Blakecoin',
    symbol: 'BLC',
  },
  {
    id: 128,
    name: 'Maxcoin',
    symbol: 'MAX',
  },
  {
    id: 131,
    name: 'Dash',
    symbol: 'DASH',
  },
  {
    id: 132,
    name: 'Counterparty',
    symbol: 'XCP',
  },
  {
    id: 141,
    name: 'MintCoin',
    symbol: 'MINT',
  },
  {
    id: 145,
    name: 'DopeCoin',
    symbol: 'DOPE',
  },
  {
    id: 148,
    name: 'Auroracoin',
    symbol: 'AUR',
  },
  {
    id: 151,
    name: 'Peseta Digital',
    symbol: 'PTD',
  },
  {
    id: 154,
    name: 'Marscoin',
    symbol: 'MARS',
  },
  {
    id: 162,
    name: 'Magic Internet Money',
    symbol: 'MIM',
  },
  {
    id: 168,
    name: 'Uniform Fiscal Object',
    symbol: 'UFO',
  },
  {
    id: 170,
    name: 'BlackCoin',
    symbol: 'BLK',
  },
  {
    id: 175,
    name: 'Photon',
    symbol: 'PHO',
  },
  {
    id: 182,
    name: 'Myriad',
    symbol: 'XMY',
  },
  {
    id: 184,
    name: 'DNotes',
    symbol: 'NOTE',
  },
  {
    id: 201,
    name: 'Einsteinium',
    symbol: 'EMC2',
  },
  {
    id: 212,
    name: 'ECC',
    symbol: 'ECC',
  },
  {
    id: 213,
    name: 'MonaCoin',
    symbol: 'MONA',
  },
  {
    id: 215,
    name: 'Rubycoin',
    symbol: 'RBY',
  },
  {
    id: 217,
    name: 'Bela',
    symbol: 'BELA',
  },
  {
    id: 224,
    name: 'FairCoin',
    symbol: 'FAIR',
  },
  {
    id: 234,
    name: 'e-Gulden',
    symbol: 'EFL',
  },
  {
    id: 254,
    name: 'Gulden',
    symbol: 'NLG',
  },
  {
    id: 258,
    name: 'Groestlcoin',
    symbol: 'GRS',
  },
  {
    id: 260,
    name: 'PetroDollar',
    symbol: 'XPD',
  },
  {
    id: 263,
    name: 'PLNcoin',
    symbol: 'PLNC',
  },
  {
    id: 268,
    name: 'WhiteCoin',
    symbol: 'XWC',
  },
  {
    id: 276,
    name: 'Bitstar',
    symbol: 'BITS',
  },
  {
    id: 278,
    name: 'Quebecoin',
    symbol: 'QBC',
  },
  {
    id: 290,
    name: 'BlueCoin',
    symbol: 'BLU',
  },
  {
    id: 291,
    name: 'MaidSafeCoin',
    symbol: 'MAID',
  },
  {
    id: 293,
    name: 'Bitcoin Plus',
    symbol: 'XBC',
  },
  {
    id: 298,
    name: 'NewYorkCoin',
    symbol: 'NYC',
  },
  {
    id: 313,
    name: 'Pinkcoin',
    symbol: 'PINK',
  },
  {
    id: 316,
    name: 'Dreamcoin',
    symbol: 'DRM',
  },
  {
    id: 322,
    name: 'Energycoin',
    symbol: 'ENRG',
  },
  {
    id: 323,
    name: 'VeriCoin',
    symbol: 'VRC',
  },
  {
    id: 328,
    name: 'Monero',
    symbol: 'XMR',
  },
  {
    id: 331,
    name: 'Litecoin Plus',
    symbol: 'LCP',
  },
  {
    id: 333,
    name: 'Curecoin',
    symbol: 'CURE',
  },
  {
    id: 341,
    name: 'SuperCoin',
    symbol: 'SUPER',
  },
  {
    id: 360,
    name: 'Motocoin',
    symbol: 'MOTO',
  },
  {
    id: 362,
    name: 'CloakCoin',
    symbol: 'CLOAK',
  },
  {
    id: 366,
    name: 'BitSend',
    symbol: 'BSD',
  },
  {
    id: 367,
    name: 'Coin2.1',
    symbol: 'C2',
  },
  {
    id: 372,
    name: 'Bytecoin',
    symbol: 'BCN',
  },
  {
    id: 377,
    name: 'Navcoin',
    symbol: 'NAV',
  },
  {
    id: 389,
    name: 'Startcoin',
    symbol: 'START',
  },
  {
    id: 405,
    name: 'DigitalNote',
    symbol: 'XDN',
  },
  {
    id: 406,
    name: 'Boolberry',
    symbol: 'BBR',
  },
  {
    id: 416,
    name: 'HempCoin',
    symbol: 'THC',
  },
  {
    id: 448,
    name: 'Stealth',
    symbol: 'XST',
  },
  {
    id: 460,
    name: 'Clams',
    symbol: 'CLAM',
  },
  {
    id: 463,
    name: 'BitShares',
    symbol: 'BTS',
  },
  {
    id: 470,
    name: 'Viacoin',
    symbol: 'VIA',
  },
  {
    id: 495,
    name: 'I/O Coin',
    symbol: 'IOC',
  },
  {
    id: 501,
    name: 'Cryptonite',
    symbol: 'XCN',
  },
  {
    id: 502,
    name: 'Carboncoin',
    symbol: 'CARBON',
  },
  {
    id: 506,
    name: 'CannabisCoin',
    symbol: 'CANN',
  },
  {
    id: 512,
    name: 'Stellar',
    symbol: 'XLM',
  },
  {
    id: 541,
    name: 'Syscoin',
    symbol: 'SYS',
  },
  {
    id: 551,
    name: 'Donu',
    symbol: 'DONU',
  },
  {
    id: 558,
    name: 'Emercoin',
    symbol: 'EMC',
  },
  {
    id: 572,
    name: 'RabbitCoin',
    symbol: 'RBBT',
  },
  {
    id: 576,
    name: 'GameCredits',
    symbol: 'GAME',
  },
  {
    id: 584,
    name: 'NativeCoin',
    symbol: 'N8V',
  },
  {
    id: 588,
    name: 'Ubiq',
    symbol: 'UBQ',
  },
  {
    id: 597,
    name: 'Opal',
    symbol: 'OPAL',
  },
  {
    id: 601,
    name: 'Acoin',
    symbol: 'ACOIN',
  },
  {
    id: 624,
    name: 'bitCNY',
    symbol: 'BITCNY',
  },
  {
    id: 626,
    name: 'NuBits',
    symbol: 'USNBT',
  },
  {
    id: 633,
    name: 'ExclusiveCoin',
    symbol: 'EXCL',
  },
  {
    id: 638,
    name: 'Trollcoin',
    symbol: 'TROLL',
  },
  {
    id: 644,
    name: 'GlobalBoost-Y',
    symbol: 'BSTY',
  },
  {
    id: 656,
    name: 'Prime-XI',
    symbol: 'PXI',
  },
  {
    id: 659,
    name: 'Bitswift',
    symbol: 'BITS',
  },
  {
    id: 693,
    name: 'Verge',
    symbol: 'XVG',
  },
  {
    id: 699,
    name: 'NuShares',
    symbol: 'NSR',
  },
  {
    id: 702,
    name: 'SpreadCoin',
    symbol: 'SPR',
  },
  {
    id: 703,
    name: 'Rimbit',
    symbol: 'RBT',
  },
  {
    id: 706,
    name: 'MonetaryUnit',
    symbol: 'MUE',
  },
  {
    id: 707,
    name: 'Blocknet',
    symbol: 'BLOCK',
  },
  {
    id: 719,
    name: 'Limitless VIP',
    symbol: 'VIP',
  },
  {
    id: 720,
    name: 'Crown',
    symbol: 'CRW',
  },
  {
    id: 730,
    name: 'GCN Coin',
    symbol: 'GCN',
  },
  {
    id: 733,
    name: 'Quotient',
    symbol: 'XQN',
  },
  {
    id: 760,
    name: 'OKCash',
    symbol: 'OK',
  },
  {
    id: 764,
    name: 'PayCoin',
    symbol: 'XPY',
  },
  {
    id: 788,
    name: 'Circuits of Value',
    symbol: 'COVAL',
  },
  {
    id: 789,
    name: 'Nexus',
    symbol: 'NXS',
  },
  {
    id: 799,
    name: 'SmileyCoin',
    symbol: 'SMLY',
  },
  {
    id: 815,
    name: 'Kobocoin',
    symbol: 'KOBO',
  },
  {
    id: 819,
    name: 'Bean Cash',
    symbol: 'BITB',
  },
  {
    id: 823,
    name: 'GeoCoin',
    symbol: 'GEO',
  },
  {
    id: 825,
    name: 'Tether',
    symbol: 'USDT',
  },
  {
    id: 831,
    name: 'Wild Beast Block',
    symbol: 'WBB',
  },
  {
    id: 833,
    name: 'Gridcoin',
    symbol: 'GRC',
  },
  {
    id: 837,
    name: 'X-Coin',
    symbol: 'XCO',
  },
  {
    id: 857,
    name: 'SongCoin',
    symbol: 'SONG',
  },
  {
    id: 859,
    name: 'Woodcoin',
    symbol: 'LOG',
  },
  {
    id: 873,
    name: 'NEM',
    symbol: 'XEM',
  },
  {
    id: 894,
    name: 'Neutron',
    symbol: 'NTRN',
  },
  {
    id: 895,
    name: 'Xaurum',
    symbol: 'XAUR',
  },
  {
    id: 898,
    name: 'Californium',
    symbol: 'CF',
  },
  {
    id: 911,
    name: 'Advanced Internet Blocks',
    symbol: 'AIB',
  },
  {
    id: 914,
    name: 'Sphere',
    symbol: 'SPHR',
  },
  {
    id: 916,
    name: 'MedicCoin',
    symbol: 'MEDIC',
  },
  {
    id: 918,
    name: 'Bubble',
    symbol: 'BUB',
  },
  {
    id: 921,
    name: 'Universal Currency',
    symbol: 'UNIT',
  },
  {
    id: 934,
    name: 'ParkByte',
    symbol: 'PKB',
  },
  {
    id: 938,
    name: 'ARbit',
    symbol: 'ARB',
  },
  {
    id: 945,
    name: 'Bata',
    symbol: 'BTA',
  },
  {
    id: 948,
    name: 'AudioCoin',
    symbol: 'ADC',
  },
  {
    id: 951,
    name: 'Synergy',
    symbol: 'SNRG',
  },
  {
    id: 960,
    name: 'FujiCoin',
    symbol: 'FJC',
  },
  {
    id: 977,
    name: 'GravityCoin',
    symbol: 'GXX',
  },
  {
    id: 978,
    name: 'Ratecoin',
    symbol: 'XRA',
  },
  {
    id: 986,
    name: 'CrevaCoin',
    symbol: 'CREVA',
  },
  {
    id: 990,
    name: 'Bitzeny',
    symbol: 'ZNY',
  },
  {
    id: 993,
    name: 'BowsCoin',
    symbol: 'BSC',
  },
  {
    id: 1004,
    name: 'HNC COIN',
    symbol: 'HNC',
  },
  {
    id: 1019,
    name: 'Manna',
    symbol: 'MANNA',
  },
  {
    id: 1020,
    name: 'Axiom',
    symbol: 'AXIOM',
  },
  {
    id: 1026,
    name: 'Aeon',
    symbol: 'AEON',
  },
  {
    id: 1027,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    id: 1032,
    name: 'TransferCoin',
    symbol: 'TX',
  },
  {
    id: 1033,
    name: 'GuccioneCoin',
    symbol: 'GCC',
  },
  {
    id: 1035,
    name: 'AmsterdamCoin',
    symbol: 'AMS',
  },
  {
    id: 1037,
    name: 'Agoras',
    symbol: 'AGRS',
  },
  {
    id: 1038,
    name: 'Eurocoin',
    symbol: 'EUC',
  },
  {
    id: 1042,
    name: 'Siacoin',
    symbol: 'SC',
  },
  {
    id: 1044,
    name: 'Global Currency Reserve',
    symbol: 'GCR',
  },
  {
    id: 1052,
    name: 'VectorAI',
    symbol: 'VEC2',
  },
  {
    id: 1053,
    name: 'Bolivarcoin',
    symbol: 'BOLI',
  },
  {
    id: 1066,
    name: 'Pakcoin',
    symbol: 'PAK',
  },
  {
    id: 1070,
    name: 'Expanse',
    symbol: 'EXP',
  },
  {
    id: 1082,
    name: 'SIBCoin',
    symbol: 'SIB',
  },
  {
    id: 1085,
    name: 'Swing',
    symbol: 'SWING',
  },
  {
    id: 1087,
    name: 'Factom',
    symbol: 'FCT',
  },
  {
    id: 1089,
    name: 'ParallelCoin',
    symbol: 'DUO',
  },
  {
    id: 1090,
    name: 'Save and Gain',
    symbol: 'SANDG',
  },
  {
    id: 1104,
    name: 'Augur',
    symbol: 'REP',
  },
  {
    id: 1106,
    name: 'StrongHands',
    symbol: 'SHND',
  },
  {
    id: 1107,
    name: 'PAC Protocol',
    symbol: 'PAC',
  },
  {
    id: 1120,
    name: 'DraftCoin',
    symbol: 'DFT',
  },
  {
    id: 1135,
    name: 'ClubCoin',
    symbol: 'CLUB',
  },
  {
    id: 1136,
    name: 'Adzcoin',
    symbol: 'ADZ',
  },
  {
    id: 1146,
    name: 'AvatarCoin',
    symbol: 'AV',
  },
  {
    id: 1154,
    name: 'Validity',
    symbol: 'VAL',
  },
  {
    id: 1155,
    name: 'Litecred',
    symbol: 'LTCR',
  },
  {
    id: 1156,
    name: 'Yocoin',
    symbol: 'YOC',
  },
  {
    id: 1159,
    name: 'SaluS',
    symbol: 'SLS',
  },
  {
    id: 1164,
    name: 'Francs',
    symbol: 'FRN',
  },
  {
    id: 1165,
    name: 'Evil Coin',
    symbol: 'EVIL',
  },
  {
    id: 1168,
    name: 'Decred',
    symbol: 'DCR',
  },
  {
    id: 1169,
    name: 'PIVX',
    symbol: 'PIVX',
  },
  {
    id: 1172,
    name: 'Safex Token',
    symbol: 'SFT',
  },
  {
    id: 1175,
    name: 'Rubies',
    symbol: 'RBIES',
  },
  {
    id: 1185,
    name: 'TrumpCoin',
    symbol: 'TRUMP',
  },
  {
    id: 1191,
    name: 'Memetic / PepeCoin',
    symbol: 'MEME',
  },
  {
    id: 1194,
    name: 'Independent Money System',
    symbol: 'IMS',
  },
  {
    id: 1200,
    name: 'NevaCoin',
    symbol: 'NEVA',
  },
  {
    id: 1209,
    name: 'PosEx',
    symbol: 'PEX',
  },
  {
    id: 1210,
    name: 'Cabbage',
    symbol: 'CAB',
  },
  {
    id: 1212,
    name: 'MojoCoin',
    symbol: 'MOJO',
  },
  {
    id: 1214,
    name: 'Lisk',
    symbol: 'LSK',
  },
  {
    id: 1216,
    name: 'EDRCoin',
    symbol: 'EDRC',
  },
  {
    id: 1218,
    name: 'PostCoin',
    symbol: 'POST',
  },
  {
    id: 1223,
    name: 'BERNcash',
    symbol: 'BERN',
  },
  {
    id: 1229,
    name: 'DigixDAO',
    symbol: 'DGD',
  },
  {
    id: 1230,
    name: 'Steem',
    symbol: 'STEEM',
  },
  {
    id: 1241,
    name: 'FuzzBalls',
    symbol: 'FUZZ',
  },
  {
    id: 1244,
    name: 'HiCoin',
    symbol: 'XHI',
  },
  {
    id: 1247,
    name: 'AquariusCoin',
    symbol: 'ARCO',
  },
  {
    id: 1248,
    name: 'Bitcoin 21',
    symbol: 'XBTC21',
  },
  {
    id: 1250,
    name: 'Zurcoin',
    symbol: 'ZUR',
  },
  {
    id: 1252,
    name: '2GIVE',
    symbol: '2GIVE',
  },
  {
    id: 1254,
    name: 'PlatinumBAR',
    symbol: 'XPTX',
  },
  {
    id: 1257,
    name: 'LanaCoin',
    symbol: 'LANA',
  },
  {
    id: 1259,
    name: 'PonziCoin',
    symbol: 'PONZI',
  },
  {
    id: 1266,
    name: 'MarteXcoin',
    symbol: 'MXT',
  },
  {
    id: 1273,
    name: 'Citadel',
    symbol: 'CTL',
  },
  {
    id: 1274,
    name: 'Waves',
    symbol: 'WAVES',
  },
  {
    id: 1279,
    name: 'PWR Coin',
    symbol: 'PWR',
  },
  {
    id: 1281,
    name: 'ION',
    symbol: 'ION',
  },
  {
    id: 1282,
    name: 'High Voltage',
    symbol: 'HVCO',
  },
  {
    id: 1285,
    name: 'GoldBlocks',
    symbol: 'GB',
  },
  {
    id: 1291,
    name: 'Comet',
    symbol: 'CMT',
  },
  {
    id: 1294,
    name: 'Rise',
    symbol: 'RISE',
  },
  {
    id: 1297,
    name: 'ChessCoin',
    symbol: 'CHESS',
  },
  {
    id: 1298,
    name: 'LBRY Credits',
    symbol: 'LBC',
  },
  {
    id: 1299,
    name: 'PutinCoin',
    symbol: 'PUT',
  },
  {
    id: 1306,
    name: 'Cryptojacks',
    symbol: 'CJ',
  },
  {
    id: 1308,
    name: 'HEAT',
    symbol: 'HEAT',
  },
  {
    id: 1312,
    name: 'Steem Dollars',
    symbol: 'SBD',
  },
  {
    id: 1320,
    name: 'Ardor',
    symbol: 'ARDR',
  },
  {
    id: 1321,
    name: 'Ethereum Classic',
    symbol: 'ETC',
  },
  {
    id: 1340,
    name: 'Karbo',
    symbol: 'KRB',
  },
  {
    id: 1343,
    name: 'Stratis',
    symbol: 'STRAX',
  },
  {
    id: 1351,
    name: 'Aces',
    symbol: 'ACES',
  },
  {
    id: 1353,
    name: 'TajCoin',
    symbol: 'TAJ',
  },
  {
    id: 1368,
    name: 'Veltor',
    symbol: 'VLT',
  },
  {
    id: 1376,
    name: 'Neo',
    symbol: 'NEO',
  },
  {
    id: 1381,
    name: 'Bitcloud',
    symbol: 'BTDX',
  },
  {
    id: 1382,
    name: 'NoLimitCoin',
    symbol: 'NLC2',
  },
  {
    id: 1389,
    name: 'Zayedcoin',
    symbol: 'ZYD',
  },
  {
    id: 1392,
    name: 'Pluton',
    symbol: 'PLU',
  },
  {
    id: 1395,
    name: 'Dollarcoin',
    symbol: 'DLC',
  },
  {
    id: 1396,
    name: 'MustangCoin',
    symbol: 'MST',
  },
  {
    id: 1398,
    name: 'PROUD Money',
    symbol: 'PROUD',
  },
  {
    id: 1405,
    name: 'Pepe Cash',
    symbol: 'PEPECASH',
  },
  {
    id: 1414,
    name: 'Firo',
    symbol: 'FIRO',
  },
  {
    id: 1434,
    name: 'Advanced Technology Coin',
    symbol: 'ARC',
  },
  {
    id: 1437,
    name: 'Zcash',
    symbol: 'ZEC',
  },
  {
    id: 1439,
    name: 'AllSafe',
    symbol: 'ASAFE',
  },
  {
    id: 1447,
    name: 'ZClassic',
    symbol: 'ZCL',
  },
  {
    id: 1454,
    name: 'Lykke',
    symbol: 'LKK',
  },
  {
    id: 1455,
    name: 'Golem',
    symbol: 'GLM',
  },
  {
    id: 1464,
    name: 'Internet of People',
    symbol: 'IOP',
  },
  {
    id: 1466,
    name: 'Hush',
    symbol: 'HUSH',
  },
  {
    id: 1468,
    name: 'Kurrent',
    symbol: 'KURT',
  },
  {
    id: 1473,
    name: 'Pascal',
    symbol: 'PASC',
  },
  {
    id: 1474,
    name: 'Eternity',
    symbol: 'ENT',
  },
  {
    id: 1492,
    name: 'Obyte',
    symbol: 'GBYTE',
  },
  {
    id: 1495,
    name: 'PoSW Coin',
    symbol: 'POSW',
  },
  {
    id: 1496,
    name: 'Luna Coin',
    symbol: 'LUNA',
  },
  {
    id: 1500,
    name: 'Wings',
    symbol: 'WINGS',
  },
  {
    id: 1503,
    name: 'Jupiter',
    symbol: 'JUP',
  },
  {
    id: 1504,
    name: 'InflationCoin',
    symbol: 'IFLT',
  },
  {
    id: 1505,
    name: 'Alias',
    symbol: 'ALIAS',
  },
  {
    id: 1511,
    name: 'PureVidz',
    symbol: 'VIDZ',
  },
  {
    id: 1514,
    name: 'ICOBID',
    symbol: 'ICOB',
  },
  {
    id: 1515,
    name: 'iBank',
    symbol: 'IBANK',
  },
  {
    id: 1518,
    name: 'Maker',
    symbol: 'MKR',
  },
  {
    id: 1521,
    name: 'Komodo',
    symbol: 'KMD',
  },
  {
    id: 1522,
    name: 'FirstCoin',
    symbol: 'FRST',
  },
  {
    id: 1527,
    name: 'Waves Community Token',
    symbol: 'WCT',
  },
  {
    id: 1528,
    name: 'Iconic',
    symbol: 'ICON',
  },
  {
    id: 1531,
    name: 'Global Cryptocurrency',
    symbol: 'GCC',
  },
  {
    id: 1546,
    name: 'Centurion',
    symbol: 'CNT',
  },
  {
    id: 1552,
    name: 'Enzyme',
    symbol: 'MLN',
  },
  {
    id: 1556,
    name: 'Chrono.tech',
    symbol: 'TIME',
  },
  {
    id: 1558,
    name: 'Argus',
    symbol: 'ARGUS',
  },
  {
    id: 1562,
    name: 'Swarm City',
    symbol: 'SWT',
  },
  {
    id: 1567,
    name: 'Nano',
    symbol: 'NANO',
  },
  {
    id: 1578,
    name: 'Zero',
    symbol: 'ZER',
  },
  {
    id: 1582,
    name: 'Netko',
    symbol: 'NETKO',
  },
  {
    id: 1586,
    name: 'Ark',
    symbol: 'ARK',
  },
  {
    id: 1587,
    name: 'Dynamic',
    symbol: 'DYN',
  },
  {
    id: 1588,
    name: 'Tokes',
    symbol: 'TKS',
  },
  {
    id: 1590,
    name: 'Mercury',
    symbol: 'MER',
  },
  {
    id: 1596,
    name: 'Edgeless',
    symbol: 'EDG',
  },
  {
    id: 1606,
    name: 'Solaris',
    symbol: 'XLR',
  },
  {
    id: 1609,
    name: 'Asch',
    symbol: 'XAS',
  },
  {
    id: 1619,
    name: 'Skycoin',
    symbol: 'SKY',
  },
  {
    id: 1623,
    name: 'BlazerCoin',
    symbol: 'BLAZR',
  },
  {
    id: 1624,
    name: 'Atmos',
    symbol: 'ATMOS',
  },
  {
    id: 1629,
    name: 'Zennies',
    symbol: 'ZENI',
  },
  {
    id: 1630,
    name: 'Coinonat',
    symbol: 'CXT',
  },
  {
    id: 1632,
    name: 'Concoin',
    symbol: 'CONX',
  },
  {
    id: 1636,
    name: 'XTRABYTES',
    symbol: 'XBY',
  },
  {
    id: 1637,
    name: 'iExec RLC',
    symbol: 'RLC',
  },
  {
    id: 1638,
    name: 'WeTrust',
    symbol: 'TRST',
  },
  {
    id: 1651,
    name: 'SpeedCash',
    symbol: 'SCS',
  },
  {
    id: 1654,
    name: 'BitCore',
    symbol: 'BTX',
  },
  {
    id: 1657,
    name: 'Bitvolt',
    symbol: 'VOLT',
  },
  {
    id: 1658,
    name: 'Lunyr',
    symbol: 'LUN',
  },
  {
    id: 1659,
    name: 'Gnosis',
    symbol: 'GNO',
  },
  {
    id: 1660,
    name: 'Monolith',
    symbol: 'TKN',
  },
  {
    id: 1669,
    name: 'Humaniq',
    symbol: 'HMQ',
  },
  {
    id: 1673,
    name: 'Minereum',
    symbol: 'MNE',
  },
  {
    id: 1674,
    name: 'Cannation',
    symbol: 'CNNC',
  },
  {
    id: 1676,
    name: 'CREA',
    symbol: 'CREA',
  },
  {
    id: 1678,
    name: 'InsaneCoin',
    symbol: 'INSN',
  },
  {
    id: 1680,
    name: 'Aragon',
    symbol: 'ANT',
  },
  {
    id: 1681,
    name: 'PRIZM',
    symbol: 'PZM',
  },
  {
    id: 1684,
    name: 'Qtum',
    symbol: 'QTUM',
  },
  {
    id: 1687,
    name: 'Digital Money Bits',
    symbol: 'DMB',
  },
  {
    id: 1693,
    name: 'Theresa May Coin',
    symbol: 'MAY',
  },
  {
    id: 1694,
    name: 'Sumokoin',
    symbol: 'SUMO',
  },
  {
    id: 1697,
    name: 'Basic Attention Token',
    symbol: 'BAT',
  },
  {
    id: 1698,
    name: 'Horizen',
    symbol: 'ZEN',
  },
  {
    id: 1700,
    name: 'Aeternity',
    symbol: 'AE',
  },
  {
    id: 1701,
    name: 'ScooterCoin',
    symbol: 'SCOOT',
  },
  {
    id: 1703,
    name: 'Metaverse ETP',
    symbol: 'ETP',
  },
  {
    id: 1704,
    name: 'eBoost',
    symbol: 'EBST',
  },
  {
    id: 1706,
    name: 'Aidos Kuneen',
    symbol: 'ADK',
  },
  {
    id: 1708,
    name: 'Patientory',
    symbol: 'PTOY',
  },
  {
    id: 1710,
    name: 'Veritaseum',
    symbol: 'VERI',
  },
  {
    id: 1711,
    name: 'Electra',
    symbol: 'ECA',
  },
  {
    id: 1712,
    name: 'Quantum Resistant Ledger',
    symbol: 'QRL',
  },
  {
    id: 1715,
    name: 'MobileGo',
    symbol: 'MGO',
  },
  {
    id: 1719,
    name: 'Peerplays',
    symbol: 'PPY',
  },
  {
    id: 1720,
    name: 'IOTA',
    symbol: 'MIOTA',
  },
  {
    id: 1721,
    name: 'Mysterium',
    symbol: 'MYST',
  },
  {
    id: 1722,
    name: 'More Coin',
    symbol: 'MORE',
  },
  {
    id: 1725,
    name: 'Adelphoi',
    symbol: 'ADL',
  },
  {
    id: 1726,
    name: 'ZrCoin',
    symbol: 'ZRC',
  },
  {
    id: 1727,
    name: 'Bancor',
    symbol: 'BNT',
  },
  {
    id: 1731,
    name: 'GlobalToken',
    symbol: 'GLT',
  },
  {
    id: 1732,
    name: 'Numeraire',
    symbol: 'NMR',
  },
  {
    id: 1736,
    name: 'Unify',
    symbol: 'UNIFY',
  },
  {
    id: 1745,
    name: 'Dinastycoin',
    symbol: 'DCY',
  },
  {
    id: 1747,
    name: 'Onix',
    symbol: 'ONX',
  },
  {
    id: 1750,
    name: 'GXChain',
    symbol: 'GXC',
  },
  {
    id: 1751,
    name: 'ATC Coin',
    symbol: 'ATCC',
  },
  {
    id: 1754,
    name: 'Bitradio',
    symbol: 'BRO',
  },
  {
    id: 1755,
    name: 'Flash',
    symbol: 'FLASH',
  },
  {
    id: 1757,
    name: 'FUNToken',
    symbol: 'FUN',
  },
  {
    id: 1758,
    name: 'TenX',
    symbol: 'PAY',
  },
  {
    id: 1759,
    name: 'Status',
    symbol: 'SNT',
  },
  {
    id: 1762,
    name: 'Ergo',
    symbol: 'ERG',
  },
  {
    id: 1765,
    name: 'EOS',
    symbol: 'EOS',
  },
  {
    id: 1768,
    name: 'Ambire AdEx',
    symbol: 'ADX',
  },
  {
    id: 1769,
    name: 'Denarius',
    symbol: 'D',
  },
  {
    id: 1772,
    name: 'Storj',
    symbol: 'STORJ',
  },
  {
    id: 1774,
    name: 'SocialCoin',
    symbol: 'SOCC',
  },
  {
    id: 1776,
    name: 'MCO',
    symbol: 'MCO',
  },
  {
    id: 1779,
    name: 'Wagerr',
    symbol: 'WGR',
  },
  {
    id: 1784,
    name: 'Polybius',
    symbol: 'PLBT',
  },
  {
    id: 1785,
    name: 'Gas',
    symbol: 'GAS',
  },
  {
    id: 1786,
    name: 'SunContract',
    symbol: 'SNC',
  },
  {
    id: 1787,
    name: 'Jetcoin',
    symbol: 'JET',
  },
  {
    id: 1788,
    name: 'Metal',
    symbol: 'MTL',
  },
  {
    id: 1789,
    name: 'Populous',
    symbol: 'PPT',
  },
  {
    id: 1799,
    name: 'Rupee',
    symbol: 'RUP',
  },
  {
    id: 1803,
    name: 'PeepCoin',
    symbol: 'PCN',
  },
  {
    id: 1807,
    name: 'Santiment Network Token',
    symbol: 'SAN',
  },
  {
    id: 1808,
    name: 'OMG Network',
    symbol: 'OMG',
  },
  {
    id: 1810,
    name: 'CVCoin',
    symbol: 'CVN',
  },
  {
    id: 1814,
    name: 'Metrix Coin',
    symbol: 'MRX',
  },
  {
    id: 1816,
    name: 'Civic',
    symbol: 'CVC',
  },
  {
    id: 1817,
    name: 'Voyager Token',
    symbol: 'VGX',
  },
  {
    id: 1824,
    name: 'BitCoal',
    symbol: 'COAL',
  },
  {
    id: 1826,
    name: 'Particl',
    symbol: 'PART',
  },
  {
    id: 1828,
    name: 'SmartCash',
    symbol: 'SMART',
  },
  {
    id: 1830,
    name: 'SkinCoin',
    symbol: 'SKIN',
  },
  {
    id: 1831,
    name: 'Bitcoin Cash',
    symbol: 'BCH',
  },
  {
    id: 1834,
    name: 'Pillar',
    symbol: 'PLR',
  },
  {
    id: 1838,
    name: 'OracleChain',
    symbol: 'OCT',
  },
  {
    id: 1839,
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  {
    id: 1845,
    name: 'IXT',
    symbol: 'IXT',
  },
  {
    id: 1846,
    name: 'GeyserCoin',
    symbol: 'GSR',
  },
  {
    id: 1850,
    name: 'Cream',
    symbol: 'CRM',
  },
  {
    id: 1853,
    name: 'OAX',
    symbol: 'OAX',
  },
  {
    id: 1856,
    name: 'district0x',
    symbol: 'DNT',
  },
  {
    id: 1861,
    name: 'Stox',
    symbol: 'STX',
  },
  {
    id: 1866,
    name: 'Bytom',
    symbol: 'BTM',
  },
  {
    id: 1873,
    name: 'Blocktix',
    symbol: 'TIX',
  },
  {
    id: 1876,
    name: 'Dentacoin',
    symbol: 'DCN',
  },
  {
    id: 1878,
    name: 'Shadow Token',
    symbol: 'SHDW',
  },
  {
    id: 1881,
    name: 'DeepOnion',
    symbol: 'ONION',
  },
  {
    id: 1883,
    name: 'Adshares',
    symbol: 'ADS',
  },
  {
    id: 1886,
    name: 'Dent',
    symbol: 'DENT',
  },
  {
    id: 1888,
    name: 'InvestFeed',
    symbol: 'IFT',
  },
  {
    id: 1894,
    name: 'The ChampCoin',
    symbol: 'TCC',
  },
  {
    id: 1896,
    name: '0x',
    symbol: 'ZRX',
  },
  {
    id: 1899,
    name: 'YOYOW',
    symbol: 'YOYOW',
  },
  {
    id: 1902,
    name: 'MyBit',
    symbol: 'MYB',
  },
  {
    id: 1903,
    name: 'HyperCash',
    symbol: 'HC',
  },
  {
    id: 1905,
    name: 'TFL.io',
    symbol: 'TFL',
  },
  {
    id: 1908,
    name: 'Nebulas',
    symbol: 'NAS',
  },
  {
    id: 1916,
    name: 'BiblePay',
    symbol: 'BBP',
  },
  {
    id: 1918,
    name: 'Achain',
    symbol: 'ACT',
  },
  {
    id: 1925,
    name: 'Waltonchain',
    symbol: 'WTC',
  },
  {
    id: 1930,
    name: 'Primas',
    symbol: 'PST',
  },
  {
    id: 1931,
    name: 'Opus',
    symbol: 'OPT',
  },
  {
    id: 1934,
    name: 'Loopring',
    symbol: 'LRC',
  },
  {
    id: 1935,
    name: 'LiteCoin Ultra',
    symbol: 'LTCU',
  },
  {
    id: 1937,
    name: 'Po.et',
    symbol: 'POE',
  },
  {
    id: 1947,
    name: 'Monetha',
    symbol: 'MTH',
  },
  {
    id: 1948,
    name: 'Aventus',
    symbol: 'AVT',
  },
  {
    id: 1949,
    name: 'Agrello',
    symbol: 'DLT',
  },
  {
    id: 1950,
    name: 'Hiveterminal Token',
    symbol: 'HVN',
  },
  {
    id: 1954,
    name: 'Moeda Loyalty Points',
    symbol: 'MDA',
  },
  {
    id: 1955,
    name: 'Neblio',
    symbol: 'NEBL',
  },
  {
    id: 1958,
    name: 'TRON',
    symbol: 'TRX',
  },
  {
    id: 1962,
    name: 'BUZZCoin',
    symbol: 'BUZZ',
  },
  {
    id: 1966,
    name: 'Decentraland',
    symbol: 'MANA',
  },
  {
    id: 1967,
    name: 'Indorse Token',
    symbol: 'IND',
  },
  {
    id: 1968,
    name: 'XPA',
    symbol: 'XPA',
  },
  {
    id: 1969,
    name: 'Sociall',
    symbol: 'SCL',
  },
  {
    id: 1970,
    name: 'ATBCoin',
    symbol: 'ATB',
  },
  {
    id: 1974,
    name: 'Propy',
    symbol: 'PRO',
  },
  {
    id: 1975,
    name: 'Chainlink',
    symbol: 'LINK',
  },
  {
    id: 1982,
    name: 'Kyber Network Crystal Legacy',
    symbol: 'KNCL',
  },
  {
    id: 1983,
    name: 'VIBE',
    symbol: 'VIBE',
  },
  {
    id: 1984,
    name: 'Substratum',
    symbol: 'SUB',
  },
  {
    id: 1985,
    name: 'Chronologic',
    symbol: 'DAY',
  },
  {
    id: 1991,
    name: 'Rivetz',
    symbol: 'RVT',
  },
  {
    id: 1993,
    name: 'Kin',
    symbol: 'KIN',
  },
  {
    id: 1996,
    name: 'SALT',
    symbol: 'SALT',
  },
  {
    id: 1998,
    name: 'Ormeus Coin',
    symbol: 'ORMEUS',
  },
  {
    id: 2001,
    name: 'ColossusXT',
    symbol: 'COLX',
  },
  {
    id: 2002,
    name: 'TrezarCoin',
    symbol: 'TZC',
  },
  {
    id: 2006,
    name: 'Cobinhood',
    symbol: 'COB',
  },
  {
    id: 2008,
    name: 'MSD',
    symbol: 'MSD',
  },
  {
    id: 2009,
    name: 'Bismuth',
    symbol: 'BIS',
  },
  {
    id: 2010,
    name: 'Cardano',
    symbol: 'ADA',
  },
  {
    id: 2011,
    name: 'Tezos',
    symbol: 'XTZ',
  },
  {
    id: 2013,
    name: 'Infinity Economics',
    symbol: 'XIN',
  },
  {
    id: 2019,
    name: 'Viberate',
    symbol: 'VIB',
  },
  {
    id: 2021,
    name: 'RChain',
    symbol: 'REV',
  },
  {
    id: 2022,
    name: 'Internxt',
    symbol: 'INXT',
  },
  {
    id: 2030,
    name: 'REAL',
    symbol: 'REAL',
  },
  {
    id: 2034,
    name: 'Everex',
    symbol: 'EVX',
  },
  {
    id: 2036,
    name: 'PayPie',
    symbol: 'PPP',
  },
  {
    id: 2041,
    name: 'BitcoinZ',
    symbol: 'BTCZ',
  },
  {
    id: 2043,
    name: 'Cindicator',
    symbol: 'CND',
  },
  {
    id: 2044,
    name: 'Enigma',
    symbol: 'ENG',
  },
  {
    id: 2047,
    name: 'Zeusshield',
    symbol: 'ZSC',
  },
  {
    id: 2056,
    name: 'PiplCoin',
    symbol: 'PIPL',
  },
  {
    id: 2058,
    name: 'AirSwap',
    symbol: 'AST',
  },
  {
    id: 2061,
    name: 'Blockmason Credit Protocol',
    symbol: 'BCPT',
  },
  {
    id: 2062,
    name: 'Aion',
    symbol: 'AION',
  },
  {
    id: 2064,
    name: 'Maecenas',
    symbol: 'ART',
  },
  {
    id: 2066,
    name: 'Everus',
    symbol: 'EVR',
  },
  {
    id: 2070,
    name: 'DomRaider',
    symbol: 'DRT',
  },
  {
    id: 2071,
    name: 'Request',
    symbol: 'REQ',
  },
  {
    id: 2074,
    name: 'Ethereum Gold',
    symbol: 'ETG',
  },
  {
    id: 2076,
    name: 'Blue Protocol',
    symbol: 'BLUE',
  },
  {
    id: 2081,
    name: 'Ambrosus',
    symbol: 'AMB',
  },
  {
    id: 2083,
    name: 'Bitcoin Gold',
    symbol: 'BTG',
  },
  {
    id: 2087,
    name: 'KuCoin Token',
    symbol: 'KCS',
  },
  {
    id: 2088,
    name: 'EXRNchain',
    symbol: 'EXRN',
  },
  {
    id: 2090,
    name: 'LATOKEN',
    symbol: 'LA',
  },
  {
    id: 2091,
    name: 'Exchange Union',
    symbol: 'XUC',
  },
  {
    id: 2092,
    name: 'NULS',
    symbol: 'NULS',
  },
  {
    id: 2096,
    name: 'Ripio Credit Network',
    symbol: 'RCN',
  },
  {
    id: 2099,
    name: 'ICON',
    symbol: 'ICX',
  },
  {
    id: 2100,
    name: 'JavaScript Token',
    symbol: 'JS',
  },
  {
    id: 2104,
    name: 'iEthereum',
    symbol: 'IETH',
  },
  {
    id: 2105,
    name: 'Pirl',
    symbol: 'PIRL',
  },
  {
    id: 2107,
    name: 'LUXCoin',
    symbol: 'LUX',
  },
  {
    id: 2110,
    name: 'Dovu',
    symbol: 'DOV',
  },
  {
    id: 2112,
    name: 'Phoenix Global [old]',
    symbol: 'PHB',
  },
  {
    id: 2120,
    name: 'Etherparty',
    symbol: 'FUEL',
  },
  {
    id: 2126,
    name: 'FlypMe',
    symbol: 'FYP',
  },
  {
    id: 2130,
    name: 'Enjin Coin',
    symbol: 'ENJ',
  },
  {
    id: 2131,
    name: 'iBTC',
    symbol: 'IBTC',
  },
  {
    id: 2132,
    name: 'Powerledger',
    symbol: 'POWR',
  },
  {
    id: 2134,
    name: 'Grid+',
    symbol: 'GRID',
  },
  {
    id: 2135,
    name: 'Revain',
    symbol: 'REV',
  },
  {
    id: 2136,
    name: 'ATLANT',
    symbol: 'ATL',
  },
  {
    id: 2137,
    name: 'Electroneum',
    symbol: 'ETN',
  },
  {
    id: 2140,
    name: 'SONO',
    symbol: 'SONO',
  },
  {
    id: 2143,
    name: 'Streamr',
    symbol: 'DATA',
  },
  {
    id: 2144,
    name: 'SHIELD',
    symbol: 'XSH',
  },
  {
    id: 2147,
    name: 'ELTCOIN',
    symbol: 'ELTCOIN',
  },
  {
    id: 2148,
    name: 'Desire',
    symbol: 'DSR',
  },
  {
    id: 2151,
    name: 'Autonio',
    symbol: 'NIOX',
  },
  {
    id: 2153,
    name: 'Aeron',
    symbol: 'ARNX',
  },
  {
    id: 2158,
    name: 'Phore',
    symbol: 'PHR',
  },
  {
    id: 2160,
    name: 'Innova',
    symbol: 'INN',
  },
  {
    id: 2161,
    name: 'Raiden Network Token',
    symbol: 'RDN',
  },
  {
    id: 2162,
    name: 'Delphy',
    symbol: 'DPY',
  },
  {
    id: 2165,
    name: 'ERC20',
    symbol: 'ERC20',
  },
  {
    id: 2175,
    name: 'DecentBet',
    symbol: 'DBET',
  },
  {
    id: 2178,
    name: 'Upfiring',
    symbol: 'UFR',
  },
  {
    id: 2181,
    name: 'Genesis Vision',
    symbol: 'GVT',
  },
  {
    id: 2184,
    name: 'Privatix',
    symbol: 'PRIX',
  },
  {
    id: 2185,
    name: 'Lethean',
    symbol: 'LTHN',
  },
  {
    id: 2191,
    name: 'Paypex',
    symbol: 'PAYX',
  },
  {
    id: 2200,
    name: 'GoByte',
    symbol: 'GBX',
  },
  {
    id: 2205,
    name: 'Phantomx',
    symbol: 'PNX',
  },
  {
    id: 2208,
    name: 'EncrypGen',
    symbol: 'DNA',
  },
  {
    id: 2209,
    name: 'Ink',
    symbol: 'INK',
  },
  {
    id: 2212,
    name: 'Quantstamp',
    symbol: 'QSP',
  },
  {
    id: 2213,
    name: 'QASH',
    symbol: 'QASH',
  },
  {
    id: 2215,
    name: 'Energo',
    symbol: 'TSL',
  },
  {
    id: 2219,
    name: 'SpankChain',
    symbol: 'SPANK',
  },
  {
    id: 2221,
    name: 'VoteCoin',
    symbol: 'VOT',
  },
  {
    id: 2222,
    name: 'Bitcoin Diamond',
    symbol: 'BCD',
  },
  {
    id: 2223,
    name: 'BLOCKv',
    symbol: 'VEE',
  },
  {
    id: 2230,
    name: 'MONK',
    symbol: 'MONK',
  },
  {
    id: 2231,
    name: 'Flixxo',
    symbol: 'FLIXX',
  },
  {
    id: 2235,
    name: 'Time New Bank',
    symbol: 'TNB',
  },
  {
    id: 2236,
    name: 'MyWish',
    symbol: 'WISH',
  },
  {
    id: 2237,
    name: 'EventChain',
    symbol: 'EVC',
  },
  {
    id: 2240,
    name: 'SoMee.Social [OLD]',
    symbol: 'ONG',
  },
  {
    id: 2241,
    name: 'Ccore',
    symbol: 'CCO',
  },
  {
    id: 2242,
    name: 'Qbao',
    symbol: 'QBT',
  },
  {
    id: 2243,
    name: 'Dragonchain',
    symbol: 'DRGN',
  },
  {
    id: 2244,
    name: 'Payfair',
    symbol: 'PFR',
  },
  {
    id: 2245,
    name: 'Presearch',
    symbol: 'PRE',
  },
  {
    id: 2246,
    name: 'CyberMiles',
    symbol: 'CMT',
  },
  {
    id: 2247,
    name: 'BlockCDN',
    symbol: 'BCDN',
  },
  {
    id: 2248,
    name: 'Cappasity',
    symbol: 'CAPP',
  },
  {
    id: 2249,
    name: 'Eroscoin',
    symbol: 'ERO',
  },
  {
    id: 2251,
    name: 'IoT Chain',
    symbol: 'ITC',
  },
  {
    id: 2255,
    name: 'Social Send',
    symbol: 'SEND',
  },
  {
    id: 2256,
    name: 'Bonpay',
    symbol: 'BON',
  },
  {
    id: 2257,
    name: 'Nekonium',
    symbol: 'NUKO',
  },
  {
    id: 2260,
    name: 'Datamine',
    symbol: 'DAM',
  },
  {
    id: 2267,
    name: 'Wabi',
    symbol: 'WABI',
  },
  {
    id: 2269,
    name: 'WandX',
    symbol: 'WAND',
  },
  {
    id: 2273,
    name: 'Uquid Coin',
    symbol: 'UQC',
  },
  {
    id: 2274,
    name: 'MediShares',
    symbol: 'MDS',
  },
  {
    id: 2276,
    name: 'Ignis',
    symbol: 'IGNIS',
  },
  {
    id: 2277,
    name: 'SmartMesh',
    symbol: 'SMT',
  },
  {
    id: 2279,
    name: 'Playkey',
    symbol: 'PKT',
  },
  {
    id: 2280,
    name: 'Filecoin',
    symbol: 'FIL',
  },
  {
    id: 2281,
    name: 'BitcoinX',
    symbol: 'BCX',
  },
  {
    id: 2282,
    name: 'Super Bitcoin',
    symbol: 'SBTC',
  },
  {
    id: 2283,
    name: 'Datum',
    symbol: 'DAT',
  },
  {
    id: 2286,
    name: 'MicroMoney',
    symbol: 'AMM',
  },
  {
    id: 2287,
    name: 'LockTrip',
    symbol: 'LOC',
  },
  {
    id: 2288,
    name: 'Worldcore',
    symbol: 'WRC',
  },
  {
    id: 2289,
    name: 'Gifto',
    symbol: 'GTO',
  },
  {
    id: 2290,
    name: 'YENTEN',
    symbol: 'YTN',
  },
  {
    id: 2291,
    name: 'Genaro Network',
    symbol: 'GNX',
  },
  {
    id: 2293,
    name: 'United Bitcoin',
    symbol: 'UBTC',
  },
  {
    id: 2295,
    name: 'Starbase',
    symbol: 'STAR',
  },
  {
    id: 2296,
    name: 'OST',
    symbol: 'OST',
  },
  {
    id: 2297,
    name: 'StormX',
    symbol: 'STMX',
  },
  {
    id: 2299,
    name: 'aelf',
    symbol: 'ELF',
  },
  {
    id: 2300,
    name: 'WAX',
    symbol: 'WAXP',
  },
  {
    id: 2303,
    name: 'MediBloc',
    symbol: 'MED',
  },
  {
    id: 2305,
    name: 'NAGA',
    symbol: 'NGC',
  },
  {
    id: 2306,
    name: 'Bread',
    symbol: 'BRD',
  },
  {
    id: 2307,
    name: 'Bibox Token',
    symbol: 'BIX',
  },
  {
    id: 2309,
    name: 'SophiaTX',
    symbol: 'SPHTX',
  },
  {
    id: 2310,
    name: 'Bounty0x',
    symbol: 'BNTY',
  },
  {
    id: 2313,
    name: 'SIRIN LABS Token',
    symbol: 'SRN',
  },
  {
    id: 2315,
    name: 'HTMLCOIN',
    symbol: 'HTML',
  },
  {
    id: 2316,
    name: 'DeepBrain Chain',
    symbol: 'DBC',
  },
  {
    id: 2318,
    name: 'Neumark',
    symbol: 'NEU',
  },
  {
    id: 2319,
    name: 'Qcash',
    symbol: 'QC',
  },
  {
    id: 2320,
    name: 'Utrust',
    symbol: 'UTK',
  },
  {
    id: 2321,
    name: 'QLC Chain',
    symbol: 'QLC',
  },
  {
    id: 2323,
    name: 'HEROcoin',
    symbol: 'PLAY',
  },
  {
    id: 2324,
    name: 'BigONE Token',
    symbol: 'ONE',
  },
  {
    id: 2325,
    name: 'Matryx',
    symbol: 'MTX',
  },
  {
    id: 2329,
    name: 'Hyper Pay',
    symbol: 'HPY',
  },
  {
    id: 2332,
    name: 'STRAKS',
    symbol: 'STAK',
  },
  {
    id: 2335,
    name: 'Lightning Bitcoin',
    symbol: 'LBTC',
  },
  {
    id: 2336,
    name: 'Game.com',
    symbol: 'GTC',
  },
  {
    id: 2337,
    name: 'Lamden',
    symbol: 'TAU',
  },
  {
    id: 2341,
    name: 'SwftCoin',
    symbol: 'SWFTC',
  },
  {
    id: 2342,
    name: 'Covesting',
    symbol: 'COV',
  },
  {
    id: 2343,
    name: 'CanYaCoin',
    symbol: 'CAN',
  },
  {
    id: 2344,
    name: 'AppCoins',
    symbol: 'APPC',
  },
  {
    id: 2345,
    name: 'High Performance Blockchain',
    symbol: 'HPB',
  },
  {
    id: 2346,
    name: 'WaykiChain',
    symbol: 'WICC',
  },
  {
    id: 2348,
    name: 'Measurable Data Token',
    symbol: 'MDT',
  },
  {
    id: 2349,
    name: 'Mixin',
    symbol: 'XIN',
  },
  {
    id: 2352,
    name: 'Coinlancer',
    symbol: 'CL',
  },
  {
    id: 2354,
    name: 'GET Protocol',
    symbol: 'GET',
  },
  {
    id: 2357,
    name: 'AI Doctor',
    symbol: 'AIDOC',
  },
  {
    id: 2359,
    name: 'Polis',
    symbol: 'POLIS',
  },
  {
    id: 2363,
    name: 'Zap',
    symbol: 'ZAP',
  },
  {
    id: 2364,
    name: 'TokenClub',
    symbol: 'TCT',
  },
  {
    id: 2366,
    name: 'FairGame',
    symbol: 'FAIR',
  },
  {
    id: 2367,
    name: 'Aigang',
    symbol: 'AIX',
  },
  {
    id: 2370,
    name: 'Bitcoin God',
    symbol: 'GOD',
  },
  {
    id: 2371,
    name: 'United Traders Token',
    symbol: 'UTT',
  },
  {
    id: 2376,
    name: 'TopChain',
    symbol: 'TOPC',
  },
  {
    id: 2379,
    name: 'Kcash',
    symbol: 'KCASH',
  },
  {
    id: 2380,
    name: 'ATN',
    symbol: 'ATN',
  },
  {
    id: 2382,
    name: 'Spectre.ai Utility Token',
    symbol: 'SXUT',
  },
  {
    id: 2386,
    name: 'KZ Cash',
    symbol: 'KZC',
  },
  {
    id: 2387,
    name: 'Bitcoin Atom',
    symbol: 'BCA',
  },
  {
    id: 2391,
    name: 'EchoLink',
    symbol: 'EKO',
  },
  {
    id: 2392,
    name: 'Bottos',
    symbol: 'BTO',
  },
  {
    id: 2394,
    name: 'Telcoin',
    symbol: 'TEL',
  },
  {
    id: 2395,
    name: 'Ignition',
    symbol: 'IC',
  },
  {
    id: 2396,
    name: 'WETH',
    symbol: 'WETH',
  },
  {
    id: 2398,
    name: 'Selfkey',
    symbol: 'KEY',
  },
  {
    id: 2399,
    name: 'INT',
    symbol: 'INT',
  },
  {
    id: 2400,
    name: 'OneRoot Network',
    symbol: 'RNT',
  },
  {
    id: 2402,
    name: 'Sense',
    symbol: 'SENSE',
  },
  {
    id: 2403,
    name: 'MOAC',
    symbol: 'MOAC',
  },
  {
    id: 2405,
    name: 'IOST',
    symbol: 'IOST',
  },
  {
    id: 2406,
    name: 'InvestDigital',
    symbol: 'IDT',
  },
  {
    id: 2407,
    name: 'AICHAIN',
    symbol: 'AIT',
  },
  {
    id: 2410,
    name: 'SpaceChain',
    symbol: 'SPC',
  },
  {
    id: 2411,
    name: 'Galactrum',
    symbol: 'ORE',
  },
  {
    id: 2415,
    name: 'ArbitrageCT',
    symbol: 'ARCT',
  },
  {
    id: 2416,
    name: 'THETA',
    symbol: 'THETA',
  },
  {
    id: 2419,
    name: 'Profile Utility Token',
    symbol: 'PUT',
  },
  {
    id: 2422,
    name: 'IDEX Membership',
    symbol: 'IDXM',
  },
  {
    id: 2424,
    name: 'SingularityNET',
    symbol: 'AGIX',
  },
  {
    id: 2427,
    name: 'ChatCoin',
    symbol: 'CHAT',
  },
  {
    id: 2428,
    name: 'Scry.info',
    symbol: 'DDD',
  },
  {
    id: 2429,
    name: 'Mobius',
    symbol: 'MOBI',
  },
  {
    id: 2430,
    name: 'Hydro Protocol',
    symbol: 'HOT',
  },
  {
    id: 2434,
    name: 'Maggie',
    symbol: 'MAG',
  },
  {
    id: 2437,
    name: 'YEE',
    symbol: 'YEE',
  },
  {
    id: 2438,
    name: 'Acute Angle Cloud',
    symbol: 'AAC',
  },
  {
    id: 2441,
    name: 'Molecular Future',
    symbol: 'MOF',
  },
  {
    id: 2443,
    name: 'Trinity Network Credit',
    symbol: 'TNC',
  },
  {
    id: 2444,
    name: 'CRYPTO20',
    symbol: 'C20',
  },
  {
    id: 2446,
    name: 'DATA',
    symbol: 'DTA',
  },
  {
    id: 2447,
    name: 'Crypterium',
    symbol: 'CRPT',
  },
  {
    id: 2448,
    name: 'SparksPay',
    symbol: 'SPK',
  },
  {
    id: 2450,
    name: 'carVertical',
    symbol: 'CV',
  },
  {
    id: 2452,
    name: 'Tokenbox',
    symbol: 'TBX',
  },
  {
    id: 2453,
    name: 'EDUCare',
    symbol: 'EKT',
  },
  {
    id: 2454,
    name: 'UnlimitedIP',
    symbol: 'UIP',
  },
  {
    id: 2457,
    name: 'TrueChain',
    symbol: 'TRUE',
  },
  {
    id: 2458,
    name: 'Odyssey',
    symbol: 'OCN',
  },
  {
    id: 2459,
    name: 'indaHash',
    symbol: 'IDH',
  },
  {
    id: 2462,
    name: 'AidCoin',
    symbol: 'AID',
  },
  {
    id: 2464,
    name: 'Devery',
    symbol: 'EVE',
  },
  {
    id: 2465,
    name: 'BUX Token',
    symbol: 'BUX',
  },
  {
    id: 2466,
    name: 'AXPR',
    symbol: 'AXPR',
  },
  {
    id: 2467,
    name: 'OriginTrail',
    symbol: 'TRAC',
  },
  {
    id: 2468,
    name: 'LinkEye',
    symbol: 'LET',
  },
  {
    id: 2469,
    name: 'Zilliqa',
    symbol: 'ZIL',
  },
  {
    id: 2470,
    name: 'CoinMeet',
    symbol: 'MEET',
  },
  {
    id: 2471,
    name: 'Smartlands Network',
    symbol: 'SLT',
  },
  {
    id: 2472,
    name: 'Fortuna',
    symbol: 'FOTA',
  },
  {
    id: 2473,
    name: 'All Sports',
    symbol: 'SOC',
  },
  {
    id: 2474,
    name: 'Matrix AI Network',
    symbol: 'MAN',
  },
  {
    id: 2475,
    name: 'Garlicoin',
    symbol: 'GRLC',
  },
  {
    id: 2476,
    name: 'Ruff',
    symbol: 'RUFF',
  },
  {
    id: 2478,
    name: 'CoinFi',
    symbol: 'COFI',
  },
  {
    id: 2479,
    name: 'Equal',
    symbol: 'EQL',
  },
  {
    id: 2481,
    name: 'Zeepin',
    symbol: 'ZPT',
  },
  {
    id: 2482,
    name: 'CPChain',
    symbol: 'CPC',
  },
  {
    id: 2489,
    name: 'BitWhite',
    symbol: 'BTW',
  },
  {
    id: 2490,
    name: 'CargoX',
    symbol: 'CXO',
  },
  {
    id: 2492,
    name: 'Elastos',
    symbol: 'ELA',
  },
  {
    id: 2493,
    name: 'STK',
    symbol: 'STK',
  },
  {
    id: 2496,
    name: 'Polymath',
    symbol: 'POLY',
  },
  {
    id: 2497,
    name: 'Medicalchain',
    symbol: 'MTN',
  },
  {
    id: 2499,
    name: 'SwissBorg',
    symbol: 'CHSB',
  },
  {
    id: 2500,
    name: 'Zilla',
    symbol: 'ZLA',
  },
  {
    id: 2501,
    name: 'adbank',
    symbol: 'ADB',
  },
  {
    id: 2502,
    name: 'Huobi Token',
    symbol: 'HT',
  },
  {
    id: 2503,
    name: 'DMarket',
    symbol: 'DMT',
  },
  {
    id: 2505,
    name: 'Bluzelle',
    symbol: 'BLZ',
  },
  {
    id: 2506,
    name: 'Swarm',
    symbol: 'SWM',
  },
  {
    id: 2507,
    name: 'THEKEY',
    symbol: 'TKY',
  },
  {
    id: 2511,
    name: 'WePower',
    symbol: 'WPR',
  },
  {
    id: 2513,
    name: 'GoldMint',
    symbol: 'MNTP',
  },
  {
    id: 2516,
    name: 'MktCoin',
    symbol: 'MLM',
  },
  {
    id: 2524,
    name: 'Universa',
    symbol: 'UTNP',
  },
  {
    id: 2525,
    name: 'Alphacat',
    symbol: 'ACAT',
  },
  {
    id: 2527,
    name: 'SureRemit',
    symbol: 'RMT',
  },
  {
    id: 2528,
    name: 'Dether',
    symbol: 'DTH',
  },
  {
    id: 2529,
    name: 'Cashaa',
    symbol: 'CAS',
  },
  {
    id: 2530,
    name: 'Fusion',
    symbol: 'FSN',
  },
  {
    id: 2533,
    name: 'Restart Energy MWAT',
    symbol: 'MWAT',
  },
  {
    id: 2535,
    name: 'Edge',
    symbol: 'EDGE',
  },
  {
    id: 2536,
    name: 'Neurotoken',
    symbol: 'NTK',
  },
  {
    id: 2537,
    name: 'Gems ',
    symbol: 'GEM',
  },
  {
    id: 2538,
    name: 'Nectar',
    symbol: 'NEC',
  },
  {
    id: 2539,
    name: 'Ren',
    symbol: 'REN',
  },
  {
    id: 2540,
    name: 'Litecoin Cash',
    symbol: 'LCC',
  },
  {
    id: 2542,
    name: 'Tidex Token',
    symbol: 'TDX',
  },
  {
    id: 2544,
    name: 'Nucleus Vision',
    symbol: 'NCASH',
  },
  {
    id: 2545,
    name: 'Arcblock',
    symbol: 'ABT',
  },
  {
    id: 2546,
    name: 'Remme',
    symbol: 'REM',
  },
  {
    id: 2548,
    name: 'POA Network',
    symbol: 'POA',
  },
  {
    id: 2549,
    name: 'Ink Protocol',
    symbol: 'XNK',
  },
  {
    id: 2551,
    name: 'Bezop',
    symbol: 'BEZ',
  },
  {
    id: 2552,
    name: 'IHT Real Estate Protocol',
    symbol: 'IHT',
  },
  {
    id: 2553,
    name: 'Refereum',
    symbol: 'RFR',
  },
  {
    id: 2554,
    name: 'Lympo',
    symbol: 'LYM',
  },
  {
    id: 2555,
    name: 'Sether',
    symbol: 'SETH',
  },
  {
    id: 2556,
    name: 'Credits',
    symbol: 'CS',
  },
  {
    id: 2558,
    name: 'Insights Network',
    symbol: 'INSTAR',
  },
  {
    id: 2561,
    name: 'BitTube',
    symbol: 'TUBE',
  },
  {
    id: 2562,
    name: 'Education Ecosystem',
    symbol: 'LEDU',
  },
  {
    id: 2563,
    name: 'TrueUSD',
    symbol: 'TUSD',
  },
  {
    id: 2564,
    name: 'HOQU',
    symbol: 'HQX',
  },
  {
    id: 2565,
    name: 'StarterCoin',
    symbol: 'STAC',
  },
  {
    id: 2566,
    name: 'Ontology',
    symbol: 'ONT',
  },
  {
    id: 2567,
    name: 'DATx',
    symbol: 'DATX',
  },
  {
    id: 2568,
    name: 'JET8',
    symbol: 'J8T',
  },
  {
    id: 2570,
    name: 'TomoChain',
    symbol: 'TOMO',
  },
  {
    id: 2571,
    name: 'Graft',
    symbol: 'GRFT',
  },
  {
    id: 2572,
    name: 'BABB',
    symbol: 'BAX',
  },
  {
    id: 2573,
    name: 'Electrify.Asia',
    symbol: 'ELEC',
  },
  {
    id: 2575,
    name: 'Bitcoin Private',
    symbol: 'BTCP',
  },
  {
    id: 2576,
    name: 'Tokenomy',
    symbol: 'TEN',
  },
  {
    id: 2577,
    name: 'Ravencoin',
    symbol: 'RVN',
  },
  {
    id: 2578,
    name: 'TE-FOOD',
    symbol: 'TONE',
  },
  {
    id: 2579,
    name: 'ShipChain',
    symbol: 'SHIP',
  },
  {
    id: 2584,
    name: 'Debitum',
    symbol: 'DEB',
  },
  {
    id: 2585,
    name: 'Centrality',
    symbol: 'CENNZ',
  },
  {
    id: 2586,
    name: 'Synthetix',
    symbol: 'SNX',
  },
  {
    id: 2588,
    name: 'Loom Network',
    symbol: 'LOOM',
  },
  {
    id: 2592,
    name: 'Banca',
    symbol: 'BANCA',
  },
  {
    id: 2595,
    name: 'NANJCOIN',
    symbol: 'NANJ',
  },
  {
    id: 2597,
    name: 'UpToken',
    symbol: 'UP',
  },
  {
    id: 2601,
    name: '1World',
    symbol: '1WO',
  },
  {
    id: 2602,
    name: 'NaPoleonX',
    symbol: 'NPX',
  },
  {
    id: 2603,
    name: 'Pundi X[old]',
    symbol: 'NPXS',
  },
  {
    id: 2604,
    name: 'Bitcoin Green',
    symbol: 'BITG',
  },
  {
    id: 2605,
    name: 'BnkToTheFuture',
    symbol: 'BFT',
  },
  {
    id: 2606,
    name: 'Wanchain',
    symbol: 'WAN',
  },
  {
    id: 2607,
    name: 'AMLT',
    symbol: 'AMLT',
  },
  {
    id: 2608,
    name: 'Mithril',
    symbol: 'MITH',
  },
  {
    id: 2610,
    name: 'PECULIUM',
    symbol: 'PCL',
  },
  {
    id: 2614,
    name: 'BlitzPick',
    symbol: 'XBP',
  },
  {
    id: 2616,
    name: 'Stipend',
    symbol: 'SPD',
  },
  {
    id: 2620,
    name: 'Switcheo',
    symbol: 'SWTH',
  },
  {
    id: 2624,
    name: 'Sentinel Chain',
    symbol: 'SENC',
  },
  {
    id: 2626,
    name: 'Friendz',
    symbol: 'FDZ',
  },
  {
    id: 2627,
    name: 'TokenPay',
    symbol: 'TPAY',
  },
  {
    id: 2628,
    name: 'Rentberry',
    symbol: 'BERRY',
  },
  {
    id: 2629,
    name: 'Scala',
    symbol: 'XLA',
  },
  {
    id: 2630,
    name: 'PolySwarm',
    symbol: 'NCT',
  },
  {
    id: 2631,
    name: 'ODEM',
    symbol: 'ODE',
  },
  {
    id: 2633,
    name: 'Stakenet',
    symbol: 'XSN',
  },
  {
    id: 2634,
    name: 'XDC Network',
    symbol: 'XDC',
  },
  {
    id: 2638,
    name: 'Cortex',
    symbol: 'CTXC',
  },
  {
    id: 2642,
    name: 'CyberVein',
    symbol: 'CVT',
  },
  {
    id: 2643,
    name: 'Sentinel',
    symbol: 'DVPN',
  },
  {
    id: 2644,
    name: 'eosDAC',
    symbol: 'EOSDAC',
  },
  {
    id: 2645,
    name: 'U Network',
    symbol: 'UUU',
  },
  {
    id: 2653,
    name: 'Auctus',
    symbol: 'AUC',
  },
  {
    id: 2654,
    name: 'Budbo',
    symbol: 'BUBO',
  },
  {
    id: 2655,
    name: 'Monero Classic',
    symbol: 'XMC',
  },
  {
    id: 2658,
    name: 'Smart MFG',
    symbol: 'MFG',
  },
  {
    id: 2660,
    name: 'Aditus',
    symbol: 'ADI',
  },
  {
    id: 2661,
    name: 'Tripio',
    symbol: 'TRIO',
  },
  {
    id: 2662,
    name: 'Haven Protocol',
    symbol: 'XHV',
  },
  {
    id: 2665,
    name: 'Dero',
    symbol: 'DERO',
  },
  {
    id: 2666,
    name: 'Effect Network',
    symbol: 'EFX',
  },
  {
    id: 2667,
    name: 'FintruX Network',
    symbol: 'FTX',
  },
  {
    id: 2673,
    name: 'WeOwn',
    symbol: 'CHX',
  },
  {
    id: 2674,
    name: 'Masari',
    symbol: 'MSR',
  },
  {
    id: 2675,
    name: 'Dock',
    symbol: 'DOCK',
  },
  {
    id: 2676,
    name: 'PHI Token',
    symbol: 'PHI',
  },
  {
    id: 2677,
    name: 'Linker Coin',
    symbol: 'LNC',
  },
  {
    id: 2679,
    name: 'Decentralized Machine Learning',
    symbol: 'DML',
  },
  {
    id: 2682,
    name: 'Holo',
    symbol: 'HOT',
  },
  {
    id: 2685,
    name: 'Zebi Token',
    symbol: 'ZEBI',
  },
  {
    id: 2688,
    name: 'Vipstar Coin',
    symbol: 'VIPS',
  },
  {
    id: 2689,
    name: 'Rublix',
    symbol: 'RBLX',
  },
  {
    id: 2690,
    name: 'Biotron',
    symbol: 'BTRN',
  },
  {
    id: 2691,
    name: 'Penta',
    symbol: 'PNT',
  },
  {
    id: 2694,
    name: 'Nexo',
    symbol: 'NEXO',
  },
  {
    id: 2696,
    name: 'DAEX',
    symbol: 'DAX',
  },
  {
    id: 2698,
    name: 'Hydro',
    symbol: 'HYDRO',
  },
  {
    id: 2699,
    name: 'Sharder',
    symbol: 'SS',
  },
  {
    id: 2700,
    name: 'Celsius',
    symbol: 'CEL',
  },
  {
    id: 2702,
    name: 'Bitcoin Interest',
    symbol: 'BCI',
  },
  {
    id: 2704,
    name: 'Transcodium',
    symbol: 'TNS',
  },
  {
    id: 2705,
    name: 'Amon',
    symbol: 'AMN',
  },
  {
    id: 2709,
    name: 'Morpheus Labs',
    symbol: 'MITX',
  },
  {
    id: 2711,
    name: 'DOC.COM',
    symbol: 'MTC',
  },
  {
    id: 2712,
    name: 'MyToken',
    symbol: 'MT',
  },
  {
    id: 2713,
    name: 'KEY',
    symbol: 'KEY',
  },
  {
    id: 2717,
    name: 'BoutsPro',
    symbol: 'BOUTS',
  },
  {
    id: 2720,
    name: 'Parkgene',
    symbol: 'GENE',
  },
  {
    id: 2721,
    name: 'APR Coin',
    symbol: 'APR',
  },
  {
    id: 2723,
    name: 'FuzeX',
    symbol: 'FXT',
  },
  {
    id: 2724,
    name: 'Zippie',
    symbol: 'ZIPT',
  },
  {
    id: 2725,
    name: 'Skrumble Network',
    symbol: 'SKM',
  },
  {
    id: 2726,
    name: 'DAOstack',
    symbol: 'GEN',
  },
  {
    id: 2727,
    name: 'Bezant',
    symbol: 'BZNT',
  },
  {
    id: 2734,
    name: 'EduCoin',
    symbol: 'EDU',
  },
  {
    id: 2735,
    name: 'Content Neutrality Network',
    symbol: 'CNN',
  },
  {
    id: 2737,
    name: 'Global Social Chain',
    symbol: 'GSC',
  },
  {
    id: 2739,
    name: 'Digix Gold Token',
    symbol: 'DGX',
  },
  {
    id: 2741,
    name: 'Intelligent Investment Chain',
    symbol: 'IIC',
  },
  {
    id: 2742,
    name: 'Sakura Bloom',
    symbol: 'SKB',
  },
  {
    id: 2745,
    name: 'Joint Ventures',
    symbol: 'JOINT',
  },
  {
    id: 2746,
    name: 'GreenPower',
    symbol: 'GRN',
  },
  {
    id: 2747,
    name: 'BlockMesh',
    symbol: 'BMH',
  },
  {
    id: 2748,
    name: 'Oxen',
    symbol: 'OXEN',
  },
  {
    id: 2752,
    name: 'Datarius Credit',
    symbol: 'DTRC',
  },
  {
    id: 2757,
    name: 'Callisto Network',
    symbol: 'CLO',
  },
  {
    id: 2758,
    name: 'Unibright',
    symbol: 'UBT',
  },
  {
    id: 2759,
    name: 'Patron',
    symbol: 'PAT',
  },
  {
    id: 2760,
    name: 'Cred',
    symbol: 'LBA',
  },
  {
    id: 2762,
    name: 'Open Platform',
    symbol: 'OPEN',
  },
  {
    id: 2763,
    name: 'Morpheus.Network',
    symbol: 'MNW',
  },
  {
    id: 2764,
    name: 'Silent Notary',
    symbol: 'UBSN',
  },
  {
    id: 2765,
    name: 'XYO',
    symbol: 'XYO',
  },
  {
    id: 2766,
    name: 'Cryptaur',
    symbol: 'CPT',
  },
  {
    id: 2771,
    name: 'RED',
    symbol: 'RED',
  },
  {
    id: 2772,
    name: 'Digitex',
    symbol: 'DGTX',
  },
  {
    id: 2775,
    name: 'Faceter',
    symbol: 'FACE',
  },
  {
    id: 2776,
    name: 'Travala.com',
    symbol: 'AVA',
  },
  {
    id: 2777,
    name: 'IoTeX',
    symbol: 'IOTX',
  },
  {
    id: 2780,
    name: 'NKN',
    symbol: 'NKN',
  },
  {
    id: 2827,
    name: 'Phantasma',
    symbol: 'SOUL',
  },
  {
    id: 2828,
    name: 'SPINDLE',
    symbol: 'SPD',
  },
  {
    id: 2829,
    name: 'REPO',
    symbol: 'REPO',
  },
  {
    id: 2830,
    name: 'Seele-N',
    symbol: 'SEELE',
  },
  {
    id: 2835,
    name: 'Endor Protocol',
    symbol: 'EDR',
  },
  {
    id: 2836,
    name: 'Bigbom',
    symbol: 'BBO',
  },
  {
    id: 2837,
    name: '0xBitcoin',
    symbol: '0xBTC',
  },
  {
    id: 2838,
    name: 'Plian',
    symbol: 'PI',
  },
  {
    id: 2840,
    name: 'QuarkChain',
    symbol: 'QKC',
  },
  {
    id: 2842,
    name: 'Bankera',
    symbol: 'BNK',
  },
  {
    id: 2843,
    name: 'Ether Zero',
    symbol: 'ETZ',
  },
  {
    id: 2846,
    name: 'FuturoCoin',
    symbol: 'FTO',
  },
  {
    id: 2847,
    name: 'Abyss',
    symbol: 'ABYSS',
  },
  {
    id: 2850,
    name: 'TRAXIA',
    symbol: 'TM2',
  },
  {
    id: 2852,
    name: 'Engine',
    symbol: 'EGCC',
  },
  {
    id: 2855,
    name: 'CBC.network',
    symbol: 'CBC',
  },
  {
    id: 2856,
    name: 'CEEK VR',
    symbol: 'CEEK',
  },
  {
    id: 2859,
    name: 'XMax',
    symbol: 'XMX',
  },
  {
    id: 2861,
    name: 'GoChain',
    symbol: 'GO',
  },
  {
    id: 2862,
    name: 'Smartshare',
    symbol: 'SSP',
  },
  {
    id: 2865,
    name: 'Trittium',
    symbol: 'TRTT',
  },
  {
    id: 2866,
    name: 'Sentinel Protocol',
    symbol: 'UPP',
  },
  {
    id: 2868,
    name: 'Constellation',
    symbol: 'DAG',
  },
  {
    id: 2869,
    name: 'Merculet',
    symbol: 'MVP',
  },
  {
    id: 2870,
    name: 'FantasyGold',
    symbol: 'FGC',
  },
  {
    id: 2871,
    name: 'Ubique Chain Of Things',
    symbol: 'UCT',
  },
  {
    id: 2873,
    name: 'Metronome',
    symbol: 'MET',
  },
  {
    id: 2874,
    name: 'Aurora',
    symbol: 'AOA',
  },
  {
    id: 2876,
    name: 'Ternio',
    symbol: 'TERN',
  },
  {
    id: 2878,
    name: 'DigiFinexToken',
    symbol: 'DFT',
  },
  {
    id: 2879,
    name: 'Origin Sport',
    symbol: 'ORS',
  },
  {
    id: 2880,
    name: 'Rate3',
    symbol: 'RTE',
  },
  {
    id: 2882,
    name: '0Chain',
    symbol: 'ZCN',
  },
  {
    id: 2883,
    name: 'ZINC',
    symbol: 'ZINC',
  },
  {
    id: 2884,
    name: 'FSBT API Token',
    symbol: 'FSBT',
  },
  {
    id: 2885,
    name: 'Egretia',
    symbol: 'EGT',
  },
  {
    id: 2889,
    name: "Bob's Repair",
    symbol: 'BOB',
  },
  {
    id: 2890,
    name: 'KanadeCoin',
    symbol: 'KNDC',
  },
  {
    id: 2891,
    name: 'Cardstack',
    symbol: 'CARD',
  },
  {
    id: 2894,
    name: 'OTCBTC Token',
    symbol: 'OTB',
  },
  {
    id: 2896,
    name: 'Hifi Finance',
    symbol: 'MFT',
  },
  {
    id: 2898,
    name: 'GoNetwork',
    symbol: 'GOT',
  },
  {
    id: 2900,
    name: 'Project Pai',
    symbol: 'PAI',
  },
  {
    id: 2901,
    name: 'FansTime',
    symbol: 'FTI',
  },
  {
    id: 2906,
    name: 'Essentia',
    symbol: 'ESS',
  },
  {
    id: 2907,
    name: 'Karatgold Coin',
    symbol: 'KBC',
  },
  {
    id: 2908,
    name: 'HashCoin',
    symbol: 'HSC',
  },
  {
    id: 2909,
    name: 'LikeCoin',
    symbol: 'LIKE',
  },
  {
    id: 2911,
    name: 'ORS Group',
    symbol: 'ORS',
  },
  {
    id: 2912,
    name: 'TENT',
    symbol: 'TENT',
  },
  {
    id: 2913,
    name: 'Databroker',
    symbol: 'DTX',
  },
  {
    id: 2914,
    name: 'BeeKan',
    symbol: 'BKBT',
  },
  {
    id: 2915,
    name: 'Moss Coin',
    symbol: 'MOC',
  },
  {
    id: 2916,
    name: 'Nimiq',
    symbol: 'NIM',
  },
  {
    id: 2920,
    name: '0xcert',
    symbol: 'ZXC',
  },
  {
    id: 2921,
    name: 'OneLedger',
    symbol: 'OLT',
  },
  {
    id: 2927,
    name: 'sUSD',
    symbol: 'SUSD',
  },
  {
    id: 2929,
    name: 'Truegame',
    symbol: 'TGAME',
  },
  {
    id: 2930,
    name: 'Everipedia',
    symbol: 'IQ',
  },
  {
    id: 2933,
    name: 'BitMart Token',
    symbol: 'BMX',
  },
  {
    id: 2934,
    name: 'BitKan',
    symbol: 'KAN',
  },
  {
    id: 2937,
    name: 'VITE',
    symbol: 'VITE',
  },
  {
    id: 2938,
    name: 'Hashgard',
    symbol: 'GARD',
  },
  {
    id: 2941,
    name: 'CoinEx Token',
    symbol: 'CET',
  },
  {
    id: 2943,
    name: 'Rocket Pool',
    symbol: 'RPL',
  },
  {
    id: 2944,
    name: 'Elysian',
    symbol: 'ELY',
  },
  {
    id: 2945,
    name: 'ContentBox',
    symbol: 'BOX',
  },
  {
    id: 2947,
    name: 'SoPay',
    symbol: 'SOP',
  },
  {
    id: 2949,
    name: 'Kryll',
    symbol: 'KRL',
  },
  {
    id: 2950,
    name: 'LemoChain',
    symbol: 'LEMO',
  },
  {
    id: 2953,
    name: 'Blue Whale EXchange',
    symbol: 'BWX',
  },
  {
    id: 2955,
    name: 'Cosmo Coin',
    symbol: 'COSM',
  },
  {
    id: 2956,
    name: 'Narrative',
    symbol: 'NRVE',
  },
  {
    id: 2958,
    name: 'TurtleCoin',
    symbol: 'TRTL',
  },
  {
    id: 2960,
    name: 'Tourist Token',
    symbol: 'TOTO',
  },
  {
    id: 2965,
    name: 'VikkyToken',
    symbol: 'VIKKY',
  },
  {
    id: 2966,
    name: 'Fox Trading',
    symbol: 'FOXT',
  },
  {
    id: 2968,
    name: 'Bridge Protocol',
    symbol: 'BRDG',
  },
  {
    id: 2969,
    name: 'Globalvillage Ecosystem',
    symbol: 'GVE',
  },
  {
    id: 2970,
    name: 'LocalCoinSwap',
    symbol: 'LCS',
  },
  {
    id: 2972,
    name: 'ZPER',
    symbol: 'ZPR',
  },
  {
    id: 2976,
    name: 'Ryo Currency',
    symbol: 'RYO',
  },
  {
    id: 2977,
    name: 'BitRewards',
    symbol: 'BIT',
  },
  {
    id: 2978,
    name: 'AceD',
    symbol: 'ACED',
  },
  {
    id: 2980,
    name: 'WABnetwork',
    symbol: 'WAB',
  },
  {
    id: 2982,
    name: 'MVL',
    symbol: 'MVL',
  },
  {
    id: 2984,
    name: 'Newton Coin Project',
    symbol: 'NCP',
  },
  {
    id: 2986,
    name: 'DACC',
    symbol: 'DACC',
  },
  {
    id: 2987,
    name: 'ThingsOperatingSystem',
    symbol: 'TOS',
  },
  {
    id: 2988,
    name: 'Pigeoncoin',
    symbol: 'PGN',
  },
  {
    id: 2989,
    name: 'STASIS EURO',
    symbol: 'EURS',
  },
  {
    id: 2990,
    name: 'EXMR FDN',
    symbol: 'EXMR',
  },
  {
    id: 2991,
    name: 'NIX',
    symbol: 'NIX',
  },
  {
    id: 2992,
    name: 'Apollo Currency',
    symbol: 'APL',
  },
  {
    id: 2993,
    name: 'HorusPay',
    symbol: 'HORUS',
  },
  {
    id: 2994,
    name: 'Bitcoin File',
    symbol: 'BIFI',
  },
  {
    id: 2998,
    name: 'Vexanium',
    symbol: 'VEX',
  },
  {
    id: 2999,
    name: 'Hdac',
    symbol: 'HDAC',
  },
  {
    id: 3001,
    name: 'KWHCoin',
    symbol: 'KWH',
  },
  {
    id: 3002,
    name: 'Master Contract Token',
    symbol: 'MCT',
  },
  {
    id: 3004,
    name: 'Volt',
    symbol: 'ACDC',
  },
  {
    id: 3006,
    name: 'Niobio',
    symbol: 'NBR',
  },
  {
    id: 3008,
    name: 'Vivid Coin',
    symbol: 'VIVID',
  },
  {
    id: 3010,
    name: 'Coinsuper Ecosystem Network',
    symbol: 'CEN',
  },
  {
    id: 3011,
    name: 'BitScreener Token',
    symbol: 'BITX',
  },
  {
    id: 3012,
    name: 'VeThor Token',
    symbol: 'VTHO',
  },
  {
    id: 3013,
    name: 'PRiVCY',
    symbol: 'PRIV',
  },
  {
    id: 3016,
    name: 'NeuroChain',
    symbol: 'NCC',
  },
  {
    id: 3018,
    name: 'Kalkulus',
    symbol: 'KLKS',
  },
  {
    id: 3020,
    name: 'BHPCoin',
    symbol: 'BHP',
  },
  {
    id: 3023,
    name: 'Semux',
    symbol: 'SEM',
  },
  {
    id: 3024,
    name: 'Arionum',
    symbol: 'ARO',
  },
  {
    id: 3027,
    name: 'Webcoin',
    symbol: 'WEB',
  },
  {
    id: 3029,
    name: 'Flux',
    symbol: 'FLUX',
  },
  {
    id: 3051,
    name: 'Bitblocks',
    symbol: 'BBK',
  },
  {
    id: 3052,
    name: 'GoCrypto Token',
    symbol: 'GOC',
  },
  {
    id: 3053,
    name: 'YOU COIN',
    symbol: 'YOU',
  },
  {
    id: 3054,
    name: 'DACSEE',
    symbol: 'DACS',
  },
  {
    id: 3056,
    name: 'Thore Cash',
    symbol: 'TCH',
  },
  {
    id: 3060,
    name: 'Yuan Chain Coin',
    symbol: 'YCC',
  },
  {
    id: 3061,
    name: 'Promotion Coin',
    symbol: 'PC',
  },
  {
    id: 3065,
    name: 'ICE ROCK MINING',
    symbol: 'ROCK2',
  },
  {
    id: 3066,
    name: 'BitCapitalVendor',
    symbol: 'BCV',
  },
  {
    id: 3068,
    name: 'BitcoiNote',
    symbol: 'BTCN',
  },
  {
    id: 3070,
    name: 'Litex',
    symbol: 'LXT',
  },
  {
    id: 3071,
    name: 'EUNO',
    symbol: 'EUNO',
  },
  {
    id: 3077,
    name: 'VeChain',
    symbol: 'VET',
  },
  {
    id: 3078,
    name: 'Kind Ads Token',
    symbol: 'KIND',
  },
  {
    id: 3079,
    name: 'X8X Token',
    symbol: 'X8X',
  },
  {
    id: 3080,
    name: 'Commercium',
    symbol: 'CMM',
  },
  {
    id: 3081,
    name: 'Omnitude',
    symbol: 'ECOM',
  },
  {
    id: 3082,
    name: 'VINchain',
    symbol: 'VIN',
  },
  {
    id: 3083,
    name: 'LINA',
    symbol: 'LINA',
  },
  {
    id: 3085,
    name: 'INO COIN',
    symbol: 'INO',
  },
  {
    id: 3087,
    name: 'CROAT',
    symbol: 'CROAT',
  },
  {
    id: 3092,
    name: 'Nuggets',
    symbol: 'NUG',
  },
  {
    id: 3093,
    name: 'BBSCoin',
    symbol: 'BBS',
  },
  {
    id: 3094,
    name: 'Scorum Coins',
    symbol: 'SCR',
  },
  {
    id: 3095,
    name: 'Niobium Coin',
    symbol: 'NBC',
  },
  {
    id: 3096,
    name: 'Pundi X NEM',
    symbol: 'NPXSXEM',
  },
  {
    id: 3097,
    name: 'XOVBank',
    symbol: 'XOV',
  },
  {
    id: 3101,
    name: 'OptiToken',
    symbol: 'OPTI',
  },
  {
    id: 3104,
    name: 'Giant',
    symbol: 'GIC',
  },
  {
    id: 3106,
    name: 'PKG Token',
    symbol: 'PKG',
  },
  {
    id: 3112,
    name: 'Bitnation',
    symbol: 'XPAT',
  },
  {
    id: 3116,
    name: 'Insight Chain',
    symbol: 'INB',
  },
  {
    id: 3118,
    name: 'Graviocoin',
    symbol: 'GIO',
  },
  {
    id: 3119,
    name: 'Alchemint Standards',
    symbol: 'SDS',
  },
  {
    id: 3120,
    name: 'OWNDATA',
    symbol: 'OWN',
  },
  {
    id: 3121,
    name: 'IGToken',
    symbol: 'IG',
  },
  {
    id: 3123,
    name: 'GSENetwork',
    symbol: 'GSE',
  },
  {
    id: 3125,
    name: 'XDNA',
    symbol: 'XDNA',
  },
  {
    id: 3126,
    name: 'ProximaX',
    symbol: 'XPX',
  },
  {
    id: 3127,
    name: 'Themis',
    symbol: 'GET',
  },
  {
    id: 3128,
    name: 'SiaCashCoin',
    symbol: 'SCC',
  },
  {
    id: 3129,
    name: 'Nyerium',
    symbol: 'NYEX',
  },
  {
    id: 3131,
    name: 'Thingschain',
    symbol: 'TIC',
  },
  {
    id: 3132,
    name: 'EtherGem',
    symbol: 'EGEM',
  },
  {
    id: 3133,
    name: 'Arepacoin',
    symbol: 'AREPA',
  },
  {
    id: 3136,
    name: 'MEET.ONE',
    symbol: 'MEETONE',
  },
  {
    id: 3137,
    name: 'KARMA',
    symbol: 'KARMA',
  },
  {
    id: 3139,
    name: 'DxChain Token',
    symbol: 'DX',
  },
  {
    id: 3140,
    name: 'Ubex',
    symbol: 'UBEX',
  },
  {
    id: 3141,
    name: 'Blockpass',
    symbol: 'PASS',
  },
  {
    id: 3142,
    name: 'BaaSid',
    symbol: 'BAAS',
  },
  {
    id: 3144,
    name: 'ThoreCoin',
    symbol: 'THR',
  },
  {
    id: 3147,
    name: 'HYCON',
    symbol: 'HYC',
  },
  {
    id: 3148,
    name: 'MetaMorph',
    symbol: 'METM',
  },
  {
    id: 3149,
    name: 'Netkoin',
    symbol: 'NTK',
  },
  {
    id: 3151,
    name: 'Akroma',
    symbol: 'AKA',
  },
  {
    id: 3152,
    name: 'Obitan Chain',
    symbol: 'OBTC',
  },
  {
    id: 3154,
    name: 'Davinci Coin',
    symbol: 'DAC',
  },
  {
    id: 3155,
    name: 'Quant',
    symbol: 'QNT',
  },
  {
    id: 3156,
    name: 'Airbloc',
    symbol: 'ABL',
  },
  {
    id: 3158,
    name: 'ZCore',
    symbol: 'ZCR',
  },
  {
    id: 3159,
    name: 'Apollon',
    symbol: 'XAP',
  },
  {
    id: 3162,
    name: 'YoloCash',
    symbol: 'YLC',
  },
  {
    id: 3164,
    name: 'PumaPay',
    symbol: 'PMA',
  },
  {
    id: 3165,
    name: 'Arion',
    symbol: 'ARION',
  },
  {
    id: 3166,
    name: 'Bitcoin Incognito',
    symbol: 'XBI',
  },
  {
    id: 3171,
    name: 'HeartBout',
    symbol: 'HB',
  },
  {
    id: 3175,
    name: 'Maro',
    symbol: 'MARO',
  },
  {
    id: 3179,
    name: 'Arbidex',
    symbol: 'ABX',
  },
  {
    id: 3180,
    name: 'Compound Coin',
    symbol: 'COMP',
  },
  {
    id: 3181,
    name: 'ShowHand',
    symbol: 'HAND',
  },
  {
    id: 3182,
    name: 'HitChain',
    symbol: 'HIT',
  },
  {
    id: 3184,
    name: 'Gold Poker',
    symbol: 'GPKR',
  },
  {
    id: 3189,
    name: 'Mainstream For The Underground',
    symbol: 'MFTU',
  },
  {
    id: 3194,
    name: 'DPRating',
    symbol: 'RATING',
  },
  {
    id: 3198,
    name: 'KingXChain',
    symbol: 'KXC',
  },
  {
    id: 3200,
    name: 'Nasdacoin',
    symbol: 'NSD',
  },
  {
    id: 3203,
    name: 'Lobstex',
    symbol: 'LOBS',
  },
  {
    id: 3205,
    name: 'VeriDocGlobal',
    symbol: 'VDG',
  },
  {
    id: 3208,
    name: 'YUKI',
    symbol: 'YUKI',
  },
  {
    id: 3209,
    name: '4NEW',
    symbol: 'KWATT',
  },
  {
    id: 3210,
    name: 'MIB Coin',
    symbol: 'MIB',
  },
  {
    id: 3215,
    name: 'Gentarium',
    symbol: 'GTM',
  },
  {
    id: 3217,
    name: 'Ontology Gas',
    symbol: 'ONG',
  },
  {
    id: 3218,
    name: 'Energi',
    symbol: 'NRG',
  },
  {
    id: 3219,
    name: 'FUTURAX',
    symbol: 'FTXT',
  },
  {
    id: 3220,
    name: 'DAV Coin',
    symbol: 'DAV',
  },
  {
    id: 3222,
    name: 'Bionic',
    symbol: 'BNC',
  },
  {
    id: 3223,
    name: 'DOWCOIN',
    symbol: 'DOW',
  },
  {
    id: 3227,
    name: 'Traceability Chain',
    symbol: 'TAC',
  },
  {
    id: 3231,
    name: 'Blockchain Quotations Index Token',
    symbol: 'BQT',
  },
  {
    id: 3232,
    name: 'Staker',
    symbol: 'STR',
  },
  {
    id: 3233,
    name: 'Ulord',
    symbol: 'UT',
  },
  {
    id: 3234,
    name: 'Xriba',
    symbol: 'XRA',
  },
  {
    id: 3238,
    name: 'ABCC Token',
    symbol: 'AT',
  },
  {
    id: 3241,
    name: 'FortKnoxster',
    symbol: 'FKX',
  },
  {
    id: 3242,
    name: 'Beetle Coin',
    symbol: 'BEET',
  },
  {
    id: 3243,
    name: 'Moneytoken',
    symbol: 'IMT',
  },
  {
    id: 3247,
    name: 'Fire Lotto',
    symbol: 'FLOT',
  },
  {
    id: 3248,
    name: 'AiLink Token',
    symbol: 'ALI',
  },
  {
    id: 3251,
    name: 'ParkinGo',
    symbol: 'GOT',
  },
  {
    id: 3252,
    name: 'ShineChain',
    symbol: 'SHE',
  },
  {
    id: 3253,
    name: 'eosBLACK',
    symbol: 'BLACK',
  },
  {
    id: 3255,
    name: 'CyberMusic',
    symbol: 'CYMT',
  },
  {
    id: 3256,
    name: 'Bitether',
    symbol: 'BTR',
  },
  {
    id: 3257,
    name: 'GazeCoin',
    symbol: 'GZE',
  },
  {
    id: 3258,
    name: 'BitUP Token',
    symbol: 'BUT',
  },
  {
    id: 3259,
    name: 'YouLive Coin',
    symbol: 'UC',
  },
  {
    id: 3260,
    name: 'AMO Coin',
    symbol: 'AMO',
  },
  {
    id: 3261,
    name: 'EvenCoin',
    symbol: 'EVN',
  },
  {
    id: 3263,
    name: 'Dinero',
    symbol: 'DIN',
  },
  {
    id: 3264,
    name: 'Digital Insurance Token',
    symbol: 'DIT',
  },
  {
    id: 3265,
    name: 'Havy',
    symbol: 'HAVY',
  },
  {
    id: 3266,
    name: 'Carebit',
    symbol: 'CARE',
  },
  {
    id: 3271,
    name: 'Ether Kingdoms Token',
    symbol: 'IMP',
  },
  {
    id: 3273,
    name: 'IQ.cash',
    symbol: 'IQ',
  },
  {
    id: 3276,
    name: 'SaveNode',
    symbol: 'SNO',
  },
  {
    id: 3279,
    name: 'Rotharium',
    symbol: 'RTH',
  },
  {
    id: 3280,
    name: 'RealTract',
    symbol: 'RET',
  },
  {
    id: 3285,
    name: 'Birake',
    symbol: 'BIR',
  },
  {
    id: 3286,
    name: 'MEX',
    symbol: 'MEX',
  },
  {
    id: 3287,
    name: 'Abulaba',
    symbol: 'AAA',
  },
  {
    id: 3294,
    name: 'Bitcoin Adult',
    symbol: 'BTAD',
  },
  {
    id: 3295,
    name: 'BUMO',
    symbol: 'BU',
  },
  {
    id: 3296,
    name: 'MINDOL',
    symbol: 'MIN',
  },
  {
    id: 3297,
    name: 'Gene Source Code Chain',
    symbol: 'GENE',
  },
  {
    id: 3301,
    name: 'Invictus Hyperion Fund',
    symbol: 'IHF',
  },
  {
    id: 3302,
    name: 'UChain',
    symbol: 'UCN',
  },
  {
    id: 3304,
    name: 'MobilinkToken',
    symbol: 'MOLK',
  },
  {
    id: 3305,
    name: 'Eden',
    symbol: 'EDN',
  },
  {
    id: 3306,
    name: 'Gemini Dollar',
    symbol: 'GUSD',
  },
  {
    id: 3311,
    name: 'Castle',
    symbol: 'CSTL',
  },
  {
    id: 3313,
    name: 'CryptoFlow',
    symbol: 'CFL',
  },
  {
    id: 3315,
    name: 'Playgroundz',
    symbol: 'IOG',
  },
  {
    id: 3316,
    name: 'smARTOFGIVING',
    symbol: 'AOG',
  },
  {
    id: 3317,
    name: 'Cryptrust',
    symbol: 'CTRT',
  },
  {
    id: 3323,
    name: 'PAYCENT',
    symbol: 'PYN',
  },
  {
    id: 3324,
    name: 'PluraCoin',
    symbol: 'PLURA',
  },
  {
    id: 3325,
    name: 'Robotina',
    symbol: 'ROX',
  },
  {
    id: 3327,
    name: 'SIX',
    symbol: 'SIX',
  },
  {
    id: 3328,
    name: 'CMITCOIN',
    symbol: 'CMIT',
  },
  {
    id: 3329,
    name: 'Fantasy Sports',
    symbol: 'DFS',
  },
  {
    id: 3330,
    name: 'Pax Dollar',
    symbol: 'USDP',
  },
  {
    id: 3332,
    name: 'Gossip Coin',
    symbol: 'GOSS',
  },
  {
    id: 3334,
    name: 'X-CASH',
    symbol: 'XCASH',
  },
  {
    id: 3335,
    name: 'Shard',
    symbol: 'SHARD',
  },
  {
    id: 3336,
    name: 'IQeon',
    symbol: 'IQN',
  },
  {
    id: 3337,
    name: 'QChi',
    symbol: 'QCH',
  },
  {
    id: 3338,
    name: 'PAXEX',
    symbol: 'PAXEX',
  },
  {
    id: 3343,
    name: 'ANON',
    symbol: 'ANON',
  },
  {
    id: 3344,
    name: 'Ecoreal Estate',
    symbol: 'ECOREAL',
  },
  {
    id: 3345,
    name: 'DAPS Coin',
    symbol: 'DAPS',
  },
  {
    id: 3347,
    name: 'CARAT',
    symbol: 'CARAT',
  },
  {
    id: 3348,
    name: 'MNPCoin',
    symbol: 'MNP',
  },
  {
    id: 3349,
    name: 'GoldenPyrex',
    symbol: 'GPYX',
  },
  {
    id: 3351,
    name: 'ZB Token',
    symbol: 'ZB',
  },
  {
    id: 3352,
    name: 'MidasProtocol',
    symbol: 'MAS',
  },
  {
    id: 3354,
    name: 'TRONCLASSIC',
    symbol: 'TRXC',
  },
  {
    id: 3356,
    name: 'The Midas Touch Gold',
    symbol: 'TMTG',
  },
  {
    id: 3357,
    name: 'Digital Asset Guarantee Token',
    symbol: 'DAGT',
  },
  {
    id: 3361,
    name: 'MintMe.com Coin',
    symbol: 'MINTME',
  },
  {
    id: 3362,
    name: 'Auxilium',
    symbol: 'AUX',
  },
  {
    id: 3363,
    name: 'WXCOINS',
    symbol: 'WXC',
  },
  {
    id: 3364,
    name: 'PLATINCOIN',
    symbol: 'PLC',
  },
  {
    id: 3366,
    name: 'SafeInsure',
    symbol: 'SINS',
  },
  {
    id: 3367,
    name: 'CRD Network',
    symbol: 'CRD',
  },
  {
    id: 3369,
    name: 'Kuende',
    symbol: 'KUE',
  },
  {
    id: 3371,
    name: 'MIR COIN',
    symbol: 'MIR',
  },
  {
    id: 3374,
    name: 'Ragnarok',
    symbol: 'RAGNA',
  },
  {
    id: 3377,
    name: 'GenesisX',
    symbol: 'XGS',
  },
  {
    id: 3381,
    name: 'Civitas',
    symbol: 'CIV',
  },
  {
    id: 3383,
    name: 'Knekted',
    symbol: 'KNT',
  },
  {
    id: 3386,
    name: 'Actinium',
    symbol: 'ACM',
  },
  {
    id: 3387,
    name: 'BLAST',
    symbol: 'BLAST',
  },
  {
    id: 3388,
    name: 'FREE Coin',
    symbol: 'FREE',
  },
  {
    id: 3389,
    name: 'Tolar',
    symbol: 'TOL',
  },
  {
    id: 3390,
    name: 'Quantis Network',
    symbol: 'QUAN',
  },
  {
    id: 3395,
    name: 'SteepCoin',
    symbol: 'STEEP',
  },
  {
    id: 3397,
    name: 'Neural Protocol',
    symbol: 'NRP',
  },
  {
    id: 3398,
    name: 'SCRIV NETWORK',
    symbol: 'SCRIV',
  },
  {
    id: 3404,
    name: 'Wixlar',
    symbol: 'WIX',
  },
  {
    id: 3407,
    name: 'Ondori',
    symbol: 'RSTR',
  },
  {
    id: 3408,
    name: 'USD Coin',
    symbol: 'USDC',
  },
  {
    id: 3414,
    name: 'ZeusNetwork',
    symbol: 'ZEUS',
  },
  {
    id: 3416,
    name: 'Digiwage',
    symbol: 'WAGE',
  },
  {
    id: 3417,
    name: 'Future1coin',
    symbol: 'F1C',
  },
  {
    id: 3418,
    name: 'Metadium',
    symbol: 'META',
  },
  {
    id: 3419,
    name: 'Quasarcoin',
    symbol: 'QAC',
  },
  {
    id: 3421,
    name: 'Kabberry Coin',
    symbol: 'KKC',
  },
  {
    id: 3422,
    name: 'SHPING',
    symbol: 'SHPING',
  },
  {
    id: 3423,
    name: 'Sharpay',
    symbol: 'S',
  },
  {
    id: 3429,
    name: 'Cyber Movie Chain',
    symbol: 'CMCT',
  },
  {
    id: 3431,
    name: 'Iconic Token',
    symbol: 'ICNQ',
  },
  {
    id: 3432,
    name: 'Rapids',
    symbol: 'RPD',
  },
  {
    id: 3433,
    name: 'EUNOMIA',
    symbol: 'ENTS',
  },
  {
    id: 3435,
    name: 'Snetwork',
    symbol: 'SNET',
  },
  {
    id: 3437,
    name: 'ABBC Coin',
    symbol: 'ABBC',
  },
  {
    id: 3439,
    name: 'iDealCash',
    symbol: 'DEAL',
  },
  {
    id: 3441,
    name: 'Divi',
    symbol: 'DIVI',
  },
  {
    id: 3444,
    name: 'KUN',
    symbol: 'KUN',
  },
  {
    id: 3446,
    name: 'Zenswap Network Token',
    symbol: 'ZNT',
  },
  {
    id: 3447,
    name: 'Atheios',
    symbol: 'ATH',
  },
  {
    id: 3449,
    name: 'MMOCoin',
    symbol: 'MMO',
  },
  {
    id: 3451,
    name: 'BLOC.MONEY',
    symbol: 'BLOC',
  },
  {
    id: 3452,
    name: 'Etho Protocol',
    symbol: 'ETHO',
  },
  {
    id: 3454,
    name: 'Decentralized Asset Trading Platform',
    symbol: 'DATP',
  },
  {
    id: 3456,
    name: 'PlusOneCoin',
    symbol: 'PLUS1',
  },
  {
    id: 3457,
    name: 'Iridium',
    symbol: 'IRD',
  },
  {
    id: 3458,
    name: 'ZBG Token',
    symbol: 'ZT',
  },
  {
    id: 3459,
    name: 'GoHelpFund',
    symbol: 'HELP',
  },
  {
    id: 3464,
    name: 'Cheesecoin',
    symbol: 'CHEESE',
  },
  {
    id: 3465,
    name: 'Alt.Estate token',
    symbol: 'ALT',
  },
  {
    id: 3466,
    name: 'Insureum',
    symbol: 'ISR',
  },
  {
    id: 3467,
    name: 'Squorum',
    symbol: 'SQR',
  },
  {
    id: 3468,
    name: 'Fivebalance',
    symbol: 'FBN',
  },
  {
    id: 3469,
    name: 'TrueDeck',
    symbol: 'TDP',
  },
  {
    id: 3470,
    name: 'Dragon Token',
    symbol: 'DT',
  },
  {
    id: 3475,
    name: 'BOX Token',
    symbol: 'BOX',
  },
  {
    id: 3476,
    name: 'Italian Lira',
    symbol: 'ITL',
  },
  {
    id: 3477,
    name: 'Asura Coin',
    symbol: 'ASA',
  },
  {
    id: 3478,
    name: 'BitMoney',
    symbol: 'BIT',
  },
  {
    id: 3479,
    name: 'MODEL-X-coin',
    symbol: 'MODX',
  },
  {
    id: 3480,
    name: 'StrongHands Masternode',
    symbol: 'SHMN',
  },
  {
    id: 3481,
    name: 'Peony',
    symbol: 'PNY',
  },
  {
    id: 3482,
    name: 'Teloscoin',
    symbol: 'TELOS',
  },
  {
    id: 3484,
    name: 'Waletoken',
    symbol: 'WTN',
  },
  {
    id: 3488,
    name: 'Gravity',
    symbol: 'GZRO',
  },
  {
    id: 3489,
    name: 'Escroco Emerald',
    symbol: 'ESCE',
  },
  {
    id: 3492,
    name: 'Vetri',
    symbol: 'VLD',
  },
  {
    id: 3497,
    name: 'Bitcoin Zero',
    symbol: 'BZX',
  },
  {
    id: 3501,
    name: 'CryptoSoul',
    symbol: 'SOUL',
  },
  {
    id: 3504,
    name: 'HondaisCoin',
    symbol: 'HNDC',
  },
  {
    id: 3505,
    name: 'Typerium',
    symbol: 'TYPE',
  },
  {
    id: 3506,
    name: 'IONChain',
    symbol: 'IONC',
  },
  {
    id: 3507,
    name: 'MicroBitcoin',
    symbol: 'MBC',
  },
  {
    id: 3509,
    name: 'Provoco Token',
    symbol: 'VOCO',
  },
  {
    id: 3512,
    name: 'Alpha Coin',
    symbol: 'APC',
  },
  {
    id: 3513,
    name: 'Fantom',
    symbol: 'FTM',
  },
  {
    id: 3514,
    name: 'SINOVATE',
    symbol: 'SIN',
  },
  {
    id: 3516,
    name: 'Dark',
    symbol: 'D4RK',
  },
  {
    id: 3519,
    name: 'Breezecoin',
    symbol: 'BRZE',
  },
  {
    id: 3523,
    name: 'SnodeCoin',
    symbol: 'SND',
  },
  {
    id: 3580,
    name: 'Crystal Token',
    symbol: 'CYL',
  },
  {
    id: 3581,
    name: 'Kleros',
    symbol: 'PNK',
  },
  {
    id: 3582,
    name: 'MediBit',
    symbol: 'MEDIBIT',
  },
  {
    id: 3583,
    name: 'Posscoin',
    symbol: 'POSS',
  },
  {
    id: 3587,
    name: 'Bgogo Token',
    symbol: 'BGG',
  },
  {
    id: 3589,
    name: 'Ethereum Meta',
    symbol: 'ETHM',
  },
  {
    id: 3595,
    name: 'PalletOne',
    symbol: 'PTN',
  },
  {
    id: 3596,
    name: 'Nerva',
    symbol: 'XNV',
  },
  {
    id: 3597,
    name: 'InterValue',
    symbol: 'INVE',
  },
  {
    id: 3599,
    name: 'EtherInc',
    symbol: 'ETI',
  },
  {
    id: 3600,
    name: 'Humanscape',
    symbol: 'HUM',
  },
  {
    id: 3602,
    name: 'Bitcoin SV',
    symbol: 'BSV',
  },
  {
    id: 3604,
    name: 'SkyHub Coin',
    symbol: 'SHB',
  },
  {
    id: 3607,
    name: 'VestChain',
    symbol: 'VEST',
  },
  {
    id: 3608,
    name: 'Howdoo',
    symbol: 'UDOO',
  },
  {
    id: 3609,
    name: 'CWV Chain',
    symbol: 'CWV',
  },
  {
    id: 3610,
    name: 'Micromines',
    symbol: 'MICRO',
  },
  {
    id: 3611,
    name: 'Noir',
    symbol: 'NOR',
  },
  {
    id: 3613,
    name: 'Dash Green',
    symbol: 'DASHG',
  },
  {
    id: 3615,
    name: 'HyperQuant',
    symbol: 'HQT',
  },
  {
    id: 3616,
    name: 'EvidenZ',
    symbol: 'BCDT',
  },
  {
    id: 3617,
    name: 'ILCOIN',
    symbol: 'ILC',
  },
  {
    id: 3618,
    name: 'Gate',
    symbol: 'GATE',
  },
  {
    id: 3620,
    name: 'Atlas Protocol',
    symbol: 'ATP',
  },
  {
    id: 3624,
    name: 'Zealium',
    symbol: 'NZL',
  },
  {
    id: 3625,
    name: 'QuadrantProtocol',
    symbol: 'EQUAD',
  },
  {
    id: 3626,
    name: 'RSK Smart Bitcoin',
    symbol: 'RBTC',
  },
  {
    id: 3627,
    name: 'Block-Logic',
    symbol: 'BLTG',
  },
  {
    id: 3628,
    name: 'MXC',
    symbol: 'MXC',
  },
  {
    id: 3631,
    name: 'FOAM',
    symbol: 'FOAM',
  },
  {
    id: 3632,
    name: 'Opacity',
    symbol: 'OPCT',
  },
  {
    id: 3633,
    name: 'BitGuild PLAT',
    symbol: 'PLAT',
  },
  {
    id: 3634,
    name: 'Kambria',
    symbol: 'KAT',
  },
  {
    id: 3635,
    name: 'Crypto.com Coin',
    symbol: 'CRO',
  },
  {
    id: 3636,
    name: 'Link Machine Learning',
    symbol: 'LML',
  },
  {
    id: 3637,
    name: 'Aergo',
    symbol: 'AERGO',
  },
  {
    id: 3639,
    name: 'PlayGame',
    symbol: 'PXG',
  },
  {
    id: 3640,
    name: 'Livepeer',
    symbol: 'LPT',
  },
  {
    id: 3644,
    name: 'TravelNote',
    symbol: 'TVNT',
  },
  {
    id: 3645,
    name: 'Shivers',
    symbol: 'SHVR',
  },
  {
    id: 3646,
    name: 'Herbalist Token',
    symbol: 'HERB',
  },
  {
    id: 3649,
    name: 'Plus-Coin',
    symbol: 'NPLC',
  },
  {
    id: 3650,
    name: 'COVA',
    symbol: 'COVA',
  },
  {
    id: 3651,
    name: 'NEXT',
    symbol: 'NEXT',
  },
  {
    id: 3652,
    name: 'ZumCoin',
    symbol: 'ZUM',
  },
  {
    id: 3653,
    name: 'Baer Chain',
    symbol: 'BRC',
  },
  {
    id: 3656,
    name: 'Beacon',
    symbol: 'BECN',
  },
  {
    id: 3657,
    name: 'Lambda',
    symbol: 'LAMB',
  },
  {
    id: 3658,
    name: 'Fountain',
    symbol: 'FTN',
  },
  {
    id: 3659,
    name: 'QUINADS',
    symbol: 'QUIN',
  },
  {
    id: 3661,
    name: 'Stronghold Token',
    symbol: 'SHX',
  },
  {
    id: 3662,
    name: 'HedgeTrade',
    symbol: 'HEDG',
  },
  {
    id: 3663,
    name: 'Footballcoin',
    symbol: 'XFC',
  },
  {
    id: 3664,
    name: 'AgaveCoin',
    symbol: 'AGVC',
  },
  {
    id: 3665,
    name: 'Impleum',
    symbol: 'IMPL',
  },
  {
    id: 3666,
    name: 'Ultiledger',
    symbol: 'ULT',
  },
  {
    id: 3667,
    name: 'Atomic Wallet Coin',
    symbol: 'AWC',
  },
  {
    id: 3668,
    name: 'ProxyNode',
    symbol: 'PRX',
  },
  {
    id: 3669,
    name: 'Winco',
    symbol: 'WCO',
  },
  {
    id: 3672,
    name: 'DogeCash',
    symbol: 'DOGEC',
  },
  {
    id: 3673,
    name: 'ASD',
    symbol: 'ASD',
  },
  {
    id: 3677,
    name: 'ROIyal Coin',
    symbol: 'ROCO',
  },
  {
    id: 3679,
    name: 'Earneo',
    symbol: 'RNO',
  },
  {
    id: 3681,
    name: 'CENTERCOIN',
    symbol: 'CENT',
  },
  {
    id: 3682,
    name: 'Italo',
    symbol: 'XTA',
  },
  {
    id: 3683,
    name: 'AEN Smart Token',
    symbol: 'AENS',
  },
  {
    id: 3684,
    name: 'Bitcoiin',
    symbol: 'B2G',
  },
  {
    id: 3685,
    name: 'BTC Lite',
    symbol: 'BTCL',
  },
  {
    id: 3686,
    name: 'Conscious Value Network',
    symbol: 'CVNT',
  },
  {
    id: 3687,
    name: 'BitBall',
    symbol: 'BTB',
  },
  {
    id: 3688,
    name: 'MoX',
    symbol: 'MOX',
  },
  {
    id: 3690,
    name: 'Bulleon',
    symbol: 'BUL',
  },
  {
    id: 3691,
    name: 'Kuai Token',
    symbol: 'KT',
  },
  {
    id: 3692,
    name: 'TOKOK',
    symbol: 'TOK',
  },
  {
    id: 3695,
    name: 'Hyperion',
    symbol: 'HYN',
  },
  {
    id: 3698,
    name: 'Observer',
    symbol: 'OBSR',
  },
  {
    id: 3701,
    name: 'RSK Infrastructure Framework',
    symbol: 'RIF',
  },
  {
    id: 3702,
    name: 'Beam',
    symbol: 'BEAM',
  },
  {
    id: 3703,
    name: 'ADAMANT Messenger',
    symbol: 'ADM',
  },
  {
    id: 3704,
    name: 'v.systems',
    symbol: 'VSYS',
  },
  {
    id: 3707,
    name: 'T.OS',
    symbol: 'TOSC',
  },
  {
    id: 3708,
    name: 'Exosis',
    symbol: 'EXO',
  },
  {
    id: 3709,
    name: 'Grin',
    symbol: 'GRIN',
  },
  {
    id: 3711,
    name: 'Plair',
    symbol: 'PLA',
  },
  {
    id: 3712,
    name: 'Cloudbric',
    symbol: 'CLBK',
  },
  {
    id: 3714,
    name: 'LTO Network',
    symbol: 'LTO',
  },
  {
    id: 3715,
    name: 'Cajutel',
    symbol: 'CAJ',
  },
  {
    id: 3716,
    name: 'Amoveo',
    symbol: 'VEO',
  },
  {
    id: 3717,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
  },
  {
    id: 3718,
    name: 'BitTorrent',
    symbol: 'BTT',
  },
  {
    id: 3719,
    name: 'Stably USD',
    symbol: 'USDS',
  },
  {
    id: 3721,
    name: 'Huobi Pool Token',
    symbol: 'HPT',
  },
  {
    id: 3722,
    name: 'TEMCO',
    symbol: 'TEMCO',
  },
  {
    id: 3724,
    name: 'SOLVE',
    symbol: 'SOLVE',
  },
  {
    id: 3730,
    name: 'The Currency Analytics',
    symbol: 'TCAT',
  },
  {
    id: 3731,
    name: 'PlayChip',
    symbol: 'PLA',
  },
  {
    id: 3732,
    name: 'Conceal',
    symbol: 'CCX',
  },
  {
    id: 3733,
    name: 'S4FE',
    symbol: 'S4F',
  },
  {
    id: 3734,
    name: 'Elamachain',
    symbol: 'ELAMA',
  },
  {
    id: 3735,
    name: 'VegaWallet Token',
    symbol: 'VGW',
  },
  {
    id: 3737,
    name: 'BTU Protocol',
    symbol: 'BTU',
  },
  {
    id: 3738,
    name: 'Decentralized Crypto Token',
    symbol: 'DCTO',
  },
  {
    id: 3741,
    name: 'EurocoinToken',
    symbol: 'ECTE',
  },
  {
    id: 3742,
    name: 'Chimpion',
    symbol: 'BNANA',
  },
  {
    id: 3744,
    name: 'WEBN token',
    symbol: 'WEBN',
  },
  {
    id: 3746,
    name: 'Electrum Dark',
    symbol: 'ELD',
  },
  {
    id: 3748,
    name: 'Hxro',
    symbol: 'HXRO',
  },
  {
    id: 3750,
    name: 'eXPerience Chain',
    symbol: 'XPC',
  },
  {
    id: 3751,
    name: 'Stakinglab',
    symbol: 'LABX',
  },
  {
    id: 3752,
    name: 'uPlexa',
    symbol: 'UPX',
  },
  {
    id: 3753,
    name: 'PlatonCoin',
    symbol: 'PLTC',
  },
  {
    id: 3754,
    name: 'EveryCoin ',
    symbol: 'EVY',
  },
  {
    id: 3755,
    name: 'Moneynet',
    symbol: 'MNC',
  },
  {
    id: 3756,
    name: '#MetaHash',
    symbol: 'MHC',
  },
  {
    id: 3757,
    name: 'GMB',
    symbol: 'GMB',
  },
  {
    id: 3758,
    name: 'Max Crowdfund',
    symbol: 'MCF',
  },
  {
    id: 3759,
    name: 'Jinbi Token',
    symbol: 'JNB',
  },
  {
    id: 3760,
    name: 'Scanetchain',
    symbol: 'SWC',
  },
  {
    id: 3761,
    name: 'DISCIPLINA',
    symbol: 'DSCPL',
  },
  {
    id: 3763,
    name: 'ODUWA',
    symbol: 'OWC',
  },
  {
    id: 3764,
    name: 'Save Environment Token',
    symbol: 'SET',
  },
  {
    id: 3766,
    name: 'Fatcoin',
    symbol: 'FAT',
  },
  {
    id: 3767,
    name: '1X2 COIN',
    symbol: '1X2',
  },
  {
    id: 3768,
    name: 'PIBBLE',
    symbol: 'PIB',
  },
  {
    id: 3769,
    name: 'HashBX',
    symbol: 'HBX',
  },
  {
    id: 3770,
    name: 'CustomContractNetwork',
    symbol: 'CCN',
  },
  {
    id: 3772,
    name: 'STEM CELL COIN',
    symbol: 'SCC',
  },
  {
    id: 3773,
    name: 'Fetch.ai',
    symbol: 'FET',
  },
  {
    id: 3774,
    name: 'Maincoin',
    symbol: 'MNC',
  },
  {
    id: 3776,
    name: 'GoldFund',
    symbol: 'GFUN',
  },
  {
    id: 3777,
    name: 'Spectrum',
    symbol: 'SPT',
  },
  {
    id: 3779,
    name: 'CoTrader',
    symbol: 'COT',
  },
  {
    id: 3780,
    name: 'Sparkle Loyalty',
    symbol: 'SPRKL',
  },
  {
    id: 3783,
    name: 'Ankr',
    symbol: 'ANKR',
  },
  {
    id: 3785,
    name: 'AIDUS TOKEN',
    symbol: 'AIDUS',
  },
  {
    id: 3786,
    name: 'Lunes',
    symbol: 'LUNES',
  },
  {
    id: 3787,
    name: 'Innovative Bioresearch Classic',
    symbol: 'INNBCL',
  },
  {
    id: 3789,
    name: 'Boltt Coin ',
    symbol: 'BOLTT',
  },
  {
    id: 3790,
    name: 'RoboCalls',
    symbol: 'RC20',
  },
  {
    id: 3791,
    name: 'Jewel',
    symbol: 'JWL',
  },
  {
    id: 3792,
    name: 'ARAW',
    symbol: 'ARAW',
  },
  {
    id: 3793,
    name: 'Galilel',
    symbol: 'GALI',
  },
  {
    id: 3794,
    name: 'Cosmos',
    symbol: 'ATOM',
  },
  {
    id: 3795,
    name: 'ZEON',
    symbol: 'ZEON',
  },
  {
    id: 3798,
    name: 'Xuez',
    symbol: 'XUEZ',
  },
  {
    id: 3799,
    name: 'SafeCoin',
    symbol: 'SAFE',
  },
  {
    id: 3800,
    name: 'FidexToken',
    symbol: 'FEX',
  },
  {
    id: 3801,
    name: 'BORA',
    symbol: 'BORA',
  },
  {
    id: 3805,
    name: 'BoatPilot Token',
    symbol: 'NAVY',
  },
  {
    id: 3806,
    name: 'TigerCash',
    symbol: 'TCH',
  },
  {
    id: 3807,
    name: 'LitecoinToken',
    symbol: 'LTK',
  },
  {
    id: 3809,
    name: 'DOS Network',
    symbol: 'DOS',
  },
  {
    id: 3810,
    name: 'Ethereum Gold Project',
    symbol: 'ETGP',
  },
  {
    id: 3814,
    name: 'Celer Network',
    symbol: 'CELR',
  },
  {
    id: 3816,
    name: 'Verasity',
    symbol: 'VRA',
  },
  {
    id: 3819,
    name: 'GAMB',
    symbol: 'GMB',
  },
  {
    id: 3820,
    name: 'BuckHathCoin',
    symbol: 'BHIG',
  },
  {
    id: 3822,
    name: 'Theta Fuel',
    symbol: 'TFUEL',
  },
  {
    id: 3823,
    name: 'OLXA',
    symbol: 'OLXA',
  },
  {
    id: 3826,
    name: 'TOP',
    symbol: 'TOP',
  },
  {
    id: 3829,
    name: 'Nash',
    symbol: 'NEX',
  },
  {
    id: 3830,
    name: 'Veil',
    symbol: 'VEIL',
  },
  {
    id: 3831,
    name: 'Safe Haven',
    symbol: 'SHA',
  },
  {
    id: 3832,
    name: 'Big Bang Game Coin',
    symbol: 'BBGC',
  },
  {
    id: 3835,
    name: 'Orbs',
    symbol: 'ORBS',
  },
  {
    id: 3839,
    name: 'xRhodium',
    symbol: 'XRC',
  },
  {
    id: 3840,
    name: '1irstcoin',
    symbol: 'FST',
  },
  {
    id: 3842,
    name: 'Caspian',
    symbol: 'CSP',
  },
  {
    id: 3843,
    name: 'BOLT',
    symbol: 'BOLT',
  },
  {
    id: 3845,
    name: 'VIDT Datalink',
    symbol: 'VIDT',
  },
  {
    id: 3846,
    name: 'VeriBlock',
    symbol: 'VBK',
  },
  {
    id: 3849,
    name: 'WHEN Token',
    symbol: 'WHEN',
  },
  {
    id: 3850,
    name: 'OTOCASH',
    symbol: 'OTO',
  },
  {
    id: 3853,
    name: 'MultiVAC',
    symbol: 'MTV',
  },
  {
    id: 3854,
    name: 'Unification',
    symbol: 'FUND',
  },
  {
    id: 3855,
    name: 'Locus Chain',
    symbol: 'LOCUS',
  },
  {
    id: 3856,
    name: 'SF Capital',
    symbol: 'SFCP',
  },
  {
    id: 3858,
    name: 'FNB Protocol',
    symbol: 'FNB',
  },
  {
    id: 3859,
    name: 'Paytomat',
    symbol: 'PTI',
  },
  {
    id: 3860,
    name: 'Blockcloud',
    symbol: 'BLOC',
  },
  {
    id: 3863,
    name: 'UGAS',
    symbol: 'UGAS',
  },
  {
    id: 3866,
    name: 'CONUN',
    symbol: 'CON',
  },
  {
    id: 3867,
    name: 'NeoWorld Cash',
    symbol: 'NASH',
  },
  {
    id: 3868,
    name: 'Signature Chain',
    symbol: 'SIGN',
  },
  {
    id: 3869,
    name: 'Alpha Token',
    symbol: 'A',
  },
  {
    id: 3870,
    name: 'Lition',
    symbol: 'LIT',
  },
  {
    id: 3871,
    name: 'Newton',
    symbol: 'NEW',
  },
  {
    id: 3873,
    name: 'botXcoin',
    symbol: 'BOTX',
  },
  {
    id: 3874,
    name: 'IRISnet',
    symbol: 'IRIS',
  },
  {
    id: 3875,
    name: 'Valor Token',
    symbol: 'VALOR',
  },
  {
    id: 3876,
    name: 'EnterCoin',
    symbol: 'ENTRC',
  },
  {
    id: 3877,
    name: 'WebDollar',
    symbol: 'WEBD',
  },
  {
    id: 3878,
    name: 'Swap',
    symbol: 'XWP',
  },
  {
    id: 3879,
    name: 'ESBC',
    symbol: 'ESBC',
  },
  {
    id: 3880,
    name: 'OceanEx Token',
    symbol: 'OCE',
  },
  {
    id: 3882,
    name: 'Arqma',
    symbol: 'ARQ',
  },
  {
    id: 3883,
    name: 'QuickX Protocol',
    symbol: 'QCX',
  },
  {
    id: 3884,
    name: 'Function X',
    symbol: 'FX',
  },
  {
    id: 3885,
    name: 'WPP TOKEN',
    symbol: 'WPP',
  },
  {
    id: 3888,
    name: 'bitCEO',
    symbol: 'BCEO',
  },
  {
    id: 3889,
    name: 'Natmin Pure Escrow',
    symbol: 'NAT',
  },
  {
    id: 3890,
    name: 'Polygon',
    symbol: 'MATIC',
  },
  {
    id: 3891,
    name: 'V-Dimension',
    symbol: 'VOLLAR',
  },
  {
    id: 3893,
    name: 'ChangeNOW Token',
    symbol: 'NOW',
  },
  {
    id: 3894,
    name: 'Crypto Sports',
    symbol: 'CSPN',
  },
  {
    id: 3895,
    name: 'Matrexcoin',
    symbol: 'MAC',
  },
  {
    id: 3897,
    name: 'OKB',
    symbol: 'OKB',
  },
  {
    id: 3898,
    name: 'Axe',
    symbol: 'AXE',
  },
  {
    id: 3899,
    name: 'Zloadr',
    symbol: 'ZDR',
  },
  {
    id: 3902,
    name: 'MoneroV ',
    symbol: 'XMV',
  },
  {
    id: 3903,
    name: 'Fanfare',
    symbol: 'FAN',
  },
  {
    id: 3904,
    name: 'Renewable Electronic Energy Coin',
    symbol: 'REEC',
  },
  {
    id: 3907,
    name: 'BitCash',
    symbol: 'BITC',
  },
  {
    id: 3910,
    name: 'pEOS',
    symbol: 'PEOS',
  },
  {
    id: 3911,
    name: 'Ocean Protocol',
    symbol: 'OCEAN',
  },
  {
    id: 3913,
    name: 'Titan Coin',
    symbol: 'TTN',
  },
  {
    id: 3914,
    name: 'GlitzKoin',
    symbol: 'GTN',
  },
  {
    id: 3915,
    name: 'Merebel',
    symbol: 'MERI',
  },
  {
    id: 3916,
    name: 'ThoreNext',
    symbol: 'THX',
  },
  {
    id: 3917,
    name: 'Sentivate',
    symbol: 'SNTVT',
  },
  {
    id: 3918,
    name: 'Safe',
    symbol: 'SAFE',
  },
  {
    id: 3920,
    name: 'Diamond Platform Token',
    symbol: 'DPT',
  },
  {
    id: 3923,
    name: 'VENJOCOIN',
    symbol: 'VJC',
  },
  {
    id: 3925,
    name: 'Tratok',
    symbol: 'TRAT',
  },
  {
    id: 3928,
    name: 'IDEX',
    symbol: 'IDEX',
  },
  {
    id: 3929,
    name: 'BQT',
    symbol: 'BQTX',
  },
  {
    id: 3930,
    name: 'Thunder Token',
    symbol: 'TT',
  },
  {
    id: 3931,
    name: 'Elementeum',
    symbol: 'ELET',
  },
  {
    id: 3933,
    name: 'SwiftCash',
    symbol: 'SWIFT',
  },
  {
    id: 3934,
    name: 'CNNS',
    symbol: 'CNNS',
  },
  {
    id: 3935,
    name: 'SparkPoint',
    symbol: 'SRK',
  },
  {
    id: 3936,
    name: 'GNY',
    symbol: 'GNY',
  },
  {
    id: 3937,
    name: 'NNB Token',
    symbol: 'NNB',
  },
  {
    id: 3939,
    name: 'Tronipay',
    symbol: 'TRP',
  },
  {
    id: 3942,
    name: 'Qwertycoin',
    symbol: 'QWC',
  },
  {
    id: 3944,
    name: 'Artfinity',
    symbol: 'AT',
  },
  {
    id: 3945,
    name: 'Harmony',
    symbol: 'ONE',
  },
  {
    id: 3946,
    name: 'Carry',
    symbol: 'CRE',
  },
  {
    id: 3947,
    name: 'HashNet BitEco',
    symbol: 'HNB',
  },
  {
    id: 3948,
    name: 'TERA',
    symbol: 'TERA',
  },
  {
    id: 3949,
    name: 'Asian Fintech',
    symbol: 'AFIN',
  },
  {
    id: 3950,
    name: 'Netrum',
    symbol: 'NTR',
  },
  {
    id: 3951,
    name: 'Pirate Chain',
    symbol: 'ARRR',
  },
  {
    id: 3953,
    name: 'Evedo',
    symbol: 'EVED',
  },
  {
    id: 3954,
    name: 'One DEX',
    symbol: 'ODEX',
  },
  {
    id: 3956,
    name: 'BOMB',
    symbol: 'BOMB',
  },
  {
    id: 3957,
    name: 'UNUS SED LEO',
    symbol: 'LEO',
  },
  {
    id: 3960,
    name: 'Coineal Token',
    symbol: 'NEAL',
  },
  {
    id: 3961,
    name: 'BZEdge',
    symbol: 'BZE',
  },
  {
    id: 3962,
    name: 'Vodi X',
    symbol: 'VDX',
  },
  {
    id: 3964,
    name: 'Reserve Rights',
    symbol: 'RSR',
  },
  {
    id: 3965,
    name: 'TouchCon',
    symbol: 'TOC',
  },
  {
    id: 3966,
    name: 'BitcoinHD',
    symbol: 'BHD',
  },
  {
    id: 3968,
    name: 'Elitium',
    symbol: 'EUM',
  },
  {
    id: 3973,
    name: 'Aryacoin',
    symbol: 'AYA',
  },
  {
    id: 3974,
    name: 'Bitcoin 2',
    symbol: 'BTC2',
  },
  {
    id: 3976,
    name: 'Bitcoin Confidential',
    symbol: 'BC',
  },
  {
    id: 3977,
    name: 'Sport and Leisure',
    symbol: 'SNL',
  },
  {
    id: 3978,
    name: 'Chromia',
    symbol: 'CHR',
  },
  {
    id: 3980,
    name: 'TCASH',
    symbol: 'TCASH',
  },
  {
    id: 3985,
    name: 'Origo',
    symbol: 'OGO',
  },
  {
    id: 3986,
    name: 'StakeCubeCoin',
    symbol: 'SCC',
  },
  {
    id: 3987,
    name: 'Beldex',
    symbol: 'BDX',
  },
  {
    id: 3988,
    name: 'VNT Chain',
    symbol: 'VNT',
  },
  {
    id: 3990,
    name: 'Webflix Token',
    symbol: 'WFX',
  },
  {
    id: 3992,
    name: 'COTI',
    symbol: 'COTI',
  },
  {
    id: 3993,
    name: 'Emanate',
    symbol: 'EMT',
  },
  {
    id: 3996,
    name: 'IOU',
    symbol: 'IOUX',
  },
  {
    id: 3997,
    name: 'BlockStamp',
    symbol: 'BST',
  },
  {
    id: 3998,
    name: 'Krios',
    symbol: 'GIG',
  },
  {
    id: 4001,
    name: 'MenaPay',
    symbol: 'MPAY',
  },
  {
    id: 4003,
    name: 'Zenon',
    symbol: 'ZNN',
  },
  {
    id: 4006,
    name: 'Standard Tokenization Protocol',
    symbol: 'STPT',
  },
  {
    id: 4008,
    name: 'Bitcoin CZ',
    symbol: 'BCZ',
  },
  {
    id: 4013,
    name: 'SpectreSecurityCoin',
    symbol: 'XSPC',
  },
  {
    id: 4014,
    name: 'Mobile Crypto Pay Coin',
    symbol: 'MCPC',
  },
  {
    id: 4017,
    name: 'EOSDT',
    symbol: 'EOSDT',
  },
  {
    id: 4018,
    name: 'Klimatas',
    symbol: 'KTS',
  },
  {
    id: 4020,
    name: 'USDQ',
    symbol: 'USDQ',
  },
  {
    id: 4023,
    name: 'Bitcoin BEP2',
    symbol: 'BTCB',
  },
  {
    id: 4024,
    name: 'Raven Protocol',
    symbol: 'RAVEN',
  },
  {
    id: 4026,
    name: 'LiquidApps',
    symbol: 'DAPP',
  },
  {
    id: 4027,
    name: 'DeVault',
    symbol: 'DVT',
  },
  {
    id: 4028,
    name: 'MotaCoin',
    symbol: 'MOTA',
  },
  {
    id: 4030,
    name: 'Algorand',
    symbol: 'ALGO',
  },
  {
    id: 4033,
    name: 'Native Utility Token',
    symbol: 'NUT',
  },
  {
    id: 4034,
    name: 'Jarvis+',
    symbol: 'JAR',
  },
  {
    id: 4035,
    name: 'Honest',
    symbol: 'HNST',
  },
  {
    id: 4036,
    name: 'Contentos',
    symbol: 'COS',
  },
  {
    id: 4038,
    name: 'MovieBloc',
    symbol: 'MBL',
  },
  {
    id: 4039,
    name: 'ARPA Chain',
    symbol: 'ARPA',
  },
  {
    id: 4041,
    name: 'MX Token',
    symbol: 'MX',
  },
  {
    id: 4043,
    name: 'PayRue (Propel)',
    symbol: 'PROPEL',
  },
  {
    id: 4045,
    name: 'Catex Token',
    symbol: 'CATT',
  },
  {
    id: 4047,
    name: 'Naka Bodhi Token',
    symbol: 'NBOT',
  },
  {
    id: 4048,
    name: 'MGC Token',
    symbol: 'MGC',
  },
  {
    id: 4049,
    name: 'Bitbook Gambling',
    symbol: 'BXK',
  },
  {
    id: 4051,
    name: 'Parachute',
    symbol: 'PAR',
  },
  {
    id: 4053,
    name: 'Q DAO Governance token v1.0',
    symbol: 'QDAO',
  },
  {
    id: 4054,
    name: 'IG Gold',
    symbol: 'IGG',
  },
  {
    id: 4056,
    name: 'Ampleforth',
    symbol: 'AMPL',
  },
  {
    id: 4058,
    name: 'FIBOS',
    symbol: 'FO',
  },
  {
    id: 4060,
    name: 'TrustVerse',
    symbol: 'TRV',
  },
  {
    id: 4064,
    name: 'USDK',
    symbol: 'USDK',
  },
  {
    id: 4066,
    name: 'Chiliz',
    symbol: 'CHZ',
  },
  {
    id: 4067,
    name: 'Cryptoindex.com 100',
    symbol: 'CIX100',
  },
  {
    id: 4069,
    name: 'Blockburn',
    symbol: 'BURN',
  },
  {
    id: 4071,
    name: 'Ubricoin',
    symbol: 'UBN',
  },
  {
    id: 4074,
    name: 'ScPrime',
    symbol: 'SCP',
  },
  {
    id: 4075,
    name: 'CryptoFranc',
    symbol: 'XCHF',
  },
  {
    id: 4076,
    name: 'ETHplode',
    symbol: 'ETHPLO',
  },
  {
    id: 4077,
    name: 'Maya Preferred',
    symbol: 'MAYP',
  },
  {
    id: 4078,
    name: 'Super Zero Protocol',
    symbol: 'SERO',
  },
  {
    id: 4079,
    name: 'Silverway',
    symbol: 'SLV',
  },
  {
    id: 4088,
    name: 'PDATA',
    symbol: 'PDATA',
  },
  {
    id: 4089,
    name: 'Blockmason Link',
    symbol: 'BLINK',
  },
  {
    id: 4090,
    name: 'Wirex Token',
    symbol: 'WXT',
  },
  {
    id: 4091,
    name: 'PIXEL',
    symbol: 'PXL',
  },
  {
    id: 4092,
    name: 'Dusk Network',
    symbol: 'DUSK',
  },
  {
    id: 4093,
    name: 'Uranus',
    symbol: 'URAC',
  },
  {
    id: 4094,
    name: 'Spiking',
    symbol: 'SPIKE',
  },
  {
    id: 4096,
    name: 'Switch',
    symbol: 'ESH',
  },
  {
    id: 4097,
    name: 'x42 Protocol',
    symbol: 'X42',
  },
  {
    id: 4098,
    name: 'Tapcoin',
    symbol: 'TTT',
  },
  {
    id: 4100,
    name: 'qiibee',
    symbol: 'QBX',
  },
  {
    id: 4102,
    name: 'TranslateMe Network Token',
    symbol: 'TMN',
  },
  {
    id: 4103,
    name: 'FLETA',
    symbol: 'FLETA',
  },
  {
    id: 4104,
    name: 'FUZE Token',
    symbol: 'FUZE',
  },
  {
    id: 4105,
    name: 'CoinMetro Token',
    symbol: 'XCM',
  },
  {
    id: 4108,
    name: 'En-Tan-Mo',
    symbol: 'ETM',
  },
  {
    id: 4112,
    name: 'Eco Value Coin',
    symbol: 'EVC',
  },
  {
    id: 4114,
    name: 'Golden Token',
    symbol: 'GOLD',
  },
  {
    id: 4115,
    name: 'Pivot Token',
    symbol: 'PVT',
  },
  {
    id: 4116,
    name: 'TOKPIE',
    symbol: 'TKP',
  },
  {
    id: 4118,
    name: 'ForTube',
    symbol: 'FOR',
  },
  {
    id: 4119,
    name: 'VinDax Coin',
    symbol: 'VD',
  },
  {
    id: 4120,
    name: 'Prometeus',
    symbol: 'PROM',
  },
  {
    id: 4121,
    name: 'Sapphire',
    symbol: 'SAPP',
  },
  {
    id: 4122,
    name: 'Counos Coin',
    symbol: 'CCA',
  },
  {
    id: 4124,
    name: 'EOS TRUST',
    symbol: 'EOST',
  },
  {
    id: 4125,
    name: 'NOIZ',
    symbol: 'NOIZ',
  },
  {
    id: 4126,
    name: 'EXOR',
    symbol: 'EXOR',
  },
  {
    id: 4128,
    name: 'BOOM',
    symbol: 'BOOM',
  },
  {
    id: 4132,
    name: 'Bitsten Token',
    symbol: 'BST',
  },
  {
    id: 4134,
    name: 'Akropolis',
    symbol: 'AKRO',
  },
  {
    id: 4136,
    name: 'Veles',
    symbol: 'VLS',
  },
  {
    id: 4138,
    name: 'WinStars.live',
    symbol: 'WNL',
  },
  {
    id: 4139,
    name: 'Brazilian Digital Token',
    symbol: 'BRZ',
  },
  {
    id: 4142,
    name: 'Cubiex',
    symbol: 'CBIX',
  },
  {
    id: 4144,
    name: 'TrueFeedBack',
    symbol: 'TFBX',
  },
  {
    id: 4150,
    name: 'GLOBEX',
    symbol: 'GEX',
  },
  {
    id: 4152,
    name: 'CryptoVerificationCoin',
    symbol: 'CVCC',
  },
  {
    id: 4156,
    name: 'ImageCoin',
    symbol: 'IMG',
  },
  {
    id: 4157,
    name: 'THORChain',
    symbol: 'RUNE',
  },
  {
    id: 4159,
    name: 'Bitcoin Token',
    symbol: 'BTCT',
  },
  {
    id: 4160,
    name: 'Ycash',
    symbol: 'YEC',
  },
  {
    id: 4162,
    name: 'Storeum',
    symbol: 'STO',
  },
  {
    id: 4165,
    name: 'CREDIT',
    symbol: 'CREDIT',
  },
  {
    id: 4166,
    name: 'Realio Network',
    symbol: 'RIO',
  },
  {
    id: 4167,
    name: 'Bitrue Coin',
    symbol: 'BTR',
  },
  {
    id: 4172,
    name: 'Terra',
    symbol: 'LUNA',
  },
  {
    id: 4173,
    name: 'Levolution',
    symbol: 'LEVL',
  },
  {
    id: 4174,
    name: 'BitcoinRegular',
    symbol: 'BTRL',
  },
  {
    id: 4176,
    name: 'Dapp Token',
    symbol: 'DAPPT',
  },
  {
    id: 4178,
    name: 'CPUchain',
    symbol: 'CPU',
  },
  {
    id: 4180,
    name: 'DDKoin',
    symbol: 'DDK',
  },
  {
    id: 4182,
    name: 'GoWithMi',
    symbol: 'GMAT',
  },
  {
    id: 4183,
    name: 'Safex Cash',
    symbol: 'SFX',
  },
  {
    id: 4184,
    name: 'Zer-Dex',
    symbol: 'ZDX',
  },
  {
    id: 4189,
    name: 'Ultra',
    symbol: 'UOS',
  },
  {
    id: 4191,
    name: 'Syntropy',
    symbol: 'NOIA',
  },
  {
    id: 4193,
    name: 'Dynamite',
    symbol: 'DYNMT',
  },
  {
    id: 4195,
    name: 'FTX Token',
    symbol: 'FTT',
  },
  {
    id: 4196,
    name: 'Pledge Coin',
    symbol: 'PLG',
  },
  {
    id: 4197,
    name: 'ShareToken',
    symbol: 'SHR',
  },
  {
    id: 4199,
    name: 'Swace',
    symbol: 'SWACE',
  },
  {
    id: 4200,
    name: 'ChainX',
    symbol: 'PCX',
  },
  {
    id: 4202,
    name: 'Opennity',
    symbol: 'OPNN',
  },
  {
    id: 4205,
    name: 'Xenoverse',
    symbol: 'XENO',
  },
  {
    id: 4206,
    name: 'WINkLink',
    symbol: 'WIN',
  },
  {
    id: 4207,
    name: 'Birdchain',
    symbol: 'BIRD',
  },
  {
    id: 4211,
    name: 'Equilibria',
    symbol: 'XEQ',
  },
  {
    id: 4212,
    name: 'LinkToken',
    symbol: 'LTK',
  },
  {
    id: 4213,
    name: 'Uptrennd',
    symbol: '1UP',
  },
  {
    id: 4215,
    name: 'Eminer',
    symbol: 'EM',
  },
  {
    id: 4217,
    name: 'BOSAGORA',
    symbol: 'BOA',
  },
  {
    id: 4222,
    name: '1Million Token',
    symbol: '1MT',
  },
  {
    id: 4224,
    name: 'Mcashchain',
    symbol: 'MCASH',
  },
  {
    id: 4225,
    name: 'Crex Token',
    symbol: 'CREX',
  },
  {
    id: 4228,
    name: 'Ferrum Network',
    symbol: 'FRM',
  },
  {
    id: 4229,
    name: 'Yobit Token',
    symbol: 'YO',
  },
  {
    id: 4230,
    name: 'LHT',
    symbol: 'LHT',
  },
  {
    id: 4231,
    name: 'Helpico',
    symbol: 'HELP',
  },
  {
    id: 4233,
    name: 'Membrana',
    symbol: 'MBN',
  },
  {
    id: 4238,
    name: 'EveriToken',
    symbol: 'EVT',
  },
  {
    id: 4240,
    name: 'Custody Token',
    symbol: 'CUST',
  },
  {
    id: 4242,
    name: 'PLANET',
    symbol: 'PLA',
  },
  {
    id: 4244,
    name: 'CCUniverse',
    symbol: 'UVU',
  },
  {
    id: 4245,
    name: 'Enecuum',
    symbol: 'ENQ',
  },
  {
    id: 4249,
    name: 'Findora',
    symbol: 'FRA',
  },
  {
    id: 4250,
    name: 'ZeuxCoin',
    symbol: 'ZUC',
  },
  {
    id: 4251,
    name: 'DeepCloud AI',
    symbol: 'DEEP',
  },
  {
    id: 4253,
    name: 'CryptoBonusMiles',
    symbol: 'CBM',
  },
  {
    id: 4254,
    name: 'Hintchain',
    symbol: 'HINT',
  },
  {
    id: 4256,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  {
    id: 4257,
    name: 'Bitball Treasure',
    symbol: 'BTRS',
  },
  {
    id: 4259,
    name: 'Spice',
    symbol: 'SPICE',
  },
  {
    id: 4261,
    name: 'Sucrecoin',
    symbol: 'XSR',
  },
  {
    id: 4262,
    name: 'UltrAlpha',
    symbol: 'UAT',
  },
  {
    id: 4263,
    name: 'BitCanna',
    symbol: 'BCNA',
  },
  {
    id: 4264,
    name: 'Ritocoin',
    symbol: 'RITO',
  },
  {
    id: 4268,
    name: 'NewYork Exchange',
    symbol: 'NYE',
  },
  {
    id: 4269,
    name: 'GateToken',
    symbol: 'GT',
  },
  {
    id: 4272,
    name: 'Taklimakan Network',
    symbol: 'TAN',
  },
  {
    id: 4273,
    name: 'Sessia',
    symbol: 'KICKS',
  },
  {
    id: 4275,
    name: 'Cocos-BCX',
    symbol: 'COCOS',
  },
  {
    id: 4276,
    name: 'Defi',
    symbol: 'DEFI',
  },
  {
    id: 4277,
    name: 'DECOIN',
    symbol: 'DTEP',
  },
  {
    id: 4279,
    name: 'Swipe',
    symbol: 'SXP',
  },
  {
    id: 4280,
    name: '12Ships',
    symbol: 'TSHP',
  },
  {
    id: 4283,
    name: 'BitForex Token',
    symbol: 'BF',
  },
  {
    id: 4284,
    name: 'DABANKING',
    symbol: 'DAB',
  },
  {
    id: 4285,
    name: 'Lukki Operating Token',
    symbol: 'LOT',
  },
  {
    id: 4286,
    name: 'ZENZO',
    symbol: 'ZNZ',
  },
  {
    id: 4287,
    name: 'Jobchain',
    symbol: 'JOB',
  },
  {
    id: 4289,
    name: 'IOEX',
    symbol: 'IOEX',
  },
  {
    id: 4290,
    name: 'EMOGI Network',
    symbol: 'LOL',
  },
  {
    id: 4291,
    name: 'Krypton Galaxy Coin',
    symbol: 'KGC',
  },
  {
    id: 4292,
    name: 'Nibble',
    symbol: 'NBXC',
  },
  {
    id: 4293,
    name: 'PERL.eco',
    symbol: 'PERL',
  },
  {
    id: 4297,
    name: 'Netbox Coin',
    symbol: 'NBX',
  },
  {
    id: 4298,
    name: 'Rapidz',
    symbol: 'RPZX',
  },
  {
    id: 4299,
    name: 'Tokoin',
    symbol: 'TOKO',
  },
  {
    id: 4300,
    name: 'VideoCoin',
    symbol: 'VID',
  },
  {
    id: 4301,
    name: "Tutor's Diary",
    symbol: 'TUDA',
  },
  {
    id: 4306,
    name: 'BitcoinSoV',
    symbol: 'BSOV',
  },
  {
    id: 4307,
    name: 'UNICORN Token',
    symbol: 'UNI',
  },
  {
    id: 4309,
    name: 'Cryptocean',
    symbol: 'CRON',
  },
  {
    id: 4315,
    name: 'Vidulum',
    symbol: 'VDL',
  },
  {
    id: 4324,
    name: 'Junsonmingchncoin',
    symbol: 'JMC',
  },
  {
    id: 4325,
    name: 'Bitscoin',
    symbol: 'BTCX',
  },
  {
    id: 4344,
    name: 'ImageCash',
    symbol: 'IMGC',
  },
  {
    id: 4359,
    name: 'Aeryus',
    symbol: 'AER',
  },
  {
    id: 4361,
    name: 'Bitpanda Ecosystem Token',
    symbol: 'BEST',
  },
  {
    id: 4365,
    name: 'Streamit Coin',
    symbol: 'STREAM',
  },
  {
    id: 4366,
    name: 'MixMarvel',
    symbol: 'MIX',
  },
  {
    id: 4381,
    name: 'MYCE',
    symbol: 'YCE',
  },
  {
    id: 4384,
    name: 'CaluraCoin',
    symbol: 'CLC',
  },
  {
    id: 4385,
    name: 'Daikicoin',
    symbol: 'DIC',
  },
  {
    id: 4388,
    name: 'ExchangeCoin',
    symbol: 'EXCC',
  },
  {
    id: 4397,
    name: 'PEPS Coin',
    symbol: 'PEPS',
  },
  {
    id: 4411,
    name: 'TenUp',
    symbol: 'TUP',
  },
  {
    id: 4424,
    name: 'XDAG',
    symbol: 'XDAG',
  },
  {
    id: 4427,
    name: 'BITICA DIGITAL CRYPTO CURRENCY',
    symbol: 'BDCC',
  },
  {
    id: 4430,
    name: 'VNX',
    symbol: 'VNXLU',
  },
  {
    id: 4431,
    name: 'VIDY',
    symbol: 'VIDY',
  },
  {
    id: 4439,
    name: 'Kripton',
    symbol: 'LPK',
  },
  {
    id: 4441,
    name: 'Vectorspace AI',
    symbol: 'VXV',
  },
  {
    id: 4448,
    name: 'Electronero',
    symbol: 'ETNX',
  },
  {
    id: 4452,
    name: 'BidiPass',
    symbol: 'BDP',
  },
  {
    id: 4460,
    name: 'PirateCash',
    symbol: 'PIRATE',
  },
  {
    id: 4466,
    name: 'Ormeus Ecosystem',
    symbol: 'ECO',
  },
  {
    id: 4467,
    name: 'Nestree',
    symbol: 'EGG',
  },
  {
    id: 4487,
    name: 'Secure Cash',
    symbol: 'SCSX',
  },
  {
    id: 4490,
    name: 'Emirex Token',
    symbol: 'EMRX',
  },
  {
    id: 4491,
    name: 'Flits',
    symbol: 'FLS',
  },
  {
    id: 4495,
    name: 'VENA',
    symbol: 'VENA',
  },
  {
    id: 4502,
    name: 'Altbet',
    symbol: 'ABET',
  },
  {
    id: 4505,
    name: 'Midas',
    symbol: 'MIDAS',
  },
  {
    id: 4506,
    name: 'Hotbit Token',
    symbol: 'HTB',
  },
  {
    id: 4508,
    name: 'Voltz',
    symbol: 'VOLTZ',
  },
  {
    id: 4510,
    name: 'Mchain',
    symbol: 'MAR',
  },
  {
    id: 4512,
    name: 'LINK',
    symbol: 'LN',
  },
  {
    id: 4518,
    name: 'Abitshadow Token',
    symbol: 'ABST',
  },
  {
    id: 4520,
    name: 'Decentralized Vulnerability Platform',
    symbol: 'DVP',
  },
  {
    id: 4523,
    name: 'Davies',
    symbol: 'DVS',
  },
  {
    id: 4525,
    name: 'Lightyears',
    symbol: 'YEAR',
  },
  {
    id: 4534,
    name: 'BITTO',
    symbol: 'BITTO',
  },
  {
    id: 4538,
    name: 'Sombe',
    symbol: 'SBE',
  },
  {
    id: 4542,
    name: 'Scrypta',
    symbol: 'LYRA',
  },
  {
    id: 4545,
    name: 'City Coin',
    symbol: 'CITY',
  },
  {
    id: 4546,
    name: '01coin',
    symbol: 'ZOC',
  },
  {
    id: 4549,
    name: 'LEXIT',
    symbol: 'LEXI',
  },
  {
    id: 4552,
    name: 'Aircoins',
    symbol: 'AIRX',
  },
  {
    id: 4555,
    name: 'Fedora Gold',
    symbol: 'FED',
  },
  {
    id: 4557,
    name: 'USDX [Lighthouse]',
    symbol: 'USDX',
  },
  {
    id: 4558,
    name: 'Flow',
    symbol: 'FLOW',
  },
  {
    id: 4566,
    name: 'DigitalBits',
    symbol: 'XDB',
  },
  {
    id: 4568,
    name: 'JFIN',
    symbol: 'JFC',
  },
  {
    id: 4571,
    name: 'HEdpAY',
    symbol: 'HDP.ф',
  },
  {
    id: 4577,
    name: 'LunchMoney',
    symbol: 'LMY',
  },
  {
    id: 4586,
    name: 'ProBit Token',
    symbol: 'PROB',
  },
  {
    id: 4588,
    name: 'SWYFT',
    symbol: 'SWYFTT',
  },
  {
    id: 4589,
    name: 'Cipher',
    symbol: 'CPR',
  },
  {
    id: 4594,
    name: 'SovranoCoin',
    symbol: 'SVR',
  },
  {
    id: 4618,
    name: 'Akoin',
    symbol: 'AKN',
  },
  {
    id: 4621,
    name: 'dForce USDx',
    symbol: 'USDX',
  },
  {
    id: 4623,
    name: 'Gomics',
    symbol: 'GOM',
  },
  {
    id: 4629,
    name: 'BOSCore',
    symbol: 'BOS',
  },
  {
    id: 4630,
    name: 'Sierracoin',
    symbol: 'SIERRA',
  },
  {
    id: 4633,
    name: 'CryptoBossCoin',
    symbol: 'CBC',
  },
  {
    id: 4642,
    name: 'Hedera',
    symbol: 'HBAR',
  },
  {
    id: 4644,
    name: 'Poseidon Network',
    symbol: 'QQQ',
  },
  {
    id: 4646,
    name: 'Beaxy',
    symbol: 'BXY',
  },
  {
    id: 4647,
    name: 'PUBLISH',
    symbol: 'NEWS',
  },
  {
    id: 4660,
    name: 'Telos',
    symbol: 'TLOS',
  },
  {
    id: 4668,
    name: 'wave edu coin',
    symbol: 'WEC',
  },
  {
    id: 4674,
    name: 'Whole Network',
    symbol: 'NODE',
  },
  {
    id: 4677,
    name: 'Tepleton',
    symbol: 'TEP',
  },
  {
    id: 4678,
    name: 'Global Digital Content',
    symbol: 'GDC',
  },
  {
    id: 4679,
    name: 'Band Protocol',
    symbol: 'BAND',
  },
  {
    id: 4680,
    name: 'FYDcoin',
    symbol: 'FYD',
  },
  {
    id: 4681,
    name: 'Color Platform',
    symbol: 'CLR',
  },
  {
    id: 4682,
    name: 'Hyper Speed Network',
    symbol: 'HSN',
  },
  {
    id: 4687,
    name: 'Binance USD',
    symbol: 'BUSD',
  },
  {
    id: 4691,
    name: 'Zano',
    symbol: 'ZANO',
  },
  {
    id: 4693,
    name: 'Global X Change Token',
    symbol: 'GXT',
  },
  {
    id: 4695,
    name: 'Echoin',
    symbol: 'EC',
  },
  {
    id: 4697,
    name: 'Rivex',
    symbol: 'RVX',
  },
  {
    id: 4702,
    name: 'Rupiah Token',
    symbol: 'IDRT',
  },
  {
    id: 4703,
    name: 'BonusCloud',
    symbol: 'BXC',
  },
  {
    id: 4704,
    name: 'Banano',
    symbol: 'BAN',
  },
  {
    id: 4705,
    name: 'PAX Gold',
    symbol: 'PAXG',
  },
  {
    id: 4709,
    name: 'XcelToken Plus',
    symbol: 'XLAB',
  },
  {
    id: 4710,
    name: 'Cere Network',
    symbol: 'CERE',
  },
  {
    id: 4712,
    name: 'AmonD',
    symbol: 'AMON',
  },
  {
    id: 4715,
    name: 'Tokenize Xchange',
    symbol: 'TKX',
  },
  {
    id: 4737,
    name: 'ITO Utility Token',
    symbol: 'IUT',
  },
  {
    id: 4746,
    name: 'Quiztok',
    symbol: 'QTCON',
  },
  {
    id: 4747,
    name: 'Velas',
    symbol: 'VLX',
  },
  {
    id: 4749,
    name: 'Bit Trust System',
    symbol: 'BIUT',
  },
  {
    id: 4752,
    name: 'CUTcoin',
    symbol: 'CUT',
  },
  {
    id: 4754,
    name: 'INLOCK',
    symbol: 'ILK',
  },
  {
    id: 4757,
    name: 'Robonomics.network',
    symbol: 'XRT',
  },
  {
    id: 4758,
    name: 'dForce',
    symbol: 'DF',
  },
  {
    id: 4760,
    name: 'PANTHEON X',
    symbol: 'XPN',
  },
  {
    id: 4761,
    name: 'NuCypher',
    symbol: 'NU',
  },
  {
    id: 4769,
    name: 'EOS Force',
    symbol: 'EOSC',
  },
  {
    id: 4773,
    name: 'PocketNode',
    symbol: 'NODE',
  },
  {
    id: 4774,
    name: '1irstGold',
    symbol: '1GOLD',
  },
  {
    id: 4777,
    name: 'Azbit',
    symbol: 'AZ',
  },
  {
    id: 4779,
    name: 'HUSD',
    symbol: 'HUSD',
  },
  {
    id: 4782,
    name: 'TurtleNetwork',
    symbol: 'TN',
  },
  {
    id: 4786,
    name: 'MDtoken',
    symbol: 'MDTK',
  },
  {
    id: 4787,
    name: 'BitcoinV',
    symbol: 'BTCV',
  },
  {
    id: 4792,
    name: 'Agora',
    symbol: 'VOTE',
  },
  {
    id: 4793,
    name: 'D Community',
    symbol: 'DILI',
  },
  {
    id: 4794,
    name: 'FinexboxToken',
    symbol: 'FNB',
  },
  {
    id: 4797,
    name: 'SMILE',
    symbol: 'SMILE',
  },
  {
    id: 4800,
    name: 'Mogu',
    symbol: 'MOGX',
  },
  {
    id: 4801,
    name: 'Codex',
    symbol: 'CDEX',
  },
  {
    id: 4802,
    name: 'Xeonbit Token',
    symbol: 'XNS',
  },
  {
    id: 4804,
    name: 'ROOBEE',
    symbol: 'ROOBEE',
  },
  {
    id: 4805,
    name: 'VNDC',
    symbol: 'VNDC',
  },
  {
    id: 4807,
    name: 'CertiK',
    symbol: 'CTK',
  },
  {
    id: 4808,
    name: 'Bincentive',
    symbol: 'BCNT',
  },
  {
    id: 4809,
    name: 'Project WITH',
    symbol: 'WIKEN',
  },
  {
    id: 4818,
    name: 'Xensor',
    symbol: 'XSR',
  },
  {
    id: 4819,
    name: 'DMme',
    symbol: 'DMME',
  },
  {
    id: 4824,
    name: 'SymVerse',
    symbol: 'SYM',
  },
  {
    id: 4826,
    name: 'ZUM TOKEN',
    symbol: 'ZUM',
  },
  {
    id: 4834,
    name: 'Golos Blockchain',
    symbol: 'GLS',
  },
  {
    id: 4835,
    name: 'NOVA',
    symbol: 'NOVA',
  },
  {
    id: 4841,
    name: 'suterusu',
    symbol: 'SUTER',
  },
  {
    id: 4842,
    name: 'Folgory Coin',
    symbol: 'FLG',
  },
  {
    id: 4844,
    name: 'MeconCash',
    symbol: 'MCH',
  },
  {
    id: 4846,
    name: 'Kava',
    symbol: 'KAVA',
  },
  {
    id: 4847,
    name: 'Stacks',
    symbol: 'STX',
  },
  {
    id: 4848,
    name: 'The Forbidden Forest',
    symbol: 'FORESTPLUS',
  },
  {
    id: 4850,
    name: 'LINKA',
    symbol: 'LINKA',
  },
  {
    id: 4860,
    name: 'Era Swap',
    symbol: 'ES',
  },
  {
    id: 4862,
    name: 'DAD',
    symbol: 'DAD',
  },
  {
    id: 4864,
    name: 'Schilling-Coin',
    symbol: 'SCH',
  },
  {
    id: 4865,
    name: 'Nahmii',
    symbol: 'NII',
  },
  {
    id: 4866,
    name: 'Grimm',
    symbol: 'GRIMM',
  },
  {
    id: 4867,
    name: 'BeatzCoin',
    symbol: 'BTZC',
  },
  {
    id: 4870,
    name: 'MesChain',
    symbol: 'MES',
  },
  {
    id: 4872,
    name: 'BenePit Protocol',
    symbol: 'BNP',
  },
  {
    id: 4881,
    name: 'Guider',
    symbol: 'GDR',
  },
  {
    id: 4885,
    name: 'Diligence',
    symbol: 'IRA',
  },
  {
    id: 4887,
    name: 'Receive Access Ecosystem',
    symbol: 'RAE',
  },
  {
    id: 4890,
    name: 'Newscrypto',
    symbol: 'NWC',
  },
  {
    id: 4892,
    name: 'Marshal Lion Group Coin',
    symbol: 'MLGC',
  },
  {
    id: 4894,
    name: 'RING X PLATFORM',
    symbol: 'RINGX',
  },
  {
    id: 4899,
    name: 'Yap Stone',
    symbol: 'YAP',
  },
  {
    id: 4901,
    name: 'Anchor',
    symbol: 'ANCT',
  },
  {
    id: 4903,
    name: 'Infinity Esaham',
    symbol: 'INFS',
  },
  {
    id: 4910,
    name: 'CoinDeal Token',
    symbol: 'CDL',
  },
  {
    id: 4915,
    name: 'UCX',
    symbol: 'UCX',
  },
  {
    id: 4916,
    name: 'Modex',
    symbol: 'MODEX',
  },
  {
    id: 4917,
    name: 'DEXA COIN',
    symbol: 'DEXA',
  },
  {
    id: 4918,
    name: 'Bankroll Network',
    symbol: 'BNKR',
  },
  {
    id: 4920,
    name: 'Aerotoken',
    symbol: 'AET',
  },
  {
    id: 4927,
    name: 'RigoBlock',
    symbol: 'GRG',
  },
  {
    id: 4928,
    name: 'Medium',
    symbol: 'MDM',
  },
  {
    id: 4929,
    name: 'JD Coin',
    symbol: 'JDC',
  },
  {
    id: 4936,
    name: 'LOLTOKEN',
    symbol: 'LOL',
  },
  {
    id: 4940,
    name: 'Kuverit',
    symbol: 'KUV',
  },
  {
    id: 4941,
    name: 'Bispex',
    symbol: 'BPX',
  },
  {
    id: 4943,
    name: 'Dai',
    symbol: 'DAI',
  },
  {
    id: 4944,
    name: 'Tellor',
    symbol: 'TRB',
  },
  {
    id: 4946,
    name: 'Vinci',
    symbol: 'VINCI',
  },
  {
    id: 4948,
    name: 'Nervos Network',
    symbol: 'CKB',
  },
  {
    id: 4950,
    name: 'LCX',
    symbol: 'LCX',
  },
  {
    id: 4951,
    name: 'Zynecoin',
    symbol: 'ZYN',
  },
  {
    id: 4953,
    name: 'FirmaChain',
    symbol: 'FCT',
  },
  {
    id: 4955,
    name: 'CAPITAL X CELL',
    symbol: 'CXC',
  },
  {
    id: 4956,
    name: 'MAP Protocol',
    symbol: 'MAP',
  },
  {
    id: 4957,
    name: 'Minter Network',
    symbol: 'BIP',
  },
  {
    id: 4958,
    name: 'Precium',
    symbol: 'PCM',
  },
  {
    id: 4966,
    name: 'Eureka Coin',
    symbol: 'ERK',
  },
  {
    id: 4971,
    name: 'NairaX',
    symbol: 'NIRX',
  },
  {
    id: 4974,
    name: 'EXMO Coin',
    symbol: 'EXM',
  },
  {
    id: 4975,
    name: 'Newsolution',
    symbol: 'NST',
  },
  {
    id: 4978,
    name: 'Wownero',
    symbol: 'WOW',
  },
  {
    id: 4979,
    name: 'PegNet',
    symbol: 'PEG',
  },
  {
    id: 4980,
    name: 'Sesameseed',
    symbol: 'SEED',
  },
  {
    id: 4983,
    name: 'Demeter Chain',
    symbol: 'DMTC',
  },
  {
    id: 4984,
    name: 'MACH Project',
    symbol: 'MACH',
  },
  {
    id: 4985,
    name: 'ArdCoin',
    symbol: 'ARDX',
  },
  {
    id: 4991,
    name: 'Lightstreams',
    symbol: 'PHT',
  },
  {
    id: 4996,
    name: 'Ultragate',
    symbol: 'ULG',
  },
  {
    id: 4997,
    name: 'Blockzero Labs',
    symbol: 'XIO',
  },
  {
    id: 5001,
    name: 'Gric Coin',
    symbol: 'GC',
  },
  {
    id: 5002,
    name: 'SafeCapital',
    symbol: 'SCAP',
  },
  {
    id: 5003,
    name: 'VAULT',
    symbol: 'VAULT',
  },
  {
    id: 5005,
    name: 'ARCS',
    symbol: 'ARX',
  },
  {
    id: 5007,
    name: 'TROY',
    symbol: 'TROY',
  },
  {
    id: 5009,
    name: 'LuckySevenToken',
    symbol: 'LST',
  },
  {
    id: 5011,
    name: 'ALLY',
    symbol: 'ALY',
  },
  {
    id: 5015,
    name: 'HEX',
    symbol: 'HEX',
  },
  {
    id: 5016,
    name: 'Innovative Bioresearch Coin',
    symbol: 'INNBC',
  },
  {
    id: 5019,
    name: 'Global Crypto Alliance',
    symbol: 'CALL',
  },
  {
    id: 5024,
    name: 'ALL BEST ICO',
    symbol: 'ALLBI',
  },
  {
    id: 5025,
    name: 'Jade Currency',
    symbol: 'JADE',
  },
  {
    id: 5026,
    name: 'Orchid',
    symbol: 'OXT',
  },
  {
    id: 5028,
    name: 'ROAD',
    symbol: 'ROAD',
  },
  {
    id: 5031,
    name: 'MimbleWimbleCoin',
    symbol: 'MWC',
  },
  {
    id: 5034,
    name: 'Kusama',
    symbol: 'KSM',
  },
  {
    id: 5038,
    name: 'Litecash',
    symbol: 'CASH',
  },
  {
    id: 5039,
    name: 'SBank',
    symbol: 'STS',
  },
  {
    id: 5046,
    name: 'Streamity',
    symbol: 'STM',
  },
  {
    id: 5049,
    name: 'VerusCoin',
    symbol: 'VRSC',
  },
  {
    id: 5052,
    name: 'Apple Network',
    symbol: 'ANK',
  },
  {
    id: 5056,
    name: 'BuySell',
    symbol: 'BULL',
  },
  {
    id: 5057,
    name: 'Helex',
    symbol: 'HLX',
  },
  {
    id: 5058,
    name: 'USDA',
    symbol: 'USDA',
  },
  {
    id: 5060,
    name: 'XeniosCoin',
    symbol: 'XNC',
  },
  {
    id: 5062,
    name: 'BEPRO Network',
    symbol: 'BEPRO',
  },
  {
    id: 5065,
    name: 'Axial Entertainment Digital Asset',
    symbol: 'AXL',
  },
  {
    id: 5067,
    name: 'MAX Exchange Token',
    symbol: 'MAX',
  },
  {
    id: 5068,
    name: 'Neutrino USD',
    symbol: 'USDN',
  },
  {
    id: 5070,
    name: 'Tap',
    symbol: 'XTP',
  },
  {
    id: 5072,
    name: 'Rakon',
    symbol: 'RKN',
  },
  {
    id: 5074,
    name: 'UBU',
    symbol: 'UBU',
  },
  {
    id: 5076,
    name: 'Global Reserve System',
    symbol: 'GLOB',
  },
  {
    id: 5078,
    name: 'THENODE',
    symbol: 'THE',
  },
  {
    id: 5079,
    name: 'apM Coin',
    symbol: 'APM',
  },
  {
    id: 5083,
    name: 'Curio',
    symbol: 'CUR',
  },
  {
    id: 5084,
    name: 'PlayFuel',
    symbol: 'PLF',
  },
  {
    id: 5086,
    name: 'Pawtocol',
    symbol: 'UPI',
  },
  {
    id: 5088,
    name: 'Guapcoin',
    symbol: 'GUAP',
  },
  {
    id: 5090,
    name: 'Global Game Coin',
    symbol: 'GGC',
  },
  {
    id: 5097,
    name: 'onLEXpa',
    symbol: 'onLEXpa',
  },
  {
    id: 5099,
    name: 'Hanacoin',
    symbol: 'HANA',
  },
  {
    id: 5103,
    name: 'Tachyon Protocol',
    symbol: 'IPX',
  },
  {
    id: 5107,
    name: 'BitKAM',
    symbol: 'KAM',
  },
  {
    id: 5108,
    name: '808TA',
    symbol: '808TA',
  },
  {
    id: 5109,
    name: 'FRED Energy',
    symbol: 'FRED',
  },
  {
    id: 5113,
    name: 'inSure DeFi',
    symbol: 'SURE',
  },
  {
    id: 5114,
    name: 'Coinsbit Token',
    symbol: 'CNB',
  },
  {
    id: 5115,
    name: 'TerraKRW',
    symbol: 'KRT',
  },
  {
    id: 5117,
    name: 'Origin Protocol',
    symbol: 'OGN',
  },
  {
    id: 5125,
    name: 'Mochimo',
    symbol: 'MCM',
  },
  {
    id: 5126,
    name: 'Soda Coin',
    symbol: 'SOC',
  },
  {
    id: 5127,
    name: 'Orient Walt',
    symbol: 'HTDF',
  },
  {
    id: 5130,
    name: 'K-Tune',
    symbol: 'KTT',
  },
  {
    id: 5132,
    name: 'Universe Coin',
    symbol: 'UNIS',
  },
  {
    id: 5135,
    name: 'AfroDex',
    symbol: 'AfroX',
  },
  {
    id: 5143,
    name: 'Documentchain',
    symbol: 'DMS',
  },
  {
    id: 5154,
    name: 'BKEX Chain',
    symbol: 'BKK',
  },
  {
    id: 5155,
    name: 'Nyzo',
    symbol: 'NYZO',
  },
  {
    id: 5156,
    name: 'HeartBout Pay',
    symbol: 'HP',
  },
  {
    id: 5157,
    name: '3X Long Bitcoin Token',
    symbol: 'BULL',
  },
  {
    id: 5158,
    name: '3X Short Bitcoin Token',
    symbol: 'BEAR',
  },
  {
    id: 5159,
    name: 'Waves Enterprise',
    symbol: 'WEST',
  },
  {
    id: 5160,
    name: 'Dune Network',
    symbol: 'DUN',
  },
  {
    id: 5161,
    name: 'WazirX',
    symbol: 'WRX',
  },
  {
    id: 5165,
    name: 'Freight Trust & Clearing Network',
    symbol: 'EDI',
  },
  {
    id: 5168,
    name: 'Bitcoin Classic',
    symbol: 'BXC',
  },
  {
    id: 5169,
    name: 'PYRO Network',
    symbol: 'PYRO',
  },
  {
    id: 5170,
    name: 'IFX24',
    symbol: 'IFX24',
  },
  {
    id: 5174,
    name: 'Buxcoin',
    symbol: 'BUX',
  },
  {
    id: 5175,
    name: 'Bitcoin Vault',
    symbol: 'BTCV',
  },
  {
    id: 5176,
    name: 'Tether Gold',
    symbol: 'XAUT',
  },
  {
    id: 5179,
    name: 'Celeum',
    symbol: 'CLX',
  },
  {
    id: 5180,
    name: 'Bitcoffeen',
    symbol: 'BFF',
  },
  {
    id: 5181,
    name: 'BiLira',
    symbol: 'TRYB',
  },
  {
    id: 5185,
    name: 'KOK',
    symbol: 'KOK',
  },
  {
    id: 5187,
    name: 'Jarvis Network',
    symbol: 'JRT',
  },
  {
    id: 5189,
    name: 'AK12',
    symbol: 'AK12',
  },
  {
    id: 5190,
    name: 'FLEX',
    symbol: 'FLEX',
  },
  {
    id: 5192,
    name: 'KONJUNGATE',
    symbol: 'KONJ',
  },
  {
    id: 5198,
    name: 'Creditcoin',
    symbol: 'CTC',
  },
  {
    id: 5200,
    name: 'Gleec',
    symbol: 'GLEEC',
  },
  {
    id: 5203,
    name: 'Perth Mint Gold Token',
    symbol: 'PMGT',
  },
  {
    id: 5204,
    name: 'CitiOs',
    symbol: 'R2R',
  },
  {
    id: 5208,
    name: 'Wallet Plus X',
    symbol: 'WPX',
  },
  {
    id: 5214,
    name: 'Phoneum',
    symbol: 'PHT',
  },
  {
    id: 5216,
    name: '3X Short Ethereum Token',
    symbol: 'ETHBEAR',
  },
  {
    id: 5217,
    name: '3X Long Ethereum Token',
    symbol: 'ETHBULL',
  },
  {
    id: 5219,
    name: 'USD Bancor',
    symbol: 'USDB',
  },
  {
    id: 5220,
    name: 'QURAS',
    symbol: 'XQC',
  },
  {
    id: 5221,
    name: 'Handshake',
    symbol: 'HNS',
  },
  {
    id: 5224,
    name: 'Juventus Fan Token',
    symbol: 'JUV',
  },
  {
    id: 5225,
    name: 'FC Barcelona Fan Token',
    symbol: 'BAR',
  },
  {
    id: 5226,
    name: 'Paris Saint-Germain Fan Token',
    symbol: 'PSG',
  },
  {
    id: 5227,
    name: 'Atletico De Madrid Fan Token',
    symbol: 'ATM',
  },
  {
    id: 5228,
    name: 'Galatasaray Fan Token',
    symbol: 'GAL',
  },
  {
    id: 5229,
    name: 'AS Roma Fan Token',
    symbol: 'ASR',
  },
  {
    id: 5233,
    name: 'WinCash',
    symbol: 'WCC',
  },
  {
    id: 5234,
    name: 'Metaverse Dualchain Network Architecture',
    symbol: 'DNA',
  },
  {
    id: 5236,
    name: 'Kemacoin',
    symbol: 'KEMA',
  },
  {
    id: 5246,
    name: 'ViteX Coin',
    symbol: 'VX',
  },
  {
    id: 5247,
    name: 'Zuflo Coin',
    symbol: 'ZFL',
  },
  {
    id: 5251,
    name: 'LinkArt',
    symbol: 'LAR',
  },
  {
    id: 5253,
    name: 'The Hustle App',
    symbol: 'HUSL',
  },
  {
    id: 5255,
    name: 'LegalBlock',
    symbol: 'LBK',
  },
  {
    id: 5258,
    name: 'APIX',
    symbol: 'APIX',
  },
  {
    id: 5259,
    name: 'Emrals',
    symbol: 'EMRALS',
  },
  {
    id: 5263,
    name: 'Compound Dai',
    symbol: 'CDAI',
  },
  {
    id: 5264,
    name: 'Compound SAI',
    symbol: 'CSAI',
  },
  {
    id: 5265,
    name: 'Compound USD Coin',
    symbol: 'CUSDC',
  },
  {
    id: 5266,
    name: 'MiL.k',
    symbol: 'MLK',
  },
  {
    id: 5267,
    name: 'QUEENBEE',
    symbol: 'QBZ',
  },
  {
    id: 5268,
    name: 'Energy Web Token',
    symbol: 'EWT',
  },
  {
    id: 5270,
    name: 'Freecash',
    symbol: 'FCH',
  },
  {
    id: 5274,
    name: 'Edgeware',
    symbol: 'EDG',
  },
  {
    id: 5275,
    name: 'Paycoin',
    symbol: 'PCI',
  },
  {
    id: 5277,
    name: 'SynchroBitcoin',
    symbol: 'SNB',
  },
  {
    id: 5278,
    name: 'Joys Digital',
    symbol: 'JOYS',
  },
  {
    id: 5279,
    name: 'Sologenic',
    symbol: 'SOLO',
  },
  {
    id: 5280,
    name: 'Bloomzed Loyalty Club Ticket',
    symbol: 'BLCT',
  },
  {
    id: 5282,
    name: 'Kepler Network',
    symbol: 'KMW',
  },
  {
    id: 5286,
    name: 'KingMoney',
    symbol: 'KIM',
  },
  {
    id: 5291,
    name: 'LUCY',
    symbol: 'LUCY',
  },
  {
    id: 5292,
    name: 'The Tokenized Bitcoin',
    symbol: 'imBTC',
  },
  {
    id: 5294,
    name: '3X Short BNB Token',
    symbol: 'BNBBEAR',
  },
  {
    id: 5295,
    name: '3X Long BNB Token',
    symbol: 'BNBBULL',
  },
  {
    id: 5298,
    name: 'SuperSkynet',
    symbol: 'SSN',
  },
  {
    id: 5299,
    name: 'HyperDAO',
    symbol: 'HDAO',
  },
  {
    id: 5300,
    name: 'Inex Project',
    symbol: 'INEX',
  },
  {
    id: 5305,
    name: 'BTSE',
    symbol: 'BTSE',
  },
  {
    id: 5309,
    name: 'OG Fan Token',
    symbol: 'OG',
  },
  {
    id: 5313,
    name: 'CONTRACOIN',
    symbol: 'CTCN',
  },
  {
    id: 5316,
    name: '0cash',
    symbol: 'ZCH',
  },
  {
    id: 5319,
    name: 'SimpleChain',
    symbol: 'SIMPLE',
  },
  {
    id: 5320,
    name: 'Bonorum',
    symbol: 'BONO',
  },
  {
    id: 5322,
    name: 'GermanCoin',
    symbol: 'GCX',
  },
  {
    id: 5326,
    name: 'Orbit Chain',
    symbol: 'ORC',
  },
  {
    id: 5328,
    name: 'WOM Protocol',
    symbol: 'WOM',
  },
  {
    id: 5329,
    name: 'Largo Coin',
    symbol: 'LRG',
  },
  {
    id: 5330,
    name: 'Shardus',
    symbol: 'ULT',
  },
  {
    id: 5332,
    name: 'Cofinex',
    symbol: 'CNX',
  },
  {
    id: 5334,
    name: 'RAKUN',
    symbol: 'RAKU',
  },
  {
    id: 5336,
    name: 'Homeros',
    symbol: 'HMR',
  },
  {
    id: 5337,
    name: 'iOWN Token',
    symbol: 'iOWN',
  },
  {
    id: 5338,
    name: 'Somnium Space Cubes',
    symbol: 'CUBE',
  },
  {
    id: 5343,
    name: 'Five Star Coin',
    symbol: 'FSC',
  },
  {
    id: 5350,
    name: 'Proton',
    symbol: 'XPR',
  },
  {
    id: 5354,
    name: 'PEAKDEFI',
    symbol: 'PEAK',
  },
  {
    id: 5355,
    name: 'Chainpay',
    symbol: 'CPAY',
  },
  {
    id: 5358,
    name: 'IBStoken',
    symbol: 'IBS',
  },
  {
    id: 5362,
    name: 'StellarPayGlobal',
    symbol: 'XLPG',
  },
  {
    id: 5363,
    name: 'Cryptobuyer',
    symbol: 'XPT',
  },
  {
    id: 5364,
    name: 'Dexchain',
    symbol: 'DXC',
  },
  {
    id: 5365,
    name: 'Historia',
    symbol: 'HTA',
  },
  {
    id: 5366,
    name: 'GoalTime N',
    symbol: 'GTX',
  },
  {
    id: 5367,
    name: 'ODE',
    symbol: 'ODE',
  },
  {
    id: 5370,
    name: 'Hive',
    symbol: 'HIVE',
  },
  {
    id: 5375,
    name: 'Hive Dollar',
    symbol: 'HBD',
  },
  {
    id: 5376,
    name: 'CryptoEnergy',
    symbol: 'CNRG',
  },
  {
    id: 5378,
    name: '3X Long TRX Token',
    symbol: 'TRXBULL',
  },
  {
    id: 5379,
    name: '3X Short TRX Token',
    symbol: 'TRXBEAR',
  },
  {
    id: 5380,
    name: 'HUNT',
    symbol: 'HUNT',
  },
  {
    id: 5381,
    name: 'PengolinCoin',
    symbol: 'PGO',
  },
  {
    id: 5382,
    name: 'ELYSIA',
    symbol: 'EL',
  },
  {
    id: 5383,
    name: 'B ONE PAYMENT',
    symbol: 'B1P',
  },
  {
    id: 5392,
    name: 'Scopuly Coin',
    symbol: 'SCOP',
  },
  {
    id: 5393,
    name: 'Touch Social',
    symbol: 'TST',
  },
  {
    id: 5397,
    name: 'Castweet',
    symbol: 'CTT',
  },
  {
    id: 5399,
    name: 'TILWIKI',
    symbol: 'TLW',
  },
  {
    id: 5400,
    name: 'Charg Coin',
    symbol: 'CHG',
  },
  {
    id: 5401,
    name: 'CoinLoan',
    symbol: 'CLT',
  },
  {
    id: 5403,
    name: 'Unknown Fair Object',
    symbol: 'UFO',
  },
  {
    id: 5404,
    name: 'Bitcurate',
    symbol: 'BTCR',
  },
  {
    id: 5407,
    name: 'Kingdom Game 4.0',
    symbol: 'KDG',
  },
  {
    id: 5409,
    name: '4THPILLAR TECHNOLOGIES',
    symbol: 'FOUR',
  },
  {
    id: 5410,
    name: 'PARSIQ',
    symbol: 'PRQ',
  },
  {
    id: 5412,
    name: '3x Long XRP Token',
    symbol: 'XRPBULL',
  },
  {
    id: 5413,
    name: '3x Short XRP Token',
    symbol: 'XRPBEAR',
  },
  {
    id: 5414,
    name: '3x Long EOS Token',
    symbol: 'EOSBULL',
  },
  {
    id: 5415,
    name: '3x Short EOS Token',
    symbol: 'EOSBEAR',
  },
  {
    id: 5418,
    name: 'Latamcash',
    symbol: 'LMCH',
  },
  {
    id: 5420,
    name: 'SonoCoin',
    symbol: 'SONO',
  },
  {
    id: 5423,
    name: 'DSLA Protocol',
    symbol: 'DSLA',
  },
  {
    id: 5425,
    name: 'Mesefa',
    symbol: 'SEFA',
  },
  {
    id: 5426,
    name: 'Solana',
    symbol: 'SOL',
  },
  {
    id: 5427,
    name: 'CashHand',
    symbol: 'CHND',
  },
  {
    id: 5428,
    name: 'Vid',
    symbol: 'VI',
  },
  {
    id: 5429,
    name: 'DEAPcoin',
    symbol: 'DEP',
  },
  {
    id: 5430,
    name: 'SatoExchange Token',
    symbol: 'SATX',
  },
  {
    id: 5432,
    name: 'BigBang Core',
    symbol: 'BBC',
  },
  {
    id: 5433,
    name: 'Mega Lottery Services Global',
    symbol: 'MLR',
  },
  {
    id: 5434,
    name: 'pTokens BTC',
    symbol: 'PBTC',
  },
  {
    id: 5435,
    name: 'Epic Cash',
    symbol: 'EPIC',
  },
  {
    id: 5437,
    name: 'BIZZCOIN',
    symbol: 'BIZZ',
  },
  {
    id: 5441,
    name: 'Entherfound',
    symbol: 'ETF',
  },
  {
    id: 5444,
    name: 'Cartesi',
    symbol: 'CTSI',
  },
  {
    id: 5445,
    name: 'LBK',
    symbol: 'LBK',
  },
  {
    id: 5446,
    name: 'USDJ',
    symbol: 'USDJ',
  },
  {
    id: 5447,
    name: 'Helix',
    symbol: 'HLIX',
  },
  {
    id: 5449,
    name: 'Beer Money',
    symbol: 'BEER',
  },
  {
    id: 5450,
    name: 'WiBX',
    symbol: 'WBX',
  },
  {
    id: 5453,
    name: 'KardiaChain',
    symbol: 'KAI',
  },
  {
    id: 5455,
    name: 'Trexcoin',
    symbol: 'TREX',
  },
  {
    id: 5459,
    name: '3x Short Bitcoin SV Token',
    symbol: 'BSVBEAR',
  },
  {
    id: 5460,
    name: '3x Long Bitcoin SV Token',
    symbol: 'BSVBULL',
  },
  {
    id: 5461,
    name: '3x Short Litecoin Token',
    symbol: 'LTCBEAR',
  },
  {
    id: 5462,
    name: '3x Long Litecoin Token',
    symbol: 'LTCBULL',
  },
  {
    id: 5463,
    name: '3x Short Tezos Token',
    symbol: 'XTZBEAR',
  },
  {
    id: 5464,
    name: '3x Long Tezos Token',
    symbol: 'XTZBULL',
  },
  {
    id: 5465,
    name: 'Alchemy',
    symbol: 'ACOIN',
  },
  {
    id: 5466,
    name: '3x Short Bitcoin Cash Token',
    symbol: 'BCHBEAR',
  },
  {
    id: 5467,
    name: '3x Long Bitcoin Cash Token',
    symbol: 'BCHBULL',
  },
  {
    id: 5468,
    name: 'Isiklar Coin',
    symbol: 'ISIKC',
  },
  {
    id: 5469,
    name: 'AMATEN',
    symbol: 'AMA',
  },
  {
    id: 5471,
    name: 'Ghost',
    symbol: 'GHOST',
  },
  {
    id: 5473,
    name: 'CRDT',
    symbol: 'CRDT',
  },
  {
    id: 5474,
    name: 'Ixinium',
    symbol: 'XXA',
  },
  {
    id: 5475,
    name: 'GHOSTPRISM',
    symbol: 'GHOST',
  },
  {
    id: 5477,
    name: 'ECOChain',
    symbol: 'ECOC',
  },
  {
    id: 5478,
    name: 'ECOSC',
    symbol: 'ECU',
  },
  {
    id: 5479,
    name: 'UCA Coin',
    symbol: 'UCA',
  },
  {
    id: 5480,
    name: 'Bali Coin',
    symbol: 'BALI',
  },
  {
    id: 5481,
    name: 'BASIC',
    symbol: 'BASIC',
  },
  {
    id: 5482,
    name: 'Counos X',
    symbol: 'CCXX',
  },
  {
    id: 5486,
    name: 'Jack Token',
    symbol: 'JACK',
  },
  {
    id: 5487,
    name: 'EarnBet',
    symbol: 'BET',
  },
  {
    id: 5488,
    name: 'JUST',
    symbol: 'JST',
  },
  {
    id: 5489,
    name: 'Sudan Gold Coin',
    symbol: 'SGC',
  },
  {
    id: 5490,
    name: 'Lux Bio Cell',
    symbol: 'LBXC',
  },
  {
    id: 5508,
    name: 'Algory Project',
    symbol: 'ALG',
  },
  {
    id: 5509,
    name: 'AAX Token',
    symbol: 'AAB',
  },
  {
    id: 5512,
    name: 'BLOCKIDCOIN',
    symbol: 'BID',
  },
  {
    id: 5513,
    name: 'Crypto Holding Frank Token',
    symbol: 'CHFT',
  },
  {
    id: 5514,
    name: 'The Transfer Token',
    symbol: 'TTT',
  },
  {
    id: 5516,
    name: 'LOA Protocol',
    symbol: 'LOA',
  },
  {
    id: 5518,
    name: 'Torex',
    symbol: 'TOR',
  },
  {
    id: 5520,
    name: 'Martkist',
    symbol: 'MARTK',
  },
  {
    id: 5521,
    name: 'EzyStayz',
    symbol: 'EZY',
  },
  {
    id: 5522,
    name: 'SENSO',
    symbol: 'SENSO',
  },
  {
    id: 5523,
    name: 'Aragon Court',
    symbol: 'ANJ',
  },
  {
    id: 5524,
    name: 'TNC Coin',
    symbol: 'TNC',
  },
  {
    id: 5529,
    name: 'ASYAGRO',
    symbol: 'ASY',
  },
  {
    id: 5530,
    name: 'REBIT',
    symbol: 'KEYT',
  },
  {
    id: 5533,
    name: 'SKINCHAIN',
    symbol: 'SKC',
  },
  {
    id: 5534,
    name: 'Inverse Bitcoin Volatility Token',
    symbol: 'IBVOL',
  },
  {
    id: 5536,
    name: 'AtromG8',
    symbol: 'AG8',
  },
  {
    id: 5538,
    name: 'Buzzshow',
    symbol: 'GLDY',
  },
  {
    id: 5539,
    name: 'VeraOne',
    symbol: 'VRO',
  },
  {
    id: 5541,
    name: 'Xaya',
    symbol: 'CHI',
  },
  {
    id: 5542,
    name: '1x Long Bitcoin Implied Volatility Token',
    symbol: 'BVOL',
  },
  {
    id: 5544,
    name: 'Aluna.Social',
    symbol: 'ALN',
  },
  {
    id: 5545,
    name: 'NFX Coin',
    symbol: 'NFXC',
  },
  {
    id: 5548,
    name: 'Massnet',
    symbol: 'MASS',
  },
  {
    id: 5550,
    name: 'BeeEx',
    symbol: 'BEE',
  },
  {
    id: 5551,
    name: 'The global index chain',
    symbol: 'TGIC',
  },
  {
    id: 5552,
    name: 'Hathor',
    symbol: 'HTR',
  },
  {
    id: 5554,
    name: 'Vanywhere',
    symbol: 'VANY',
  },
  {
    id: 5555,
    name: 'Universal Protocol Token',
    symbol: 'UPT',
  },
  {
    id: 5556,
    name: 'Resfinex Token',
    symbol: 'RES',
  },
  {
    id: 5560,
    name: 'Idea Chain Coin',
    symbol: 'ICH',
  },
  {
    id: 5563,
    name: 'CryptoBharatCoin',
    symbol: 'CBC',
  },
  {
    id: 5564,
    name: 'ARMTOKEN',
    symbol: 'TARM',
  },
  {
    id: 5566,
    name: 'Keep Network',
    symbol: 'KEEP',
  },
  {
    id: 5567,
    name: 'Celo',
    symbol: 'CELO',
  },
  {
    id: 5572,
    name: 'HOMIHELP',
    symbol: 'HOMI',
  },
  {
    id: 5577,
    name: 'Litecoin SV',
    symbol: 'LSV',
  },
  {
    id: 5578,
    name: 'LEVELG',
    symbol: 'LEVELG',
  },
  {
    id: 5580,
    name: 'IDK',
    symbol: 'IDK',
  },
  {
    id: 5583,
    name: 'Hacken Token',
    symbol: 'HAI',
  },
  {
    id: 5587,
    name: '2key.network',
    symbol: '2KEY',
  },
  {
    id: 5589,
    name: 'DXdao',
    symbol: 'DXD',
  },
  {
    id: 5590,
    name: 'GeoDB',
    symbol: 'GEO',
  },
  {
    id: 5591,
    name: 'Pyrk',
    symbol: 'PYRK',
  },
  {
    id: 5595,
    name: 'MultiCoinCasino',
    symbol: 'MCC',
  },
  {
    id: 5599,
    name: 'XTRM COIN',
    symbol: 'XTRM',
  },
  {
    id: 5600,
    name: 'Attila',
    symbol: 'ATT',
  },
  {
    id: 5601,
    name: 'xDai',
    symbol: 'STAKE',
  },
  {
    id: 5604,
    name: 'Secret',
    symbol: 'SCRT',
  },
  {
    id: 5607,
    name: 'Simple Software Solutions',
    symbol: 'SSS',
  },
  {
    id: 5608,
    name: 'BTCUP',
    symbol: 'BTCUP',
  },
  {
    id: 5609,
    name: 'BTCDOWN',
    symbol: 'BTCDOWN',
  },
  {
    id: 5610,
    name: 'ZIMBOCASH',
    symbol: 'ZASH',
  },
  {
    id: 5612,
    name: 'SOMESING',
    symbol: 'SSX',
  },
  {
    id: 5614,
    name: 'Zelwin',
    symbol: 'ZLW',
  },
  {
    id: 5616,
    name: 'MATH',
    symbol: 'MATH',
  },
  {
    id: 5617,
    name: 'UMA',
    symbol: 'UMA',
  },
  {
    id: 5618,
    name: 'Dawn Protocol',
    symbol: 'DAWN',
  },
  {
    id: 5619,
    name: 'VEHICLE DATA ARTIFICIAL INTELLIGENCE PLATFORM',
    symbol: 'VAIP',
  },
  {
    id: 5620,
    name: '8X8 PROTOCOL',
    symbol: 'EXE',
  },
  {
    id: 5622,
    name: 'Darma Cash',
    symbol: 'DMCH',
  },
  {
    id: 5623,
    name: 'Skillchain',
    symbol: 'SKI',
  },
  {
    id: 5625,
    name: 'LUKSO',
    symbol: 'LYXe',
  },
  {
    id: 5626,
    name: 'King DAG',
    symbol: 'KDAG',
  },
  {
    id: 5628,
    name: 'VARC',
    symbol: 'VARC',
  },
  {
    id: 5629,
    name: 'NDN Link',
    symbol: 'NDN',
  },
  {
    id: 5630,
    name: 'WaykiChain Governance Coin',
    symbol: 'WGRT',
  },
  {
    id: 5631,
    name: 'Orion Protocol',
    symbol: 'ORN',
  },
  {
    id: 5632,
    name: 'Arweave',
    symbol: 'AR',
  },
  {
    id: 5633,
    name: 'UCROWDME',
    symbol: 'UCM',
  },
  {
    id: 5634,
    name: 'Fuse Network',
    symbol: 'FUSE',
  },
  {
    id: 5640,
    name: 'PointPay',
    symbol: 'PXP',
  },
  {
    id: 5641,
    name: 'BackPacker Coin',
    symbol: 'BPC',
  },
  {
    id: 5644,
    name: 'Blue Baikal',
    symbol: 'BBC',
  },
  {
    id: 5646,
    name: 'MERCI',
    symbol: 'MERCI',
  },
  {
    id: 5647,
    name: 'Kadena',
    symbol: 'KDA',
  },
  {
    id: 5648,
    name: 'BlockNoteX',
    symbol: 'BNOX',
  },
  {
    id: 5651,
    name: 'CryptoBet',
    symbol: 'CBET',
  },
  {
    id: 5656,
    name: '1x Short Bitcoin Token',
    symbol: 'HEDGE',
  },
  {
    id: 5658,
    name: '1X Short Ethereum Token',
    symbol: 'ETHHEDGE',
  },
  {
    id: 5659,
    name: 'Xank',
    symbol: 'XANK',
  },
  {
    id: 5660,
    name: 'UniPower',
    symbol: 'POWER',
  },
  {
    id: 5661,
    name: 'Fanaticos Cash',
    symbol: 'FCH',
  },
  {
    id: 5662,
    name: 'Sylo',
    symbol: 'SYLO',
  },
  {
    id: 5663,
    name: 'ZelaaPayAE',
    symbol: 'ZPAE',
  },
  {
    id: 5665,
    name: 'Helium',
    symbol: 'HNT',
  },
  {
    id: 5667,
    name: 'Bitgesell',
    symbol: 'BGL',
  },
  {
    id: 5669,
    name: 'Electronero Pulse',
    symbol: 'ETNXP',
  },
  {
    id: 5673,
    name: 'EYES Protocol',
    symbol: 'EYES',
  },
  {
    id: 5674,
    name: 'PhoenixDAO',
    symbol: 'PHNX',
  },
  {
    id: 5677,
    name: 'IZE',
    symbol: 'IZE',
  },
  {
    id: 5686,
    name: 'Vectorium',
    symbol: 'VECT',
  },
  {
    id: 5690,
    name: 'Render Token',
    symbol: 'RNDR',
  },
  {
    id: 5691,
    name: 'SKALE Network',
    symbol: 'SKL',
  },
  {
    id: 5692,
    name: 'Compound',
    symbol: 'COMP',
  },
  {
    id: 5694,
    name: 'UniDollar',
    symbol: 'UNIUSD',
  },
  {
    id: 5697,
    name: 'DigiDinar Token',
    symbol: 'DDRT',
  },
  {
    id: 5698,
    name: 'GM Holding',
    symbol: 'GM',
  },
  {
    id: 5702,
    name: 'MONNOS',
    symbol: 'MNS',
  },
  {
    id: 5703,
    name: 'Neuromorphic.io',
    symbol: 'NMP',
  },
  {
    id: 5704,
    name: 'DFOhub',
    symbol: 'BUIDL',
  },
  {
    id: 5705,
    name: 'AurusGOLD',
    symbol: 'AWG',
  },
  {
    id: 5709,
    name: 'Chi Gastoken',
    symbol: 'CHI',
  },
  {
    id: 5711,
    name: 'Golden Ratio Token',
    symbol: 'GRT',
  },
  {
    id: 5712,
    name: 'FinNexus',
    symbol: 'FNX',
  },
  {
    id: 5713,
    name: 'Ravencoin Classic',
    symbol: 'RVC',
  },
  {
    id: 5717,
    name: 'ACE',
    symbol: 'ACE',
  },
  {
    id: 5719,
    name: 'CACHE Gold',
    symbol: 'CGT',
  },
  {
    id: 5721,
    name: 'SorachanCoin',
    symbol: 'SORA',
  },
  {
    id: 5722,
    name: 'HOMT',
    symbol: 'HOMT',
  },
  {
    id: 5728,
    name: 'Balancer',
    symbol: 'BAL',
  },
  {
    id: 5729,
    name: 'ChainZ Arena',
    symbol: 'SOUL',
  },
  {
    id: 5732,
    name: 'BITCOINHEDGE',
    symbol: 'BTCHG',
  },
  {
    id: 5741,
    name: 'DMM: Governance',
    symbol: 'DMG',
  },
  {
    id: 5742,
    name: 'Compound Basic Attention Token',
    symbol: 'CBAT',
  },
  {
    id: 5743,
    name: 'Compound 0x',
    symbol: 'CZRX',
  },
  {
    id: 5744,
    name: 'Compound Wrapped BTC',
    symbol: 'CWBTC',
  },
  {
    id: 5745,
    name: 'Compound USDT',
    symbol: 'CUSDT',
  },
  {
    id: 5746,
    name: 'Compound Augur',
    symbol: 'CREP',
  },
  {
    id: 5747,
    name: 'mStable USD',
    symbol: 'MUSD',
  },
  {
    id: 5748,
    name: 'mStable Governance Token: Meta (MTA)',
    symbol: 'MTA',
  },
  {
    id: 5749,
    name: 'Aave TUSD',
    symbol: 'ATUSD',
  },
  {
    id: 5751,
    name: 'Aave LINK',
    symbol: 'ALINK',
  },
  {
    id: 5752,
    name: 'Aave SNX',
    symbol: 'ASNX',
  },
  {
    id: 5753,
    name: 'Aave MKR',
    symbol: 'AMKR',
  },
  {
    id: 5754,
    name: 'Aave BAT',
    symbol: 'ABAT',
  },
  {
    id: 5755,
    name: 'Aave BUSD',
    symbol: 'ABUSD',
  },
  {
    id: 5763,
    name: 'Aave DAI',
    symbol: 'ADAI',
  },
  {
    id: 5764,
    name: 'sBTC',
    symbol: 'SBTC',
  },
  {
    id: 5765,
    name: 'sETH',
    symbol: 'SETH',
  },
  {
    id: 5775,
    name: 'Oikos',
    symbol: 'OKS',
  },
  {
    id: 5776,
    name: 'tBTC',
    symbol: 'TBTC',
  },
  {
    id: 5777,
    name: 'renBTC',
    symbol: 'RENBTC',
  },
  {
    id: 5778,
    name: 'ETHPlus',
    symbol: 'ETHP',
  },
  {
    id: 5779,
    name: 'Ystar',
    symbol: 'YSR',
  },
  {
    id: 5781,
    name: 'CashBackPro',
    symbol: 'CBP',
  },
  {
    id: 5782,
    name: 'Bestay',
    symbol: 'BSY',
  },
  {
    id: 5785,
    name: 'STPAY',
    symbol: 'STP',
  },
  {
    id: 5786,
    name: 'LYFE',
    symbol: 'LYFE',
  },
  {
    id: 5789,
    name: 'SaveToken',
    symbol: 'SAVE',
  },
  {
    id: 5792,
    name: 'Bananatok',
    symbol: 'BNA',
  },
  {
    id: 5794,
    name: 'pNetwork',
    symbol: 'PNT',
  },
  {
    id: 5796,
    name: 'Doctors Coin',
    symbol: 'DRS',
  },
  {
    id: 5798,
    name: 'Darwinia Network',
    symbol: 'RING',
  },
  {
    id: 5800,
    name: 'Treecle',
    symbol: 'TRCL',
  },
  {
    id: 5801,
    name: 'Nokencoin',
    symbol: 'NOKN',
  },
  {
    id: 5802,
    name: 'Sora',
    symbol: 'XOR',
  },
  {
    id: 5803,
    name: 'BitCherry',
    symbol: 'BCHC',
  },
  {
    id: 5804,
    name: 'DeFiChain',
    symbol: 'DFI',
  },
  {
    id: 5805,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  {
    id: 5806,
    name: 'Imsmart',
    symbol: 'IMT',
  },
  {
    id: 5807,
    name: 'Release Project',
    symbol: 'REL',
  },
  {
    id: 5809,
    name: 'Cap',
    symbol: 'CAP',
  },
  {
    id: 5810,
    name: 'bZx Protocol',
    symbol: 'BZRX',
  },
  {
    id: 5814,
    name: 'Rivermount',
    symbol: 'RM',
  },
  {
    id: 5815,
    name: 'BitcoinPoS',
    symbol: 'BPS',
  },
  {
    id: 5816,
    name: 'Rewardiqa',
    symbol: 'REW',
  },
  {
    id: 5818,
    name: 'Ormeus Cash',
    symbol: 'OMC',
  },
  {
    id: 5820,
    name: 'Gstcoin',
    symbol: 'GST',
  },
  {
    id: 5821,
    name: 'Aleph.im',
    symbol: 'ALEPH',
  },
  {
    id: 5824,
    name: 'Smooth Love Potion',
    symbol: 'SLP',
  },
  {
    id: 5827,
    name: 'AntiscamToken',
    symbol: 'AST',
  },
  {
    id: 5828,
    name: 'VN Token',
    symbol: 'VN',
  },
  {
    id: 5829,
    name: 'TrustSwap',
    symbol: 'SWAP',
  },
  {
    id: 5830,
    name: 'NXM',
    symbol: 'NXM',
  },
  {
    id: 5831,
    name: 'Pizza',
    symbol: 'PIZZA',
  },
  {
    id: 5833,
    name: 'ASKO',
    symbol: 'ASKO',
  },
  {
    id: 5834,
    name: 'Add.xyz',
    symbol: 'ADD',
  },
  {
    id: 5835,
    name: 'Decentr',
    symbol: 'DEC',
  },
  {
    id: 5836,
    name: 'Idena',
    symbol: 'IDNA',
  },
  {
    id: 5837,
    name: 'DoDreamChain',
    symbol: 'DRM',
  },
  {
    id: 5839,
    name: 'AnimalGo',
    symbol: 'GOM2',
  },
  {
    id: 5840,
    name: 'Insight Protocol',
    symbol: 'INX',
  },
  {
    id: 5841,
    name: 'NEST Protocol',
    symbol: 'NEST',
  },
  {
    id: 5842,
    name: 'PUML Better Health',
    symbol: 'PUML',
  },
  {
    id: 5843,
    name: 'STONK',
    symbol: 'STONK',
  },
  {
    id: 5844,
    name: 'Cipher Core Token',
    symbol: 'CIPHC',
  },
  {
    id: 5847,
    name: 'Defis',
    symbol: 'XGM',
  },
  {
    id: 5849,
    name: 'NoleCoin',
    symbol: 'NOLE',
  },
  {
    id: 5850,
    name: 'Bitpayer Token',
    symbol: 'BPT',
  },
  {
    id: 5855,
    name: 'BELIEVER',
    symbol: 'BLVR',
  },
  {
    id: 5856,
    name: 'Bankroll Vault',
    symbol: 'VLT',
  },
  {
    id: 5857,
    name: 'FLAMA',
    symbol: 'FMA',
  },
  {
    id: 5858,
    name: 'QANplatform',
    symbol: 'QANX',
  },
  {
    id: 5862,
    name: 'sDEFI',
    symbol: 'SDEFI',
  },
  {
    id: 5864,
    name: 'yearn.finance',
    symbol: 'YFI',
  },
  {
    id: 5865,
    name: 'FIO Protocol',
    symbol: 'FIO',
  },
  {
    id: 5866,
    name: 'DEXTools',
    symbol: 'DEXT',
  },
  {
    id: 5868,
    name: 'STATERA',
    symbol: 'STA',
  },
  {
    id: 5871,
    name: 'Falcon Project',
    symbol: 'FNT',
  },
  {
    id: 5873,
    name: 'NextDAO',
    symbol: 'NAX',
  },
  {
    id: 5876,
    name: 'Datamine FLUX',
    symbol: 'FLUX',
  },
  {
    id: 5877,
    name: 'Rarible',
    symbol: 'RARI',
  },
  {
    id: 5880,
    name: 'Props Token',
    symbol: 'PROPS',
  },
  {
    id: 5881,
    name: 'Balloon-X',
    symbol: 'BLX',
  },
  {
    id: 5882,
    name: 'Stafi',
    symbol: 'FIS',
  },
  {
    id: 5884,
    name: 'Decurian',
    symbol: 'ECU',
  },
  {
    id: 5885,
    name: 'EcoDollar',
    symbol: 'ECOS',
  },
  {
    id: 5886,
    name: 'Rowan Token',
    symbol: 'RWN',
  },
  {
    id: 5889,
    name: 'snglsDAO',
    symbol: 'SGT',
  },
  {
    id: 5892,
    name: 'Anyswap',
    symbol: 'ANY',
  },
  {
    id: 5893,
    name: 'Frontier',
    symbol: 'FRONT',
  },
  {
    id: 5894,
    name: 'DoYourTip',
    symbol: 'DYT',
  },
  {
    id: 5898,
    name: 'Index Chain',
    symbol: 'IDX',
  },
  {
    id: 5899,
    name: 'Casper',
    symbol: 'CSPR',
  },
  {
    id: 5900,
    name: 'DigiDinar',
    symbol: 'DDR',
  },
  {
    id: 5901,
    name: 'Union Fair Coin',
    symbol: 'UFC',
  },
  {
    id: 5902,
    name: 'DragonVein',
    symbol: 'DVC',
  },
  {
    id: 5903,
    name: 'Bitcoin True',
    symbol: 'BTCT',
  },
  {
    id: 5904,
    name: 'BLOCKCLOUT',
    symbol: 'CLOUT',
  },
  {
    id: 5906,
    name: 'NerveNetwork',
    symbol: 'NVT',
  },
  {
    id: 5907,
    name: 'Crypto Cricket Club',
    symbol: '3Cs',
  },
  {
    id: 5908,
    name: 'dKargo',
    symbol: 'DKA',
  },
  {
    id: 5910,
    name: 'Fesschain',
    symbol: 'FESS',
  },
  {
    id: 5912,
    name: '4ART Coin',
    symbol: '4ART',
  },
  {
    id: 5914,
    name: 'intexcoin',
    symbol: 'INTX',
  },
  {
    id: 5915,
    name: 'Bone',
    symbol: 'BONE',
  },
  {
    id: 5918,
    name: 'ModiHost',
    symbol: 'AIM',
  },
  {
    id: 5919,
    name: 'Meter Governance',
    symbol: 'MTRG',
  },
  {
    id: 5922,
    name: 'Swingby',
    symbol: 'SWINGBY',
  },
  {
    id: 5924,
    name: 'Pantos',
    symbol: 'PAN',
  },
  {
    id: 5925,
    name: 'Pkoin',
    symbol: 'PKOIN',
  },
  {
    id: 5926,
    name: 'CoinZoom',
    symbol: 'ZOOM',
  },
  {
    id: 5931,
    name: 'Darwinia Commitment Token',
    symbol: 'KTON',
  },
  {
    id: 5933,
    name: 'Fireball',
    symbol: 'FIRE',
  },
  {
    id: 5934,
    name: 'Hey Bitcoin',
    symbol: 'HYBN',
  },
  {
    id: 5935,
    name: 'Karma DAO',
    symbol: 'KARMA',
  },
  {
    id: 5939,
    name: 'Wrapped NXM',
    symbol: 'WNXM',
  },
  {
    id: 5945,
    name: 'Temtum',
    symbol: 'TEM',
  },
  {
    id: 5946,
    name: 'South African Tether',
    symbol: 'xZAR',
  },
  {
    id: 5947,
    name: 'TokenPocket',
    symbol: 'TPT',
  },
  {
    id: 5949,
    name: 'Ulgen Hash Power',
    symbol: 'UHP',
  },
  {
    id: 5952,
    name: 'DMScript',
    symbol: 'DMST',
  },
  {
    id: 5955,
    name: 'FME',
    symbol: 'FME',
  },
  {
    id: 5956,
    name: 'MCDEX Token',
    symbol: 'MCB',
  },
  {
    id: 5957,
    name: 'DFI.Money',
    symbol: 'YFII',
  },
  {
    id: 5958,
    name: 'MOTIV Protocol',
    symbol: 'MOV',
  },
  {
    id: 5963,
    name: 'Centric Swap',
    symbol: 'CNS',
  },
  {
    id: 5964,
    name: 'Trust Wallet Token',
    symbol: 'TWT',
  },
  {
    id: 5965,
    name: 'PowerBalt',
    symbol: 'PWRB',
  },
  {
    id: 5966,
    name: 'Student Coin',
    symbol: 'STC',
  },
  {
    id: 5967,
    name: 'Trendering',
    symbol: 'TRND',
  },
  {
    id: 5969,
    name: 'KIWI TOKEN',
    symbol: 'KIWI',
  },
  {
    id: 5971,
    name: 'Tendies',
    symbol: 'TEND',
  },
  {
    id: 5972,
    name: 'TrustDAO',
    symbol: 'TRUST',
  },
  {
    id: 5973,
    name: 'Vision Network',
    symbol: 'VSN',
  },
  {
    id: 5985,
    name: 'Limestone Network',
    symbol: 'LIMEX',
  },
  {
    id: 5986,
    name: 'Liquidity Dividends Protocol',
    symbol: 'LID',
  },
  {
    id: 5987,
    name: 'SIMBA Storage Token',
    symbol: 'SST',
  },
  {
    id: 5989,
    name: 'BNS Token',
    symbol: 'BNS',
  },
  {
    id: 5990,
    name: 'Dev Protocol',
    symbol: 'DEV',
  },
  {
    id: 5993,
    name: 'Lung Protocol',
    symbol: 'L2P',
  },
  {
    id: 5994,
    name: 'SHIBA INU',
    symbol: 'SHIB',
  },
  {
    id: 5995,
    name: 'Kids Cash',
    symbol: 'KASH',
  },
  {
    id: 5997,
    name: 'Libertas Token',
    symbol: 'LIBERTAS',
  },
  {
    id: 5998,
    name: 'Antiample',
    symbol: 'XAMP',
  },
  {
    id: 5999,
    name: 'XT.com Token',
    symbol: 'XT',
  },
  {
    id: 6004,
    name: 'Bit World Token',
    symbol: 'BWB',
  },
  {
    id: 6018,
    name: 'Global China Cash',
    symbol: 'CNC',
  },
  {
    id: 6022,
    name: 'PolypuX',
    symbol: 'PUX',
  },
  {
    id: 6025,
    name: 'DigiMax DGMT',
    symbol: 'DGMT',
  },
  {
    id: 6026,
    name: 'All.me',
    symbol: 'ME',
  },
  {
    id: 6027,
    name: 'TOPBTC Token',
    symbol: 'TOPB',
  },
  {
    id: 6028,
    name: 'MDUKEY',
    symbol: 'MDU',
  },
  {
    id: 6029,
    name: 'CoinBene Future Token',
    symbol: 'CFT',
  },
  {
    id: 6032,
    name: 'Nilu',
    symbol: 'NILU',
  },
  {
    id: 6036,
    name: 'Culture Ticket Chain',
    symbol: 'CTC',
  },
  {
    id: 6037,
    name: '3X Long Chainlink Token',
    symbol: 'LINKBULL',
  },
  {
    id: 6039,
    name: 'Connectome',
    symbol: 'CNTM',
  },
  {
    id: 6040,
    name: '3X Short Cardano Token',
    symbol: 'ADABEAR',
  },
  {
    id: 6051,
    name: '888tron',
    symbol: '888',
  },
  {
    id: 6053,
    name: 'Mineral',
    symbol: 'MNR',
  },
  {
    id: 6062,
    name: 'HUPAYX',
    symbol: 'HPX',
  },
  {
    id: 6069,
    name: 'Assemble Protocol',
    symbol: 'ASM',
  },
  {
    id: 6070,
    name: 'EIDOS',
    symbol: 'EIDOS',
  },
  {
    id: 6074,
    name: '3X Long Algorand Token',
    symbol: 'ALGOBULL',
  },
  {
    id: 6075,
    name: 'GIVLY Coin',
    symbol: 'GIV',
  },
  {
    id: 6077,
    name: '3X Long Altcoin Index Token',
    symbol: 'ALTBULL',
  },
  {
    id: 6079,
    name: '3X Long Cardano Token',
    symbol: 'ADABULL',
  },
  {
    id: 6080,
    name: '3X Long Cosmos Token',
    symbol: 'ATOMBULL',
  },
  {
    id: 6081,
    name: '3X Long Dogecoin Token',
    symbol: 'DOGEBULL',
  },
  {
    id: 6082,
    name: '3X Long Dragon Index Token',
    symbol: 'DRGNBULL',
  },
  {
    id: 6083,
    name: '3X Long Ethereum Classic Token',
    symbol: 'ETCBULL',
  },
  {
    id: 6084,
    name: '3X Long Huobi Token Token',
    symbol: 'HTBULL',
  },
  {
    id: 6085,
    name: '3X Long Matic Token',
    symbol: 'MATICBULL',
  },
  {
    id: 6086,
    name: '3X Long Midcap Index Token',
    symbol: 'MIDBULL',
  },
  {
    id: 6087,
    name: '3X Long OKB Token',
    symbol: 'OKBBULL',
  },
  {
    id: 6088,
    name: '3X Long Shitcoin Index Token',
    symbol: 'BULLSHIT',
  },
  {
    id: 6090,
    name: '3X Long TomoChain Token',
    symbol: 'TOMOBULL',
  },
  {
    id: 6091,
    name: '3X Short Algorand Token',
    symbol: 'ALGOBEAR',
  },
  {
    id: 6094,
    name: '3X Short Chainlink Token',
    symbol: 'LINKBEAR',
  },
  {
    id: 6096,
    name: '3X Short Cosmos Token',
    symbol: 'ATOMBEAR',
  },
  {
    id: 6099,
    name: '3X Short Ethereum Classic Token',
    symbol: 'ETCBEAR',
  },
  {
    id: 6104,
    name: 'Derivex',
    symbol: 'DVX',
  },
  {
    id: 6105,
    name: 'HAPY Coin',
    symbol: 'HAPY',
  },
  {
    id: 6107,
    name: 'Eight Hours',
    symbol: 'EHRT',
  },
  {
    id: 6110,
    name: 'KYSC Token',
    symbol: 'KYSC',
  },
  {
    id: 6111,
    name: 'Ecoin',
    symbol: 'ECOIN',
  },
  {
    id: 6113,
    name: 'BlackPearl Token',
    symbol: 'BPLC',
  },
  {
    id: 6116,
    name: 'megaBONK',
    symbol: 'MBONK',
  },
  {
    id: 6118,
    name: 'BitoPro Exchange Token',
    symbol: 'BITO',
  },
  {
    id: 6120,
    name: 'Anchor Neural World',
    symbol: 'ANW',
  },
  {
    id: 6126,
    name: 'BTC Network Demand Set II',
    symbol: 'BYTE',
  },
  {
    id: 6129,
    name: 'ETH 20 Day MA Crossover Set',
    symbol: 'ETH20SMACO',
  },
  {
    id: 6130,
    name: 'ETH 20 Day MA Crossover Yield Set',
    symbol: 'ETHMACOAPY',
  },
  {
    id: 6131,
    name: 'ZYX',
    symbol: 'ZYX',
  },
  {
    id: 6138,
    name: 'DIA',
    symbol: 'DIA',
  },
  {
    id: 6139,
    name: 'ETH/BTC RSI Ratio Trading Set',
    symbol: 'ETHBTCRSI',
  },
  {
    id: 6140,
    name: 'ETH/LINK Price Action Candlestick Set',
    symbol: 'LINKETHPA',
  },
  {
    id: 6141,
    name: 'ETH Price Action Candlestick Set',
    symbol: 'ETHPA',
  },
  {
    id: 6143,
    name: 'ETH RSI 60/40 Crossover Set',
    symbol: 'ETHRSI6040',
  },
  {
    id: 6144,
    name: 'ETH RSI 60/40 Yield Set',
    symbol: 'ETHRSIAPY',
  },
  {
    id: 6145,
    name: 'yffi finance',
    symbol: 'YFFI',
  },
  {
    id: 6155,
    name: 'Intelligent Ratio Set',
    symbol: 'INTRATIO',
  },
  {
    id: 6156,
    name: 'Donut',
    symbol: 'DONUT',
  },
  {
    id: 6158,
    name: 'LINK/ETH RSI Ratio Trading Set',
    symbol: 'LINKETHRSI',
  },
  {
    id: 6159,
    name: 'LINK Profit Taker Set',
    symbol: 'LINKPT',
  },
  {
    id: 6169,
    name: 'JUIICE',
    symbol: 'JUI',
  },
  {
    id: 6176,
    name: 'Modern Investment Coin',
    symbol: 'MODIC',
  },
  {
    id: 6179,
    name: 'SeChain',
    symbol: 'SNN',
  },
  {
    id: 6180,
    name: 'SUKU',
    symbol: 'SUKU',
  },
  {
    id: 6187,
    name: 'Serum',
    symbol: 'SRM',
  },
  {
    id: 6190,
    name: 'sLINK',
    symbol: 'sLINK',
  },
  {
    id: 6193,
    name: 'Cream Finance',
    symbol: 'CREAM',
  },
  {
    id: 6194,
    name: 'Geeq',
    symbol: 'GEEQ',
  },
  {
    id: 6195,
    name: 'Unitrade',
    symbol: 'TRADE',
  },
  {
    id: 6209,
    name: 'Spheroid Universe',
    symbol: 'SPH',
  },
  {
    id: 6210,
    name: 'The Sandbox',
    symbol: 'SAND',
  },
  {
    id: 6211,
    name: 'Dionpay',
    symbol: 'DION',
  },
  {
    id: 6213,
    name: 'Global AEX Token',
    symbol: 'GAT',
  },
  {
    id: 6216,
    name: 'AXEL',
    symbol: 'AXEL',
  },
  {
    id: 6217,
    name: 'TokenBacon',
    symbol: 'BAK',
  },
  {
    id: 6218,
    name: 'Arcona',
    symbol: 'ARCONA',
  },
  {
    id: 6219,
    name: 'Dice',
    symbol: 'DICE',
  },
  {
    id: 6224,
    name: 'Bityuan',
    symbol: 'BTY',
  },
  {
    id: 6225,
    name: 'Blockchain Exchange Alliance',
    symbol: 'BXA',
  },
  {
    id: 6230,
    name: 'Diamond Voucher',
    symbol: 'DVS',
  },
  {
    id: 6236,
    name: 'Offshift',
    symbol: 'XFT',
  },
  {
    id: 6237,
    name: 'MDsquare',
    symbol: 'TMED',
  },
  {
    id: 6238,
    name: '3X Long Tether Gold Token',
    symbol: 'XAUTBULL',
  },
  {
    id: 6240,
    name: '3X Short Tether Gold Token',
    symbol: 'XAUTBEAR',
  },
  {
    id: 6243,
    name: 'DeFiPie',
    symbol: 'PIE',
  },
  {
    id: 6245,
    name: 'SocialGood',
    symbol: 'SG',
  },
  {
    id: 6246,
    name: 'YAS',
    symbol: 'YAS',
  },
  {
    id: 6247,
    name: 'Yield Farming Token',
    symbol: 'YFT',
  },
  {
    id: 6248,
    name: 'Coalculus',
    symbol: 'COAL',
  },
  {
    id: 6249,
    name: 'Ziktalk',
    symbol: 'ZIK',
  },
  {
    id: 6253,
    name: 'PHILLIPS PAY COIN',
    symbol: 'PPC',
  },
  {
    id: 6256,
    name: 'SHENG',
    symbol: 'SHENG',
  },
  {
    id: 6257,
    name: 'Berry',
    symbol: 'BERRY',
  },
  {
    id: 6261,
    name: 'hybrix',
    symbol: 'HY',
  },
  {
    id: 6262,
    name: 'Jubi Token',
    symbol: 'JT',
  },
  {
    id: 6264,
    name: 'Dark Energy Crystals',
    symbol: 'DEC',
  },
  {
    id: 6265,
    name: 'Play Royal',
    symbol: 'PLAY',
  },
  {
    id: 6266,
    name: 'SCC DIGforIT',
    symbol: 'SCC',
  },
  {
    id: 6283,
    name: 'Blocery',
    symbol: 'BLY',
  },
  {
    id: 6297,
    name: 'Proof Of Liquidity',
    symbol: 'POL',
  },
  {
    id: 6312,
    name: '1X Short BNB Token',
    symbol: 'BNBHEDGE',
  },
  {
    id: 6320,
    name: '1X Short Dogecoin Token',
    symbol: 'DOGEHEDGE',
  },
  {
    id: 6323,
    name: 'LinkCoin Token',
    symbol: 'LKN',
  },
  {
    id: 6326,
    name: 'X-Block',
    symbol: 'IX',
  },
  {
    id: 6330,
    name: 'TUNE TOKEN',
    symbol: 'TUNE',
  },
  {
    id: 6342,
    name: '1X Short XRP Token',
    symbol: 'XRPHEDGE',
  },
  {
    id: 6346,
    name: '3X Long DeFi Index Token',
    symbol: 'DEFIBULL',
  },
  {
    id: 6352,
    name: '3X Long Theta Network Token',
    symbol: 'THETABULL',
  },
  {
    id: 6353,
    name: '3X Long VeChain Token',
    symbol: 'VETBULL',
  },
  {
    id: 6369,
    name: 'Maxonrow',
    symbol: 'MXW',
  },
  {
    id: 6370,
    name: 'Terra SDT',
    symbol: 'SDT',
  },
  {
    id: 6375,
    name: 'ASTA',
    symbol: 'ASTA',
  },
  {
    id: 6376,
    name: 'AVCCOIN',
    symbol: 'AVC',
  },
  {
    id: 6388,
    name: 'BPOP',
    symbol: 'BPOP',
  },
  {
    id: 6391,
    name: 'BSYS',
    symbol: 'BSYS',
  },
  {
    id: 6392,
    name: 'BTS Chain',
    symbol: 'BTSC',
  },
  {
    id: 6393,
    name: 'Bytus',
    symbol: 'BYTS',
  },
  {
    id: 6395,
    name: 'Cherry Token',
    symbol: 'YT',
  },
  {
    id: 6397,
    name: 'Coinzo Token',
    symbol: 'CNZ',
  },
  {
    id: 6404,
    name: 'AGA Token',
    symbol: 'AGA',
  },
  {
    id: 6405,
    name: 'MiniSwap',
    symbol: 'MINI',
  },
  {
    id: 6406,
    name: 'sBTC',
    symbol: 'sBTC',
  },
  {
    id: 6407,
    name: 'YF Link',
    symbol: 'YFL',
  },
  {
    id: 6409,
    name: 'Ethverse',
    symbol: 'ETHV',
  },
  {
    id: 6410,
    name: 'Feellike',
    symbol: 'FLL',
  },
  {
    id: 6414,
    name: 'DTOP Token',
    symbol: 'DTOP',
  },
  {
    id: 6416,
    name: 'Dcoin Token',
    symbol: 'DT',
  },
  {
    id: 6422,
    name: 'Dogz',
    symbol: 'DOGZ',
  },
  {
    id: 6423,
    name: 'Dragonbit',
    symbol: 'DRGB',
  },
  {
    id: 6426,
    name: 'DSYS',
    symbol: 'DSYS',
  },
  {
    id: 6427,
    name: 'EA Token',
    symbol: 'EA',
  },
  {
    id: 6430,
    name: 'Electric Vehicle Zone',
    symbol: 'EVZ',
  },
  {
    id: 6432,
    name: 'ECOMI',
    symbol: 'OMI',
  },
  {
    id: 6435,
    name: 'Eska',
    symbol: 'ESK',
  },
  {
    id: 6436,
    name: 'Empow',
    symbol: 'EM',
  },
  {
    id: 6437,
    name: 'ethArt',
    symbol: 'ARTE',
  },
  {
    id: 6442,
    name: 'FANBI TOKEN',
    symbol: 'FBT',
  },
  {
    id: 6444,
    name: 'FANZY',
    symbol: 'FX1',
  },
  {
    id: 6446,
    name: 'Fashion Coin',
    symbol: 'FSHN',
  },
  {
    id: 6447,
    name: 'Fisco Coin',
    symbol: 'FSCC',
  },
  {
    id: 6448,
    name: 'Force For Fast',
    symbol: 'FFF',
  },
  {
    id: 6450,
    name: 'Gbrick',
    symbol: 'GBX',
  },
  {
    id: 6457,
    name: 'GLOBALTRUSTFUND TOKEN',
    symbol: 'GTF',
  },
  {
    id: 6463,
    name: 'Prepayway',
    symbol: 'InBit',
  },
  {
    id: 6464,
    name: 'Heart Number',
    symbol: 'HTN',
  },
  {
    id: 6468,
    name: 'PeerEx',
    symbol: 'PERX',
  },
  {
    id: 6470,
    name: 'Hiblocks',
    symbol: 'HIBS',
  },
  {
    id: 6473,
    name: 'IDCM Token',
    symbol: 'IT',
  },
  {
    id: 6475,
    name: 'Infinite Ricks',
    symbol: 'RICK',
  },
  {
    id: 6477,
    name: 'FXPay',
    symbol: 'FXP',
  },
  {
    id: 6482,
    name: 'Jur',
    symbol: 'JUR',
  },
  {
    id: 6483,
    name: 'JUST NETWORK',
    symbol: 'JUS',
  },
  {
    id: 6487,
    name: 'Kevacoin',
    symbol: 'KVA',
  },
  {
    id: 6490,
    name: 'ITAM Games',
    symbol: 'ITAM',
  },
  {
    id: 6493,
    name: 'KStarCoin',
    symbol: 'KSC',
  },
  {
    id: 6495,
    name: 'LoveHearts',
    symbol: 'LVH',
  },
  {
    id: 6496,
    name: 'Portal',
    symbol: 'PORTAL',
  },
  {
    id: 6498,
    name: 'Metacoin',
    symbol: 'MTC',
  },
  {
    id: 6500,
    name: 'ThreeFold',
    symbol: 'TFT',
  },
  {
    id: 6501,
    name: 'TRONbetDice',
    symbol: 'DICE',
  },
  {
    id: 6502,
    name: 'CBDAO',
    symbol: 'BREE',
  },
  {
    id: 6503,
    name: 'RMPL',
    symbol: 'RMPL',
  },
  {
    id: 6506,
    name: 'Halving Token',
    symbol: 'HALV',
  },
  {
    id: 6507,
    name: 'Kulupu',
    symbol: 'KLP',
  },
  {
    id: 6508,
    name: 'TronEuropeRewardCoin',
    symbol: 'TERC',
  },
  {
    id: 6511,
    name: 'Strong',
    symbol: 'STRONG',
  },
  {
    id: 6519,
    name: 'Aludra Network',
    symbol: 'ALD',
  },
  {
    id: 6520,
    name: 'HOPR',
    symbol: 'HOPR',
  },
  {
    id: 6524,
    name: 'Ndau',
    symbol: 'NDAU',
  },
  {
    id: 6525,
    name: 'UniversalEnergyChain',
    symbol: 'UENC',
  },
  {
    id: 6527,
    name: 'Ludos Protocol',
    symbol: 'LUD',
  },
  {
    id: 6528,
    name: 'Ripple Alpha',
    symbol: 'XLA',
  },
  {
    id: 6529,
    name: 'NanTrade',
    symbol: 'NAN',
  },
  {
    id: 6531,
    name: 'ROONEX',
    symbol: 'RNX',
  },
  {
    id: 6532,
    name: 'Mandi Token',
    symbol: 'MANDI',
  },
  {
    id: 6533,
    name: 'SmartX',
    symbol: 'SAT',
  },
  {
    id: 6535,
    name: 'NEAR Protocol',
    symbol: 'NEAR',
  },
  {
    id: 6536,
    name: 'MANTRA DAO',
    symbol: 'OM',
  },
  {
    id: 6537,
    name: 'RioDeFi',
    symbol: 'RFUEL',
  },
  {
    id: 6538,
    name: 'Curve DAO Token',
    symbol: 'CRV',
  },
  {
    id: 6539,
    name: 'YAM V1',
    symbol: 'YAM',
  },
  {
    id: 6540,
    name: 'Showcase',
    symbol: 'SHO',
  },
  {
    id: 6541,
    name: 'Relevant',
    symbol: 'REL',
  },
  {
    id: 6542,
    name: 'happy birthday coin',
    symbol: 'HBDC',
  },
  {
    id: 6543,
    name: 'Barter',
    symbol: 'BRTR',
  },
  {
    id: 6548,
    name: 'Web Coin Pay',
    symbol: 'WEC',
  },
  {
    id: 6552,
    name: 'Waifu Token',
    symbol: 'WAIF',
  },
  {
    id: 6554,
    name: 'GamerCoin',
    symbol: 'GHX',
  },
  {
    id: 6556,
    name: 'MONEY PARTY',
    symbol: 'PARTY',
  },
  {
    id: 6558,
    name: 'Xrpalike Gene',
    symbol: 'XAG',
  },
  {
    id: 6559,
    name: 'ORBYT Token',
    symbol: 'ORBYT',
  },
  {
    id: 6562,
    name: 'VIG',
    symbol: 'VIG',
  },
  {
    id: 6564,
    name: 'ZenSports',
    symbol: 'SPORTS',
  },
  {
    id: 6565,
    name: 'TideBit Token',
    symbol: 'TBT',
  },
  {
    id: 6566,
    name: 'Meridian Network',
    symbol: 'LOCK',
  },
  {
    id: 6567,
    name: 'OWL',
    symbol: 'OWL',
  },
  {
    id: 6572,
    name: 'Equus Mining Token',
    symbol: 'EQMT',
  },
  {
    id: 6583,
    name: 'Multiplier',
    symbol: 'MXX',
  },
  {
    id: 6584,
    name: 'WingShop',
    symbol: 'WING',
  },
  {
    id: 6586,
    name: 'Bintex Futures',
    symbol: 'BNTX',
  },
  {
    id: 6588,
    name: 'Etherisc DIP Token',
    symbol: 'DIP',
  },
  {
    id: 6592,
    name: 'BarterTrade',
    symbol: 'BART',
  },
  {
    id: 6593,
    name: 'Bitgear',
    symbol: 'GEAR',
  },
  {
    id: 6594,
    name: 'MYX Network',
    symbol: 'MYX',
  },
  {
    id: 6597,
    name: 'Degenerator Meme',
    symbol: 'MEME',
  },
  {
    id: 6598,
    name: 'Aureus Nummus Gold',
    symbol: 'ANG',
  },
  {
    id: 6600,
    name: 'Bitalgo',
    symbol: 'ALG',
  },
  {
    id: 6602,
    name: 'XFUEL',
    symbol: 'XFUEL',
  },
  {
    id: 6607,
    name: 'MixTrust',
    symbol: 'MXT',
  },
  {
    id: 6609,
    name: 'Decentrahub Coin',
    symbol: 'DCNTR',
  },
  {
    id: 6610,
    name: 'Defis Network',
    symbol: 'DFS',
  },
  {
    id: 6611,
    name: 'DuckDaoDime',
    symbol: 'DDIM',
  },
  {
    id: 6612,
    name: 'Fera',
    symbol: 'FERA',
  },
  {
    id: 6615,
    name: 'Love Coin',
    symbol: 'LOVE',
  },
  {
    id: 6617,
    name: 'Ethereum Vault',
    symbol: 'ETHV',
  },
  {
    id: 6621,
    name: 'Keysians Network',
    symbol: 'KEN',
  },
  {
    id: 6622,
    name: 'Hakka.Finance',
    symbol: 'HAKKA',
  },
  {
    id: 6623,
    name: 'DOGEFI',
    symbol: 'DOGEFI',
  },
  {
    id: 6624,
    name: 'Golden Ratio Coin',
    symbol: 'GOLDR',
  },
  {
    id: 6625,
    name: 'Innovation Blockchain Payment',
    symbol: 'IBP',
  },
  {
    id: 6626,
    name: 'SPACE-iZ',
    symbol: 'SPIZ',
  },
  {
    id: 6627,
    name: 'Meter Stable',
    symbol: 'MTR',
  },
  {
    id: 6628,
    name: 'Meter Governance mapped by Meter.io',
    symbol: 'eMTRG',
  },
  {
    id: 6636,
    name: 'Polkadot',
    symbol: 'DOT',
  },
  {
    id: 6638,
    name: 'UniLayer',
    symbol: 'LAYER',
  },
  {
    id: 6641,
    name: 'AhaToken',
    symbol: 'AHT',
  },
  {
    id: 6645,
    name: 'COIL',
    symbol: 'COIL',
  },
  {
    id: 6649,
    name: 'Cat Token',
    symbol: 'CAT',
  },
  {
    id: 6650,
    name: 'NFT',
    symbol: 'NFT',
  },
  {
    id: 6651,
    name: 'USDX [Kava]',
    symbol: 'USDX',
  },
  {
    id: 6653,
    name: 'FolgoryUSD',
    symbol: 'USDF',
  },
  {
    id: 6654,
    name: 'Crypto Price Index',
    symbol: 'CPI',
  },
  {
    id: 6655,
    name: 'Krosscoin',
    symbol: 'KSS',
  },
  {
    id: 6657,
    name: 'YAM V2',
    symbol: 'YAMV2',
  },
  {
    id: 6664,
    name: 'GRAP',
    symbol: 'GRAP',
  },
  {
    id: 6665,
    name: 'LGCY Network',
    symbol: 'LGCY',
  },
  {
    id: 6667,
    name: 'Xiotri',
    symbol: 'XIOT',
  },
  {
    id: 6668,
    name: 'PROXI',
    symbol: 'CREDIT',
  },
  {
    id: 6669,
    name: 'PowerPool',
    symbol: 'CVP',
  },
  {
    id: 6670,
    name: 'Axis DeFi',
    symbol: 'AXIS',
  },
  {
    id: 6672,
    name: 'DeFi Omega',
    symbol: 'DFIO',
  },
  {
    id: 6674,
    name: 'Fyooz',
    symbol: 'FYZ',
  },
  {
    id: 6675,
    name: 'MIKS COIN',
    symbol: 'MIKS',
  },
  {
    id: 6679,
    name: 'WHALE',
    symbol: 'WHALE',
  },
  {
    id: 6680,
    name: 'Digex',
    symbol: 'DIGEX',
  },
  {
    id: 6682,
    name: 'Pollux Coin',
    symbol: 'POX',
  },
  {
    id: 6684,
    name: 'Dextoken',
    symbol: 'DEXG',
  },
  {
    id: 6686,
    name: 'yVault LP-yCurve',
    symbol: 'yVault LP-yCurve(YYCRV)',
  },
  {
    id: 6689,
    name: 'DegenVC',
    symbol: 'DGVC',
  },
  {
    id: 6692,
    name: 'MORK',
    symbol: 'MORK',
  },
  {
    id: 6693,
    name: 'OC Protocol',
    symbol: 'OCP',
  },
  {
    id: 6696,
    name: 'The Hash Speed',
    symbol: 'THS',
  },
  {
    id: 6697,
    name: 'TriipMiles',
    symbol: 'TIIM',
  },
  {
    id: 6700,
    name: 'Libera',
    symbol: 'LIB',
  },
  {
    id: 6701,
    name: 'Burency',
    symbol: 'BUY',
  },
  {
    id: 6703,
    name: 'CAT.trade Protocol',
    symbol: 'CATX',
  },
  {
    id: 6704,
    name: 'JBOX',
    symbol: 'JBX',
  },
  {
    id: 6705,
    name: 'Lien',
    symbol: 'LIEN',
  },
  {
    id: 6708,
    name: 'YFIEXCHANGE.FINANCE',
    symbol: 'YFIE',
  },
  {
    id: 6709,
    name: 'Vidya',
    symbol: 'VIDYA',
  },
  {
    id: 6711,
    name: 'Mazzuma',
    symbol: 'MAZ',
  },
  {
    id: 6714,
    name: 'Libfx',
    symbol: 'LIBFX',
  },
  {
    id: 6715,
    name: 'Sperax',
    symbol: 'SPA',
  },
  {
    id: 6718,
    name: 'Growth DeFi',
    symbol: 'GRO',
  },
  {
    id: 6719,
    name: 'The Graph',
    symbol: 'GRT',
  },
  {
    id: 6722,
    name: 'Dextrust',
    symbol: 'DETS',
  },
  {
    id: 6724,
    name: 'Klever',
    symbol: 'KLV',
  },
  {
    id: 6726,
    name: 'YUSRA',
    symbol: 'YUSRA',
  },
  {
    id: 6727,
    name: 'Reserve',
    symbol: 'RSV',
  },
  {
    id: 6731,
    name: 'Tokamak Network',
    symbol: 'TON',
  },
  {
    id: 6732,
    name: 'DEONEX COIN',
    symbol: 'DON',
  },
  {
    id: 6734,
    name: 'Vision',
    symbol: 'VSN',
  },
  {
    id: 6735,
    name: 'Nexalt',
    symbol: 'XLT',
  },
  {
    id: 6738,
    name: 'Quantbook',
    symbol: 'QTBK',
  },
  {
    id: 6739,
    name: 'ONBUFF',
    symbol: 'ONIT',
  },
  {
    id: 6742,
    name: 'DxSale Network',
    symbol: 'SALE',
  },
  {
    id: 6743,
    name: 'Falconswap',
    symbol: 'FSW',
  },
  {
    id: 6744,
    name: 'Chain Games',
    symbol: 'CHAIN',
  },
  {
    id: 6745,
    name: 'CEDARS',
    symbol: 'CEDS',
  },
  {
    id: 6747,
    name: 'Crust Network',
    symbol: 'CRU',
  },
  {
    id: 6748,
    name: 'Centrifuge',
    symbol: 'CFG',
  },
  {
    id: 6754,
    name: 'Polkaswap',
    symbol: 'PSWAP',
  },
  {
    id: 6758,
    name: 'SushiSwap',
    symbol: 'SUSHI',
  },
  {
    id: 6760,
    name: 'Easticoin',
    symbol: 'ESTI',
  },
  {
    id: 6761,
    name: 'ReFork',
    symbol: 'EFK',
  },
  {
    id: 6765,
    name: 'ESR Coin',
    symbol: 'ESRC',
  },
  {
    id: 6766,
    name: 'Satopay Network',
    symbol: 'STOP',
  },
  {
    id: 6771,
    name: 'DataHighway',
    symbol: 'DHX',
  },
  {
    id: 6773,
    name: 'FUTUREXCRYPTO',
    symbol: 'FXC',
  },
  {
    id: 6775,
    name: 'Dipper Network',
    symbol: 'DIP',
  },
  {
    id: 6783,
    name: 'Axie Infinity',
    symbol: 'AXS',
  },
  {
    id: 6789,
    name: 'Blockchain Cuties Universe Governance',
    symbol: 'BCUG',
  },
  {
    id: 6796,
    name: 'DeFi of Thrones',
    symbol: 'DOTX',
  },
  {
    id: 6799,
    name: 'Swapfolio',
    symbol: 'SWFL',
  },
  {
    id: 6801,
    name: 'TriumphX',
    symbol: 'TRIX',
  },
  {
    id: 6803,
    name: 'ATTN',
    symbol: 'ATTN',
  },
  {
    id: 6804,
    name: 'MiraQle',
    symbol: 'MQL',
  },
  {
    id: 6807,
    name: 'YFISCURITY',
    symbol: 'YFIS',
  },
  {
    id: 6809,
    name: 'GolderGames',
    symbol: 'GLDR',
  },
  {
    id: 6810,
    name: 'CYCLUB',
    symbol: 'CYCLUB',
  },
  {
    id: 6811,
    name: 'Fee Active Collateral Token',
    symbol: 'FACT',
  },
  {
    id: 6812,
    name: 'YFIVE FINANCE',
    symbol: 'YFIVE',
  },
  {
    id: 6814,
    name: 'AmazonasCoin',
    symbol: 'AMZ',
  },
  {
    id: 6821,
    name: 'Bast',
    symbol: 'BAST',
  },
  {
    id: 6822,
    name: 'DistX',
    symbol: 'DISTX',
  },
  {
    id: 6823,
    name: 'Semitoken',
    symbol: 'SEMI',
  },
  {
    id: 6824,
    name: 'Epanus',
    symbol: 'EPS',
  },
  {
    id: 6829,
    name: 'Pearl',
    symbol: 'PEARL',
  },
  {
    id: 6833,
    name: 'Litentry',
    symbol: 'LIT',
  },
  {
    id: 6839,
    name: 'KIMCHI.finance',
    symbol: 'KIMCHI',
  },
  {
    id: 6841,
    name: 'Phala Network',
    symbol: 'PHA',
  },
  {
    id: 6843,
    name: 'Radicle',
    symbol: 'RAD',
  },
  {
    id: 6848,
    name: 'Walnut.finance',
    symbol: 'WTF',
  },
  {
    id: 6849,
    name: 'Pylon Finance',
    symbol: 'PYLON',
  },
  {
    id: 6850,
    name: 'DeFiat',
    symbol: 'DFT',
  },
  {
    id: 6851,
    name: 'GrafSound',
    symbol: 'GSMT',
  },
  {
    id: 6852,
    name: 'Akropolis Delphi',
    symbol: 'ADEL',
  },
  {
    id: 6855,
    name: 'BIDR',
    symbol: 'BIDR',
  },
  {
    id: 6857,
    name: 'DeFi Bids',
    symbol: 'BID',
  },
  {
    id: 6859,
    name: 'Harvest Finance',
    symbol: 'FARM',
  },
  {
    id: 6861,
    name: 'ChartEx',
    symbol: 'CHART',
  },
  {
    id: 6862,
    name: 'Boosted Finance',
    symbol: 'BOOST',
  },
  {
    id: 6863,
    name: 'YFFS Finance',
    symbol: 'YFFS',
  },
  {
    id: 6865,
    name: 'Crypton',
    symbol: 'CRP',
  },
  {
    id: 6866,
    name: 'TAI',
    symbol: 'TAI',
  },
  {
    id: 6867,
    name: 'STABLE ASSET',
    symbol: 'STA',
  },
  {
    id: 6868,
    name: 'Seigniorage Shares',
    symbol: 'SHARE',
  },
  {
    id: 6869,
    name: 'BLOCKMAX',
    symbol: 'OCB',
  },
  {
    id: 6870,
    name: 'OIN Finance',
    symbol: 'OIN',
  },
  {
    id: 6872,
    name: 'Carrot',
    symbol: 'CRT',
  },
  {
    id: 6873,
    name: 'ARCx (old)',
    symbol: 'ARC',
  },
  {
    id: 6874,
    name: 'SalmonSwap',
    symbol: 'SAL',
  },
  {
    id: 6881,
    name: 'DefiDollar',
    symbol: 'DUSD',
  },
  {
    id: 6882,
    name: 'ExNetwork Token',
    symbol: 'EXNT',
  },
  {
    id: 6883,
    name: 'KittenFinance',
    symbol: 'KIF',
  },
  {
    id: 6886,
    name: 'yfBeta',
    symbol: 'YFBETA',
  },
  {
    id: 6887,
    name: 'Uniris',
    symbol: 'UCO',
  },
  {
    id: 6888,
    name: 'Omega Protocol Money',
    symbol: 'OPM',
  },
  {
    id: 6889,
    name: 'TRONbetLive',
    symbol: 'LIVE',
  },
  {
    id: 6890,
    name: 'TON Token',
    symbol: 'TON',
  },
  {
    id: 6891,
    name: 'Niftyx Protocol',
    symbol: 'SHROOM',
  },
  {
    id: 6892,
    name: 'Elrond',
    symbol: 'EGLD',
  },
  {
    id: 6894,
    name: 'AstroTools',
    symbol: 'ASTRO',
  },
  {
    id: 6896,
    name: 'CORN',
    symbol: 'CORN',
  },
  {
    id: 6898,
    name: 'JackPool.finance',
    symbol: 'JFI',
  },
  {
    id: 6901,
    name: 'Swerve',
    symbol: 'SWRV',
  },
  {
    id: 6905,
    name: 'Upper Euro',
    symbol: 'EURU',
  },
  {
    id: 6906,
    name: 'Upper Pound',
    symbol: 'GBPU',
  },
  {
    id: 6907,
    name: 'Upper Dollar',
    symbol: 'USDU',
  },
  {
    id: 6909,
    name: 'YFA Finance',
    symbol: 'YFA',
  },
  {
    id: 6911,
    name: 'BNSD Finance',
    symbol: 'BNSD',
  },
  {
    id: 6912,
    name: 'Yield Stake Finance',
    symbol: 'YI12',
  },
  {
    id: 6914,
    name: 'junca Cash',
    symbol: 'JCC',
  },
  {
    id: 6916,
    name: 'The Forms',
    symbol: 'FRMS',
  },
  {
    id: 6918,
    name: 'Foresight',
    symbol: 'FORS',
  },
  {
    id: 6919,
    name: 'Definitex',
    symbol: 'DFX',
  },
  {
    id: 6920,
    name: 'Coin Artist',
    symbol: 'COIN',
  },
  {
    id: 6928,
    name: 'Bella Protocol',
    symbol: 'BEL',
  },
  {
    id: 6929,
    name: 'Hegic',
    symbol: 'HEGIC',
  },
  {
    id: 6930,
    name: 'Kira Network',
    symbol: 'KEX',
  },
  {
    id: 6931,
    name: 'Token CashPay',
    symbol: 'TCP',
  },
  {
    id: 6933,
    name: 'Nuco.cloud',
    symbol: 'NCDT',
  },
  {
    id: 6934,
    name: 'BEAR Coin',
    symbol: 'BEAR',
  },
  {
    id: 6935,
    name: 'Fiscus.fyi',
    symbol: 'FFYI',
  },
  {
    id: 6938,
    name: 'YFDAI.FINANCE',
    symbol: 'YF-DAI',
  },
  {
    id: 6940,
    name: 'Lead Wallet',
    symbol: 'LEAD',
  },
  {
    id: 6941,
    name: 'Huobi BTC',
    symbol: 'HBTC',
  },
  {
    id: 6942,
    name: 'Juggernaut',
    symbol: 'JGN',
  },
  {
    id: 6943,
    name: 'Baguette Token',
    symbol: 'BGTT',
  },
  {
    id: 6944,
    name: 'MilliMeter',
    symbol: 'MM',
  },
  {
    id: 6945,
    name: 'Amp',
    symbol: 'AMP',
  },
  {
    id: 6947,
    name: 'Valobit',
    symbol: 'VBIT',
  },
  {
    id: 6949,
    name: 'Hedget',
    symbol: 'HGET',
  },
  {
    id: 6950,
    name: 'Perpetual Protocol',
    symbol: 'PERP',
  },
  {
    id: 6951,
    name: 'Reef',
    symbol: 'REEF',
  },
  {
    id: 6952,
    name: 'Frax',
    symbol: 'FRAX',
  },
  {
    id: 6953,
    name: 'Frax Share',
    symbol: 'FXS',
  },
  {
    id: 6956,
    name: 'BUILD Finance',
    symbol: 'BUILD',
  },
  {
    id: 6957,
    name: 'AllianceBlock',
    symbol: 'ALBT',
  },
  {
    id: 6958,
    name: 'Alchemy Pay',
    symbol: 'ACH',
  },
  {
    id: 6960,
    name: 'DefiBox',
    symbol: 'BOX',
  },
  {
    id: 6963,
    name: 'DMD',
    symbol: 'DMD',
  },
  {
    id: 6964,
    name: 'YFIKING FINANCE',
    symbol: 'YFIKING',
  },
  {
    id: 6965,
    name: 'HBTC Captain Token',
    symbol: 'HBC',
  },
  {
    id: 6966,
    name: 'i9 Coin',
    symbol: 'I9C',
  },
  {
    id: 6970,
    name: 'OpenAlexa Protocol',
    symbol: 'OAP',
  },
  {
    id: 6971,
    name: 'Predix Network',
    symbol: 'PRDX',
  },
  {
    id: 6974,
    name: 'Yeld Finance',
    symbol: 'YELD',
  },
  {
    id: 6975,
    name: 'YFFII Finance',
    symbol: 'YFFII',
  },
  {
    id: 6976,
    name: 'French Digital Reserve',
    symbol: 'FDR',
  },
  {
    id: 6978,
    name: 'Candela Coin',
    symbol: 'CLA',
  },
  {
    id: 6980,
    name: 'AladiEx',
    symbol: 'ALA',
  },
  {
    id: 6981,
    name: 'New Year Bull',
    symbol: 'NYB',
  },
  {
    id: 6982,
    name: 'OBIC',
    symbol: 'OBIC',
  },
  {
    id: 6983,
    name: 'DOOS TOKEN',
    symbol: 'DOOS',
  },
  {
    id: 6984,
    name: 'FINANCIAL INVESTMENT TOKEN',
    symbol: 'FIT',
  },
  {
    id: 6986,
    name: 'Squirrel Finance',
    symbol: 'NUTS',
  },
  {
    id: 6989,
    name: 'Zeedex',
    symbol: 'ZDEX',
  },
  {
    id: 6991,
    name: 'Sashimi',
    symbol: 'SASHIMI',
  },
  {
    id: 6992,
    name: 'Spartan Protocol',
    symbol: 'SPARTA',
  },
  {
    id: 6993,
    name: 'REVV',
    symbol: 'REVV',
  },
  {
    id: 6997,
    name: 'SakeToken',
    symbol: 'SAKE',
  },
  {
    id: 6998,
    name: 'YOKcoin',
    symbol: 'YOK',
  },
  {
    id: 7000,
    name: 'EOSDOWN',
    symbol: 'EOSDOWN',
  },
  {
    id: 7001,
    name: 'XRPUP',
    symbol: 'XRPUP',
  },
  {
    id: 7002,
    name: 'XRPDOWN',
    symbol: 'XRPDOWN',
  },
  {
    id: 7003,
    name: 'DOTUP',
    symbol: 'DOTUP',
  },
  {
    id: 7004,
    name: 'TRXDOWN',
    symbol: 'TRXDOWN',
  },
  {
    id: 7005,
    name: 'TRXUP',
    symbol: 'TRXUP',
  },
  {
    id: 7006,
    name: 'DOTDOWN',
    symbol: 'DOTDOWN',
  },
  {
    id: 7007,
    name: 'XTZUP',
    symbol: 'XTZUP',
  },
  {
    id: 7008,
    name: 'XTZDOWN',
    symbol: 'XTZDOWN',
  },
  {
    id: 7009,
    name: 'BNBUP',
    symbol: 'BNBUP',
  },
  {
    id: 7010,
    name: 'BNBDOWN',
    symbol: 'BNBDOWN',
  },
  {
    id: 7011,
    name: 'LINKUP',
    symbol: 'LINKUP',
  },
  {
    id: 7012,
    name: 'LINKDOWN',
    symbol: 'LINKDOWN',
  },
  {
    id: 7013,
    name: 'ADAUP',
    symbol: 'ADAUP',
  },
  {
    id: 7014,
    name: 'ADADOWN',
    symbol: 'ADADOWN',
  },
  {
    id: 7016,
    name: 'ETHUP',
    symbol: 'ETHUP',
  },
  {
    id: 7017,
    name: 'MoonSwap',
    symbol: 'MOON',
  },
  {
    id: 7020,
    name: 'Nyan Finance',
    symbol: 'NYAN',
  },
  {
    id: 7021,
    name: 'OFIN Token',
    symbol: 'ON',
  },
  {
    id: 7022,
    name: 'Pickle Finance',
    symbol: 'PICKLE',
  },
  {
    id: 7024,
    name: 'Tixl',
    symbol: 'TXL',
  },
  {
    id: 7030,
    name: 'Betherchip',
    symbol: 'BEC',
  },
  {
    id: 7031,
    name: 'CHADS VC',
    symbol: 'CHADS',
  },
  {
    id: 7033,
    name: 'Empty Set Dollar',
    symbol: 'ESD',
  },
  {
    id: 7034,
    name: 'Golff',
    symbol: 'GOF',
  },
  {
    id: 7036,
    name: 'Lottonation',
    symbol: 'LNT',
  },
  {
    id: 7038,
    name: 'Xfinance',
    symbol: 'XFI',
  },
  {
    id: 7039,
    name: 'Ymen.Finance',
    symbol: 'YMEN',
  },
  {
    id: 7040,
    name: 'UpBots',
    symbol: 'UBXT',
  },
  {
    id: 7041,
    name: 'Gather',
    symbol: 'GTH',
  },
  {
    id: 7042,
    name: 'Momentum',
    symbol: 'XMM',
  },
  {
    id: 7043,
    name: 'Pofid Dao',
    symbol: 'PFID',
  },
  {
    id: 7044,
    name: 'Zyro',
    symbol: 'ZYRO',
  },
  {
    id: 7046,
    name: 'Aavegotchi',
    symbol: 'GHST',
  },
  {
    id: 7047,
    name: 'Tribute',
    symbol: 'TRBT',
  },
  {
    id: 7048,
    name: 'Wing Finance',
    symbol: 'WING',
  },
  {
    id: 7049,
    name: 'Etherpay',
    symbol: 'ETHPY',
  },
  {
    id: 7055,
    name: 'DeFi Pulse Index',
    symbol: 'DPI',
  },
  {
    id: 7059,
    name: 'Mobilian Coin',
    symbol: 'MBN',
  },
  {
    id: 7060,
    name: 'Thisoption',
    symbol: 'TONS',
  },
  {
    id: 7061,
    name: 'YFarmLand Token',
    symbol: 'YFARMER',
  },
  {
    id: 7063,
    name: 'Zoom Protocol',
    symbol: 'ZOM',
  },
  {
    id: 7064,
    name: 'BakeryToken',
    symbol: 'BAKE',
  },
  {
    id: 7073,
    name: 'Hybrid Bank Cash',
    symbol: 'HBC',
  },
  {
    id: 7074,
    name: 'Oracolxor',
    symbol: 'XOR',
  },
  {
    id: 7075,
    name: 'P2P',
    symbol: 'P2P',
  },
  {
    id: 7077,
    name: 'UniFi Protocol',
    symbol: 'UP',
  },
  {
    id: 7080,
    name: 'Gala',
    symbol: 'GALA',
  },
  {
    id: 7083,
    name: 'Uniswap',
    symbol: 'UNI',
  },
  {
    id: 7084,
    name: '3X Long Sushi Token',
    symbol: 'SUSHIBULL',
  },
  {
    id: 7085,
    name: '3X Short Sushi Token',
    symbol: 'SUSHIBEAR',
  },
  {
    id: 7087,
    name: 'Dego Finance',
    symbol: 'DEGO',
  },
  {
    id: 7093,
    name: 'YFMoonshot',
    symbol: 'YFMS',
  },
  {
    id: 7094,
    name: 'dHedge DAO',
    symbol: 'DHT',
  },
  {
    id: 7095,
    name: 'Unisocks',
    symbol: 'SOCKS',
  },
  {
    id: 7096,
    name: 'Bridge Oracle',
    symbol: 'BRG',
  },
  {
    id: 7102,
    name: 'Linear',
    symbol: 'LINA',
  },
  {
    id: 7103,
    name: 'Oracle System',
    symbol: 'ORC',
  },
  {
    id: 7105,
    name: 'Permission Coin',
    symbol: 'ASK',
  },
  {
    id: 7109,
    name: 'Hatch DAO',
    symbol: 'HATCH',
  },
  {
    id: 7110,
    name: 'New BitShares',
    symbol: 'NBS',
  },
  {
    id: 7112,
    name: 'Shill & Win',
    symbol: 'PoSH',
  },
  {
    id: 7113,
    name: 'Markaccy',
    symbol: 'MKCY',
  },
  {
    id: 7116,
    name: 'Crypto Accept',
    symbol: 'ACPT',
  },
  {
    id: 7118,
    name: 'Livenodes Token',
    symbol: 'LNOT',
  },
  {
    id: 7121,
    name: 'Samurai',
    symbol: 'SAM',
  },
  {
    id: 7122,
    name: 'UNIFI DeFi',
    symbol: 'UNIFI',
  },
  {
    id: 7126,
    name: 'Giftedhands',
    symbol: 'GHD',
  },
  {
    id: 7127,
    name: 'Velo',
    symbol: 'VELO',
  },
  {
    id: 7129,
    name: 'TerraUSD',
    symbol: 'UST',
  },
  {
    id: 7131,
    name: 'YAM V3',
    symbol: 'YAM',
  },
  {
    id: 7133,
    name: 'Ducato Protocol Token',
    symbol: 'DUCATO',
  },
  {
    id: 7134,
    name: 'Finswap',
    symbol: 'FNSP',
  },
  {
    id: 7135,
    name: 'Kush Finance',
    symbol: 'KSEED',
  },
  {
    id: 7136,
    name: 'OneSwap DAO Token',
    symbol: 'ONES',
  },
  {
    id: 7140,
    name: 'yTSLA Finance',
    symbol: 'yTSLA',
  },
  {
    id: 7141,
    name: 'Axioms',
    symbol: 'AXI',
  },
  {
    id: 7143,
    name: 'DiFy.Finance',
    symbol: 'YFIII',
  },
  {
    id: 7145,
    name: 'Defi Shopping Stake',
    symbol: 'DSS',
  },
  {
    id: 7148,
    name: 'ISTARDUST',
    symbol: 'ISDT',
  },
  {
    id: 7150,
    name: 'Flamingo',
    symbol: 'FLM',
  },
  {
    id: 7154,
    name: 'ITEN',
    symbol: 'ITEN',
  },
  {
    id: 7157,
    name: 'Basid Coin',
    symbol: 'BASID',
  },
  {
    id: 7158,
    name: 'Burger Swap',
    symbol: 'BURGER',
  },
  {
    id: 7159,
    name: 'Digital Currency Daily',
    symbol: 'DCD',
  },
  {
    id: 7161,
    name: 'GokuMarket Credit',
    symbol: 'GMC',
  },
  {
    id: 7162,
    name: 'iCherry Finance',
    symbol: 'ICH',
  },
  {
    id: 7164,
    name: 'Rotten',
    symbol: 'ROT',
  },
  {
    id: 7166,
    name: 'YFIX Finance',
    symbol: 'YFIX',
  },
  {
    id: 7167,
    name: 'Acuity Token',
    symbol: 'ACU',
  },
  {
    id: 7169,
    name: 'Chicken',
    symbol: 'KFC',
  },
  {
    id: 7170,
    name: 'Contribute',
    symbol: 'TRIB',
  },
  {
    id: 7174,
    name: 'Rope',
    symbol: '$ROPE',
  },
  {
    id: 7178,
    name: 'Combine.finance',
    symbol: 'COMB',
  },
  {
    id: 7179,
    name: 'CY Finance',
    symbol: 'CYF',
  },
  {
    id: 7182,
    name: 'BillionHappiness',
    symbol: 'BHC',
  },
  {
    id: 7186,
    name: 'PancakeSwap',
    symbol: 'CAKE',
  },
  {
    id: 7187,
    name: 'S.Finance',
    symbol: 'SFG',
  },
  {
    id: 7189,
    name: 'Origin Dollar',
    symbol: 'OUSD',
  },
  {
    id: 7190,
    name: 'PowerTrade Fuel',
    symbol: 'PTF',
  },
  {
    id: 7191,
    name: 'SwapShip',
    symbol: 'SWSH',
  },
  {
    id: 7192,
    name: 'Wrapped BNB',
    symbol: 'WBNB',
  },
  {
    id: 7193,
    name: 'YFII Gold',
    symbol: 'YFIIG',
  },
  {
    id: 7198,
    name: 'SpokLottery',
    symbol: 'SPKL',
  },
  {
    id: 7199,
    name: 'Ultra Clear',
    symbol: 'UCR',
  },
  {
    id: 7200,
    name: 'Bidao',
    symbol: 'BID',
  },
  {
    id: 7202,
    name: 'OctoFi',
    symbol: 'OCTO',
  },
  {
    id: 7203,
    name: 'Puriever',
    symbol: 'PURE',
  },
  {
    id: 7205,
    name: 'Safari',
    symbol: 'SFR',
  },
  {
    id: 7206,
    name: 'TitanSwap',
    symbol: 'TITAN',
  },
  {
    id: 7208,
    name: 'Polkastarter',
    symbol: 'POLS',
  },
  {
    id: 7211,
    name: 'Antique Zombie Shards',
    symbol: 'ZOMB',
  },
  {
    id: 7212,
    name: 'CellETF',
    symbol: 'ECELL',
  },
  {
    id: 7214,
    name: 'CryptoWater',
    symbol: 'C2O',
  },
  {
    id: 7215,
    name: 'CXN Network',
    symbol: 'CXN',
  },
  {
    id: 7216,
    name: 'LuaSwap',
    symbol: 'LUA',
  },
  {
    id: 7217,
    name: 'Morpher',
    symbol: 'MPH',
  },
  {
    id: 7219,
    name: 'Rubic',
    symbol: 'RBC',
  },
  {
    id: 7221,
    name: 'Wrapped LEO',
    symbol: 'WLEO',
  },
  {
    id: 7222,
    name: 'yAxis',
    symbol: 'YAXIS',
  },
  {
    id: 7223,
    name: 'Dfinance',
    symbol: 'XFI',
  },
  {
    id: 7224,
    name: 'DODO',
    symbol: 'DODO',
  },
  {
    id: 7225,
    name: 'DeFiner',
    symbol: 'FIN',
  },
  {
    id: 7226,
    name: 'Injective Protocol',
    symbol: 'INJ',
  },
  {
    id: 7227,
    name: 'APY.Finance',
    symbol: 'APY',
  },
  {
    id: 7228,
    name: 'DerivaDAO',
    symbol: 'DDX',
  },
  {
    id: 7229,
    name: 'Gelato',
    symbol: 'GEL',
  },
  {
    id: 7230,
    name: 'Opium',
    symbol: 'OPIUM',
  },
  {
    id: 7231,
    name: 'Nsure.Network',
    symbol: 'NSURE',
  },
  {
    id: 7232,
    name: 'Alpha Finance Lab',
    symbol: 'ALPHA',
  },
  {
    id: 7235,
    name: 'Trading Membership Community',
    symbol: 'TMC',
  },
  {
    id: 7236,
    name: 'Celo Dollar',
    symbol: 'CUSD',
  },
  {
    id: 7237,
    name: 'Yearn Finance Bit',
    symbol: 'YFBT',
  },
  {
    id: 7241,
    name: 'AmericanHorror.Finance',
    symbol: 'AHF',
  },
  {
    id: 7242,
    name: 'cVault.finance',
    symbol: 'CORE',
  },
  {
    id: 7243,
    name: 'QChi Chain',
    symbol: 'QHC',
  },
  {
    id: 7244,
    name: 'SaTT',
    symbol: 'SATT',
  },
  {
    id: 7245,
    name: 'Stobox Token',
    symbol: 'STBU',
  },
  {
    id: 7247,
    name: 'Timers',
    symbol: 'IPM',
  },
  {
    id: 7250,
    name: 'YFE Money',
    symbol: 'YFE',
  },
  {
    id: 7254,
    name: 'Metric Exchange',
    symbol: 'METRIC',
  },
  {
    id: 7255,
    name: 'Aitra',
    symbol: 'AITRA',
  },
  {
    id: 7256,
    name: 'Mettalex',
    symbol: 'MTLX',
  },
  {
    id: 7257,
    name: 'APEcoin',
    symbol: 'APE',
  },
  {
    id: 7262,
    name: 'extraDNA',
    symbol: 'XDNA',
  },
  {
    id: 7263,
    name: 'HLP Token',
    symbol: 'HLP',
  },
  {
    id: 7270,
    name: 'SAFE DEAL',
    symbol: 'SFD',
  },
  {
    id: 7271,
    name: 'Starname',
    symbol: 'IOV',
  },
  {
    id: 7273,
    name: 'Unlimited FiscusFYI',
    symbol: 'UFFYI',
  },
  {
    id: 7275,
    name: 'Yearn Finance Ecosystem',
    symbol: 'YFIEC',
  },
  {
    id: 7276,
    name: 'Kirobo',
    symbol: 'KIRO',
  },
  {
    id: 7277,
    name: 'BDCash Protocol',
    symbol: 'BDCASH',
  },
  {
    id: 7278,
    name: 'Aave',
    symbol: 'AAVE',
  },
  {
    id: 7281,
    name: 'Persistence',
    symbol: 'XPRT',
  },
  {
    id: 7284,
    name: 'PieDAO DOUGH v2',
    symbol: 'DOUGH',
  },
  {
    id: 7286,
    name: 'YFOX FINANCE',
    symbol: 'YFOX',
  },
  {
    id: 7288,
    name: 'Venus',
    symbol: 'XVS',
  },
  {
    id: 7296,
    name: 'Truebit',
    symbol: 'TRU',
  },
  {
    id: 7298,
    name: 'Phantasma Energy',
    symbol: 'KCAL',
  },
  {
    id: 7301,
    name: 'AurusDeFi',
    symbol: 'AWX',
  },
  {
    id: 7304,
    name: 'Moonbase',
    symbol: 'MBBASED',
  },
  {
    id: 7305,
    name: 'Jackpot',
    symbol: '777',
  },
  {
    id: 7307,
    name: 'Cyclops Treasure',
    symbol: 'CYTR',
  },
  {
    id: 7308,
    name: 'Compound Uni',
    symbol: 'CUNI',
  },
  {
    id: 7309,
    name: 'Bellevue Network',
    symbol: 'BLV',
  },
  {
    id: 7310,
    name: 'Gem Exchange And Trading',
    symbol: 'GXT',
  },
  {
    id: 7311,
    name: 'Beefy Finance',
    symbol: 'BIFI',
  },
  {
    id: 7312,
    name: 'Florin',
    symbol: 'XFL',
  },
  {
    id: 7314,
    name: 'PieDAO DEFI Small Cap',
    symbol: 'DEFI+S',
  },
  {
    id: 7315,
    name: 'Polyient Games Governance Token',
    symbol: 'PGT',
  },
  {
    id: 7317,
    name: 'YeaFinance',
    symbol: 'YEA',
  },
  {
    id: 7318,
    name: 'Zero Utility Token',
    symbol: 'ZUT',
  },
  {
    id: 7320,
    name: 'Neutrino Token',
    symbol: 'NSBT',
  },
  {
    id: 7321,
    name: 'yOUcash',
    symbol: 'YOUC',
  },
  {
    id: 7322,
    name: 'Stream Protocol',
    symbol: 'STPL',
  },
  {
    id: 7326,
    name: 'DeXe',
    symbol: 'DEXE',
  },
  {
    id: 7329,
    name: 'LYNC Network',
    symbol: 'LYNC',
  },
  {
    id: 7330,
    name: 'OWL Token (StealthSwap)',
    symbol: 'OWL',
  },
  {
    id: 7331,
    name: 'YFPRO Finance',
    symbol: 'YFPRO',
  },
  {
    id: 7332,
    name: 'EasyFi',
    symbol: 'EZ',
  },
  {
    id: 7333,
    name: 'DeFi Insurance Protocol',
    symbol: 'DFIP',
  },
  {
    id: 7334,
    name: 'Conflux',
    symbol: 'CFX',
  },
  {
    id: 7336,
    name: 'Index Cooperative',
    symbol: 'INDEX',
  },
  {
    id: 7337,
    name: 'PieDAO DEFI Large Cap',
    symbol: 'DEFI+L',
  },
  {
    id: 7341,
    name: 'Vera Cruz Coin',
    symbol: 'VCCO',
  },
  {
    id: 7346,
    name: 'Kauri',
    symbol: 'KAU',
  },
  {
    id: 7348,
    name: 'Portion',
    symbol: 'PRT',
  },
  {
    id: 7349,
    name: 'Centaur',
    symbol: 'CNTR',
  },
  {
    id: 7351,
    name: 'fry.world',
    symbol: 'FRIES',
  },
  {
    id: 7355,
    name: 'Reflex',
    symbol: 'RFX',
  },
  {
    id: 7363,
    name: 'POP Network Token',
    symbol: 'POP',
  },
  {
    id: 7366,
    name: 'Stabilize',
    symbol: 'STBZ',
  },
  {
    id: 7367,
    name: 'SnowSwap',
    symbol: 'SNOW',
  },
  {
    id: 7368,
    name: 'Power Index Pool Token',
    symbol: 'PIPT',
  },
  {
    id: 7371,
    name: 'Mover',
    symbol: 'MOVE',
  },
  {
    id: 7375,
    name: 'SUP',
    symbol: 'SUP',
  },
  {
    id: 7376,
    name: 'Doki Doki Finance',
    symbol: 'DOKI',
  },
  {
    id: 7377,
    name: 'Dogeswap',
    symbol: 'DOGES',
  },
  {
    id: 7379,
    name: 'LimitSwap',
    symbol: 'LIMIT',
  },
  {
    id: 7380,
    name: 'Dracula Token',
    symbol: 'DRC',
  },
  {
    id: 7381,
    name: 'CoFiX',
    symbol: 'COFI',
  },
  {
    id: 7382,
    name: 'ACoconut',
    symbol: 'AC',
  },
  {
    id: 7385,
    name: 'deCraft Finance',
    symbol: 'CRAFT',
  },
  {
    id: 7386,
    name: 'Spaceswap MILK2',
    symbol: 'MILK2',
  },
  {
    id: 7389,
    name: 'Non-Fungible Yearn',
    symbol: 'NFY',
  },
  {
    id: 7390,
    name: 'Spaceswap SHAKE',
    symbol: 'SHAKE',
  },
  {
    id: 7391,
    name: 'Star Pacific Coin',
    symbol: 'SPC',
  },
  {
    id: 7392,
    name: 'Talent Token',
    symbol: 'TTX',
  },
  {
    id: 7395,
    name: 'Atari Token',
    symbol: 'ATRI',
  },
  {
    id: 7396,
    name: 'r/CryptoCurrency Moons',
    symbol: 'xMOON',
  },
  {
    id: 7398,
    name: 'Coreto',
    symbol: 'COR',
  },
  {
    id: 7399,
    name: 'Global Gaming',
    symbol: 'GMNG',
  },
  {
    id: 7400,
    name: 'YFi Management',
    symbol: 'YEFIM',
  },
  {
    id: 7403,
    name: 'Wrapped BIND',
    symbol: 'WBIND',
  },
  {
    id: 7404,
    name: 'Value Liquidity',
    symbol: 'VALUE',
  },
  {
    id: 7406,
    name: 'MoonTools',
    symbol: 'MOONS',
  },
  {
    id: 7407,
    name: 'Payship',
    symbol: 'PSHP',
  },
  {
    id: 7410,
    name: 'Yearn Finance DOT',
    symbol: 'YFDOT',
  },
  {
    id: 7411,
    name: 'Covalent',
    symbol: 'CQT',
  },
  {
    id: 7412,
    name: 'UniLend',
    symbol: 'UFT',
  },
  {
    id: 7414,
    name: 'Behodler',
    symbol: 'EYE',
  },
  {
    id: 7415,
    name: 'BonezYard',
    symbol: 'BNZ',
  },
  {
    id: 7420,
    name: 'Digital Reserve Currency',
    symbol: 'DRC',
  },
  {
    id: 7421,
    name: 'Bitfinex Bitcoin Dominance Perps',
    symbol: 'BTCDOM',
  },
  {
    id: 7422,
    name: 'PlotX',
    symbol: 'PLOT',
  },
  {
    id: 7423,
    name: 'RUSH',
    symbol: 'RUC',
  },
  {
    id: 7424,
    name: 'Hermez Network',
    symbol: 'HEZ',
  },
  {
    id: 7425,
    name: 'PayAccept',
    symbol: 'PAYT',
  },
  {
    id: 7428,
    name: 'SWAG Finance',
    symbol: 'SWAG',
  },
  {
    id: 7429,
    name: 'Liquity',
    symbol: 'LQTY',
  },
  {
    id: 7430,
    name: 'Zenfuse',
    symbol: 'ZEFU',
  },
  {
    id: 7431,
    name: 'Akash Network',
    symbol: 'AKT',
  },
  {
    id: 7432,
    name: 'Bit Financial',
    symbol: 'BFC',
  },
  {
    id: 7435,
    name: 'Pepemon Pepeballs',
    symbol: 'PPBLZ',
  },
  {
    id: 7436,
    name: 'BonFi',
    symbol: 'BNF',
  },
  {
    id: 7437,
    name: 'MobieCoin',
    symbol: 'MBX',
  },
  {
    id: 7438,
    name: 'ZeroSwap',
    symbol: 'ZEE',
  },
  {
    id: 7440,
    name: 'BarnBridge',
    symbol: 'BOND',
  },
  {
    id: 7441,
    name: 'yRise Finance',
    symbol: 'YRISE',
  },
  {
    id: 7442,
    name: 'YFIA',
    symbol: 'YFIA',
  },
  {
    id: 7445,
    name: 'cCOMP',
    symbol: 'CCOMP',
  },
  {
    id: 7447,
    name: 'GALAXY NETWORK',
    symbol: 'GNC',
  },
  {
    id: 7448,
    name: 'LCG',
    symbol: 'LCG',
  },
  {
    id: 7452,
    name: 'YFIUP',
    symbol: 'YFIUP',
  },
  {
    id: 7453,
    name: 'YFIDOWN',
    symbol: 'YFIDOWN',
  },
  {
    id: 7454,
    name: 'ETG Finance',
    symbol: 'ETGF',
  },
  {
    id: 7455,
    name: 'Audius',
    symbol: 'AUDIO',
  },
  {
    id: 7456,
    name: 'Rare',
    symbol: 'RARE',
  },
  {
    id: 7460,
    name: 'Alpha Quark Token',
    symbol: 'AQT',
  },
  {
    id: 7461,
    name: 'PlayDapp',
    symbol: 'PLA',
  },
  {
    id: 7462,
    name: 'United',
    symbol: 'UTED',
  },
  {
    id: 7463,
    name: 'RAMP',
    symbol: 'RAMP',
  },
  {
    id: 7465,
    name: 'Vox.Finance',
    symbol: 'VOX',
  },
  {
    id: 7466,
    name: 'PRIA',
    symbol: 'PRIA',
  },
  {
    id: 7467,
    name: 'Swirge',
    symbol: 'SWG',
  },
  {
    id: 7469,
    name: 'Apiary Fund Coin',
    symbol: 'AFC',
  },
  {
    id: 7471,
    name: 'Wrapped Virgin Gen-0 CryptoKitties',
    symbol: 'WVG0',
  },
  {
    id: 7472,
    name: 'Wrapped Gen-0 CryptoKitties',
    symbol: 'WG0',
  },
  {
    id: 7473,
    name: 'Wrapped Basic CryptoKitties',
    symbol: 'WCK',
  },
  {
    id: 7474,
    name: 'Axia Protocol',
    symbol: 'AXIA',
  },
  {
    id: 7475,
    name: 'Camp',
    symbol: 'CAMP',
  },
  {
    id: 7478,
    name: 'Yearn Finance Network',
    symbol: 'YFN',
  },
  {
    id: 7481,
    name: 'Moonday Finance',
    symbol: 'MOONDAY',
  },
  {
    id: 7483,
    name: 'DeFi Gold',
    symbol: 'DFGL',
  },
  {
    id: 7486,
    name: 'Rari Governance Token',
    symbol: 'RGT',
  },
  {
    id: 7487,
    name: 'Chonk',
    symbol: 'CHONK',
  },
  {
    id: 7488,
    name: 'ShareAt',
    symbol: 'XAT',
  },
  {
    id: 7489,
    name: 'BananoDOS',
    symbol: 'yBAN',
  },
  {
    id: 7492,
    name: 'Zin Finance',
    symbol: 'ZIN',
  },
  {
    id: 7494,
    name: 'JustBet',
    symbol: 'WINR',
  },
  {
    id: 7496,
    name: 'Enoki Finance',
    symbol: 'SPORE',
  },
  {
    id: 7497,
    name: 'Marlin',
    symbol: 'POND',
  },
  {
    id: 7498,
    name: 'Yield Protocol',
    symbol: 'YIELD',
  },
  {
    id: 7500,
    name: 'Bonded Finance',
    symbol: 'BOND',
  },
  {
    id: 7501,
    name: 'WOO Network',
    symbol: 'WOO',
  },
  {
    id: 7502,
    name: 'StableXSwap',
    symbol: 'STAX',
  },
  {
    id: 7503,
    name: 'Bithao',
    symbol: 'BHAO',
  },
  {
    id: 7504,
    name: 'WeBlock',
    symbol: 'WON',
  },
  {
    id: 7505,
    name: 'Everscale',
    symbol: 'EVER',
  },
  {
    id: 7507,
    name: 'Neeva Defi',
    symbol: 'NVA',
  },
  {
    id: 7509,
    name: 'BoringDAO',
    symbol: 'BOR',
  },
  {
    id: 7510,
    name: 'QuiverX',
    symbol: 'QRX',
  },
  {
    id: 7511,
    name: 'DogDeFiCoin',
    symbol: 'DOGDEFI',
  },
  {
    id: 7512,
    name: 'Unistake',
    symbol: 'UNISTAKE',
  },
  {
    id: 7513,
    name: 'BitOnyx',
    symbol: 'BTNYX',
  },
  {
    id: 7514,
    name: 'IDall',
    symbol: 'IDALL',
  },
  {
    id: 7515,
    name: 'Ubiner',
    symbol: 'UBIN',
  },
  {
    id: 7517,
    name: 'YFI CREDITS GROUP',
    symbol: 'YFICG',
  },
  {
    id: 7518,
    name: 'Voice Token',
    symbol: 'VOICE',
  },
  {
    id: 7520,
    name: 'SynLev',
    symbol: 'SYN',
  },
  {
    id: 7521,
    name: 'EDC Blockchain',
    symbol: 'EDC',
  },
  {
    id: 7524,
    name: 'UNIUP',
    symbol: 'UNIUP',
  },
  {
    id: 7525,
    name: 'UNIDOWN',
    symbol: 'UNIDOWN',
  },
  {
    id: 7526,
    name: 'LTCUP',
    symbol: 'LTCUP',
  },
  {
    id: 7527,
    name: 'LTCDOWN',
    symbol: 'LTCDOWN',
  },
  {
    id: 7528,
    name: 'SXPUP',
    symbol: 'SXPUP',
  },
  {
    id: 7529,
    name: 'SXPDOWN',
    symbol: 'SXPDOWN',
  },
  {
    id: 7530,
    name: 'Yearn Finance Red Moon',
    symbol: 'YFRM',
  },
  {
    id: 7533,
    name: 'Oraichain Token',
    symbol: 'ORAI',
  },
  {
    id: 7534,
    name: 'Tsunami finance',
    symbol: 'NAMI',
  },
  {
    id: 7535,
    name: 'Keep3rV1',
    symbol: 'KP3R',
  },
  {
    id: 7536,
    name: 'Aspire',
    symbol: 'ASP',
  },
  {
    id: 7538,
    name: 'Degens',
    symbol: 'DEGENS',
  },
  {
    id: 7539,
    name: 'Colibri Protocol',
    symbol: 'CLBR',
  },
  {
    id: 7540,
    name: 'MegaCryptoPolis',
    symbol: 'MEGA',
  },
  {
    id: 7543,
    name: 'Hoo Token',
    symbol: 'HOO',
  },
  {
    id: 7544,
    name: 'The Luxury Coin',
    symbol: 'TLB',
  },
  {
    id: 7545,
    name: 'Jointer',
    symbol: 'JNTR',
  },
  {
    id: 7547,
    name: 'SURF Finance',
    symbol: 'SURF',
  },
  {
    id: 7548,
    name: 'WEMIX',
    symbol: 'WEMIX',
  },
  {
    id: 7551,
    name: 'YYFI.Protocol',
    symbol: 'YYFI',
  },
  {
    id: 7552,
    name: 'Hyve',
    symbol: 'HYVE',
  },
  {
    id: 7553,
    name: 'unFederalReserve',
    symbol: 'eRSDL',
  },
  {
    id: 7554,
    name: 'Hiz Finance',
    symbol: 'HIZ',
  },
  {
    id: 7559,
    name: 'Tadpole Finance',
    symbol: 'TAD',
  },
  {
    id: 7560,
    name: 'Fundamenta',
    symbol: 'FMTA',
  },
  {
    id: 7564,
    name: 'Pteria',
    symbol: 'PTERIA',
  },
  {
    id: 7569,
    name: 'King Swap',
    symbol: '$KING',
  },
  {
    id: 7570,
    name: 'Blurt',
    symbol: 'BLURT',
  },
  {
    id: 7571,
    name: 'Social Rocket',
    symbol: 'ROCKS',
  },
  {
    id: 7572,
    name: 'Yearn Secure',
    symbol: 'YSEC',
  },
  {
    id: 7574,
    name: 'Stacy',
    symbol: 'STACY',
  },
  {
    id: 7576,
    name: 'Kava Lend',
    symbol: 'HARD',
  },
  {
    id: 7579,
    name: 'Mars Network',
    symbol: 'MARS',
  },
  {
    id: 7581,
    name: 'Goldblock',
    symbol: 'GBK',
  },
  {
    id: 7582,
    name: 'Keep4r',
    symbol: 'KP4R',
  },
  {
    id: 7583,
    name: 'Auric Network',
    symbol: 'AUSCM',
  },
  {
    id: 7584,
    name: 'SwapAll',
    symbol: 'SAP',
  },
  {
    id: 7585,
    name: 'Freeway Token',
    symbol: 'FWT',
  },
  {
    id: 7586,
    name: 'Yearn Classic Finance',
    symbol: 'EARN',
  },
  {
    id: 7587,
    name: 'UTU Protocol',
    symbol: 'UTU',
  },
  {
    id: 7588,
    name: 'Gameswap',
    symbol: 'GSWAP',
  },
  {
    id: 7589,
    name: 'Cryptochrome',
    symbol: 'CHM',
  },
  {
    id: 7590,
    name: 'Dvision Network',
    symbol: 'DVI',
  },
  {
    id: 7591,
    name: 'Misbloc',
    symbol: 'MSB',
  },
  {
    id: 7592,
    name: 'Pepedex',
    symbol: 'PPDEX',
  },
  {
    id: 7593,
    name: 'DefiDollar DAO',
    symbol: 'DFD',
  },
  {
    id: 7594,
    name: 'Smoothy',
    symbol: 'SMTY',
  },
  {
    id: 7595,
    name: 'SERGS',
    symbol: 'SERGS',
  },
  {
    id: 7596,
    name: 'SmartCredit Token',
    symbol: 'SMARTCREDIT',
  },
  {
    id: 7597,
    name: 'CSP DAO',
    symbol: 'NEBO',
  },
  {
    id: 7598,
    name: 'Tessla Coin',
    symbol: 'TSLA',
  },
  {
    id: 7609,
    name: 'Fiola',
    symbol: 'FLA',
  },
  {
    id: 7611,
    name: 'Zuplo',
    symbol: 'ZLP',
  },
  {
    id: 7612,
    name: 'Yearn Finance Bit2',
    symbol: 'YFB2',
  },
  {
    id: 7613,
    name: 'Yfi.mobi',
    symbol: 'YFIM',
  },
  {
    id: 7614,
    name: 'TEAL',
    symbol: 'TEAT',
  },
  {
    id: 7615,
    name: 'MTI Finance',
    symbol: 'MTI',
  },
  {
    id: 7616,
    name: 'Lattice Token',
    symbol: 'LTX',
  },
  {
    id: 7617,
    name: 'saffron.finance',
    symbol: 'SFI',
  },
  {
    id: 7618,
    name: 'Alpaca City',
    symbol: 'ALPA',
  },
  {
    id: 7619,
    name: 'Bitcoiva',
    symbol: 'BCA',
  },
  {
    id: 7620,
    name: 'Trade.win',
    symbol: 'TWI',
  },
  {
    id: 7622,
    name: 'UBIX.Network',
    symbol: 'UBX',
  },
  {
    id: 7623,
    name: 'Libartysharetoken',
    symbol: 'LST',
  },
  {
    id: 7625,
    name: 'gAsp',
    symbol: 'GASP',
  },
  {
    id: 7627,
    name: 'PicaArtMoney',
    symbol: 'PICA',
  },
  {
    id: 7628,
    name: 'Coral Swap',
    symbol: 'CORAL',
  },
  {
    id: 7630,
    name: 'Ethereum Lightning',
    symbol: 'ETLT',
  },
  {
    id: 7631,
    name: 'FRMx Token',
    symbol: 'FRMX',
  },
  {
    id: 7632,
    name: 'Rake Finance',
    symbol: 'RAK',
  },
  {
    id: 7634,
    name: 'The LoveChain',
    symbol: 'LOV',
  },
  {
    id: 7635,
    name: 'UniWorld',
    symbol: 'UNW',
  },
  {
    id: 7636,
    name: 'Team Heretics Fan Token',
    symbol: 'TH',
  },
  {
    id: 7637,
    name: 'Trabzonspor Fan Token',
    symbol: 'TRA',
  },
  {
    id: 7638,
    name: 'Apollon Limassol',
    symbol: 'APL',
  },
  {
    id: 7639,
    name: 'Club Atletico Independiente',
    symbol: 'CAI',
  },
  {
    id: 7640,
    name: 'Future-Cash Digital',
    symbol: 'FCD',
  },
  {
    id: 7641,
    name: 'Medicalveda',
    symbol: 'MVEDA',
  },
  {
    id: 7643,
    name: 'Nyan V2',
    symbol: 'NYAN-2',
  },
  {
    id: 7645,
    name: 'WadzPay Token',
    symbol: 'WTK',
  },
  {
    id: 7647,
    name: 'Azuki',
    symbol: 'AZUKI',
  },
  {
    id: 7650,
    name: 'LIQUID',
    symbol: 'LIQUID',
  },
  {
    id: 7653,
    name: 'Oasis Network',
    symbol: 'ROSE',
  },
  {
    id: 7654,
    name: 'RedFOX Labs',
    symbol: 'RFOX',
  },
  {
    id: 7655,
    name: 'CloudCoin',
    symbol: 'CCE',
  },
  {
    id: 7657,
    name: 'BAEPAY',
    symbol: 'BAEPAY',
  },
  {
    id: 7658,
    name: 'GARD Governance Token',
    symbol: 'GGT',
  },
  {
    id: 7661,
    name: 'GYSR',
    symbol: 'GYSR',
  },
  {
    id: 7664,
    name: 'UniCrypt',
    symbol: 'UNCX',
  },
  {
    id: 7665,
    name: 'NestEGG Coin',
    symbol: 'EGG',
  },
  {
    id: 7668,
    name: 'LONG COIN',
    symbol: 'LONG',
  },
  {
    id: 7669,
    name: 'UNCL',
    symbol: 'UNCL',
  },
  {
    id: 7670,
    name: 'Blueshare Token',
    symbol: 'BST1',
  },
  {
    id: 7671,
    name: 'SEEN',
    symbol: 'SEEN',
  },
  {
    id: 7672,
    name: 'Unifi Protocol DAO',
    symbol: 'UNFI',
  },
  {
    id: 7673,
    name: 'AGOV (ANSWER Governance)',
    symbol: 'AGOV',
  },
  {
    id: 7675,
    name: 'Interest Bearing ETH',
    symbol: 'ibETH',
  },
  {
    id: 7676,
    name: 'Axion',
    symbol: 'AXN',
  },
  {
    id: 7677,
    name: 'ReapChain',
    symbol: 'REAP',
  },
  {
    id: 7678,
    name: 'KeeperDAO',
    symbol: 'ROOK',
  },
  {
    id: 7679,
    name: 'Dtube Coin',
    symbol: 'DTUBE',
  },
  {
    id: 7680,
    name: 'Sav3Token',
    symbol: 'SAV3',
  },
  {
    id: 7681,
    name: 'Ideaology',
    symbol: 'IDEA',
  },
  {
    id: 7684,
    name: 'ORO',
    symbol: 'ORO',
  },
  {
    id: 7686,
    name: 'Bitcoin Cash ABC',
    symbol: 'BCHA',
  },
  {
    id: 7687,
    name: 'Folder Protocol',
    symbol: 'FOL',
  },
  {
    id: 7689,
    name: 'Yup',
    symbol: 'YUP',
  },
  {
    id: 7690,
    name: 'Your Finance Decentralized',
    symbol: 'YFD',
  },
  {
    id: 7691,
    name: 'Farmland Protocol',
    symbol: 'FAR',
  },
  {
    id: 7692,
    name: 'e-Radix',
    symbol: 'EXRD',
  },
  {
    id: 7694,
    name: 'Governor DAO',
    symbol: 'GDAO',
  },
  {
    id: 7697,
    name: 'Experty Wisdom Token',
    symbol: 'WIS',
  },
  {
    id: 7698,
    name: 'CorionX',
    symbol: 'CORX',
  },
  {
    id: 7699,
    name: 'CyberFi Token',
    symbol: 'CFi',
  },
  {
    id: 7700,
    name: 'WAY-F coin',
    symbol: 'WAYF',
  },
  {
    id: 7703,
    name: 'MileVerse',
    symbol: 'MVC',
  },
  {
    id: 7705,
    name: 'ANIVERSE',
    symbol: 'ANV',
  },
  {
    id: 7714,
    name: 'swiss.finance',
    symbol: 'SWISS',
  },
  {
    id: 7716,
    name: 'Earnbase',
    symbol: 'ENB',
  },
  {
    id: 7717,
    name: 'TecraCoin',
    symbol: 'TCR',
  },
  {
    id: 7718,
    name: 'Combo',
    symbol: 'COMB',
  },
  {
    id: 7720,
    name: 'DefHold',
    symbol: 'DEFO',
  },
  {
    id: 7721,
    name: 'Chemix Ecology Governance Token',
    symbol: 'KUN',
  },
  {
    id: 7723,
    name: 'Itchiro Games',
    symbol: 'JEM',
  },
  {
    id: 7725,
    name: 'TrueFi',
    symbol: 'TRU',
  },
  {
    id: 7726,
    name: 'ICHI',
    symbol: 'ICHI',
  },
  {
    id: 7727,
    name: 'UniWhales',
    symbol: 'UWL',
  },
  {
    id: 7732,
    name: 'Brother Music Platform',
    symbol: 'BMP',
  },
  {
    id: 7734,
    name: 'TOM Finance',
    symbol: 'TOM',
  },
  {
    id: 7737,
    name: 'API3',
    symbol: 'API3',
  },
  {
    id: 7738,
    name: 'TimeCoinProtocol',
    symbol: 'TMCN',
  },
  {
    id: 7739,
    name: 'DexKit',
    symbol: 'KIT',
  },
  {
    id: 7740,
    name: 'Polaris Share',
    symbol: 'POLA',
  },
  {
    id: 7742,
    name: '88mph',
    symbol: 'MPH',
  },
  {
    id: 7743,
    name: 'Ethereum Yield',
    symbol: 'ETHY',
  },
  {
    id: 7746,
    name: 'Felixo Coin',
    symbol: 'FLX',
  },
  {
    id: 7747,
    name: 'reflect.finance',
    symbol: 'RFI',
  },
  {
    id: 7748,
    name: 'BSC FARM',
    symbol: 'BSC',
  },
  {
    id: 7749,
    name: 'Paypolitan Token',
    symbol: 'EPAN',
  },
  {
    id: 7750,
    name: 'Eden',
    symbol: 'EDEN',
  },
  {
    id: 7751,
    name: 'KP2R.Network',
    symbol: 'KP2R',
  },
  {
    id: 7752,
    name: 'LibreFreelencer',
    symbol: 'LIBREF',
  },
  {
    id: 7753,
    name: 'BIOKKOIN',
    symbol: 'BKKG',
  },
  {
    id: 7755,
    name: 'Handy',
    symbol: 'HANDY',
  },
  {
    id: 7756,
    name: 'oBTC',
    symbol: 'OBTC',
  },
  {
    id: 7760,
    name: 'Komet',
    symbol: 'KOMET',
  },
  {
    id: 7761,
    name: 'BuildUp',
    symbol: 'BUP',
  },
  {
    id: 7762,
    name: 'Lyra',
    symbol: 'LYR',
  },
  {
    id: 7763,
    name: 'BlackDragon',
    symbol: 'BDT',
  },
  {
    id: 7764,
    name: 'Simbcoin Swap',
    symbol: 'SMBSWAP',
  },
  {
    id: 7765,
    name: 'Benchmark Protocol',
    symbol: 'MARK',
  },
  {
    id: 7771,
    name: 'HoldToWin',
    symbol: '7ADD',
  },
  {
    id: 7772,
    name: 'Leverj Gluon',
    symbol: 'L2',
  },
  {
    id: 7773,
    name: 'Prophet',
    symbol: 'PROPHET',
  },
  {
    id: 7774,
    name: 'AAVEUP',
    symbol: 'AAVEUP',
  },
  {
    id: 7775,
    name: 'AAVEDOWN',
    symbol: 'AAVEDOWN',
  },
  {
    id: 7776,
    name: 'Vanilla Network',
    symbol: 'VNLA',
  },
  {
    id: 7778,
    name: 'Metis',
    symbol: 'MTS',
  },
  {
    id: 7779,
    name: 'XPToken.io',
    symbol: 'XPT',
  },
  {
    id: 7782,
    name: 'Ethanol',
    symbol: 'ENOL',
  },
  {
    id: 7783,
    name: 'Open Governance Token',
    symbol: 'OPEN',
  },
  {
    id: 7784,
    name: 'BLink',
    symbol: 'BLINK',
  },
  {
    id: 7785,
    name: 'Bundles Finance',
    symbol: 'BUND',
  },
  {
    id: 7787,
    name: 'JSB FOUNDATION',
    symbol: 'JSB',
  },
  {
    id: 7788,
    name: 'Yearn Loans Finance',
    symbol: 'YLFI',
  },
  {
    id: 7789,
    name: 'OASISBloc',
    symbol: 'OSB',
  },
  {
    id: 7790,
    name: 'LifetionCoin',
    symbol: 'LTP',
  },
  {
    id: 7791,
    name: 'Pancake Bunny',
    symbol: 'BUNNY',
  },
  {
    id: 7795,
    name: 'Bird.Money',
    symbol: 'BIRD',
  },
  {
    id: 7796,
    name: 'COIN',
    symbol: '$COIN',
  },
  {
    id: 7798,
    name: 'Decentral Games',
    symbol: 'DG',
  },
  {
    id: 7803,
    name: 'Ethereum Stake',
    symbol: 'ETHYS',
  },
  {
    id: 7805,
    name: 'Muse',
    symbol: 'MUSE',
  },
  {
    id: 7806,
    name: 'Cornichon',
    symbol: 'CORN',
  },
  {
    id: 7809,
    name: 'Carbon',
    symbol: 'CRBN',
  },
  {
    id: 7811,
    name: 'Bullswap Exchange',
    symbol: 'BVL',
  },
  {
    id: 7812,
    name: 'SYNC Network',
    symbol: 'SYNC',
  },
  {
    id: 7813,
    name: 'Basis Cash',
    symbol: 'BAC',
  },
  {
    id: 7814,
    name: 'Alaya',
    symbol: 'ATP',
  },
  {
    id: 7815,
    name: 'DefiCliq',
    symbol: 'CLIQ',
  },
  {
    id: 7816,
    name: 'Basis Share',
    symbol: 'BAS',
  },
  {
    id: 7817,
    name: 'Bifrost (BFC)',
    symbol: 'BFC',
  },
  {
    id: 7819,
    name: 'Unicap.finance',
    symbol: 'UCAP',
  },
  {
    id: 7821,
    name: 'Royale Finance',
    symbol: 'ROYA',
  },
  {
    id: 7824,
    name: 'Vai',
    symbol: 'VAI',
  },
  {
    id: 7826,
    name: 'Zoracles',
    symbol: 'ZORA',
  },
  {
    id: 7828,
    name: 'KING OF DEFI',
    symbol: 'KODX',
  },
  {
    id: 7831,
    name: 'Narwhalswap',
    symbol: 'NAR',
  },
  {
    id: 7832,
    name: 'REALPAY',
    symbol: 'RAP',
  },
  {
    id: 7834,
    name: 'DEJAVE',
    symbol: 'DJV',
  },
  {
    id: 7835,
    name: 'Money of Tomorrow Today',
    symbol: 'MTTCOIN',
  },
  {
    id: 7837,
    name: 'Apple Finance',
    symbol: 'APLP',
  },
  {
    id: 7838,
    name: 'Base Protocol',
    symbol: 'BASE',
  },
  {
    id: 7841,
    name: 'Idle',
    symbol: 'IDLE',
  },
  {
    id: 7844,
    name: 'ACryptoS',
    symbol: 'ACS',
  },
  {
    id: 7848,
    name: 'Unbound Dollar',
    symbol: 'UND',
  },
  {
    id: 7851,
    name: 'Adventure Token',
    symbol: 'TWA',
  },
  {
    id: 7852,
    name: 'IterationSyndicate',
    symbol: 'ITS',
  },
  {
    id: 7854,
    name: 'ACDX Exchange Governance Token',
    symbol: 'ACXT',
  },
  {
    id: 7855,
    name: 'Gold Coin Reserve',
    symbol: 'GCR',
  },
  {
    id: 7857,
    name: 'Mirror Protocol',
    symbol: 'MIR',
  },
  {
    id: 7859,
    name: 'Badger DAO',
    symbol: 'BADGER',
  },
  {
    id: 7860,
    name: 'ClinTex CTi',
    symbol: 'CTI',
  },
  {
    id: 7862,
    name: 'YearnAgnostic Finance',
    symbol: 'YFIAG',
  },
  {
    id: 7864,
    name: 'DGPayment',
    symbol: 'DGP',
  },
  {
    id: 7866,
    name: 'Monavale',
    symbol: 'MONA',
  },
  {
    id: 7867,
    name: 'Bitcashpay (old)',
    symbol: 'BCP',
  },
  {
    id: 7869,
    name: 'RedChillies',
    symbol: 'REDC',
  },
  {
    id: 7870,
    name: 'Plasma Finance',
    symbol: 'PPAY',
  },
  {
    id: 7872,
    name: 'ECOC Financial Growth',
    symbol: 'EFG',
  },
  {
    id: 7874,
    name: 'PieDAO DEFI++',
    symbol: 'DEFI++',
  },
  {
    id: 7875,
    name: 'MM Token',
    symbol: 'MM',
  },
  {
    id: 7876,
    name: 'Sora Validator Token',
    symbol: 'VAL',
  },
  {
    id: 7878,
    name: 'MobileCoin',
    symbol: 'MOB',
  },
  {
    id: 7879,
    name: 'Unifty',
    symbol: 'NIF',
  },
  {
    id: 7880,
    name: 'YFIDapp',
    symbol: 'YFID',
  },
  {
    id: 7881,
    name: 'sKLAY',
    symbol: 'SKLAY',
  },
  {
    id: 7882,
    name: 'EFFORCE',
    symbol: 'WOZX',
  },
  {
    id: 7883,
    name: 'WELL',
    symbol: 'WELL',
  },
  {
    id: 7884,
    name: 'Elite Swap',
    symbol: 'ELT',
  },
  {
    id: 7885,
    name: 'Katalyo',
    symbol: 'KTLYO',
  },
  {
    id: 7886,
    name: 'Glox Finance',
    symbol: 'GLOX',
  },
  {
    id: 7887,
    name: 'Tesla tokenized stock FTX',
    symbol: 'TSLA',
  },
  {
    id: 7888,
    name: 'Nio tokenized stock FTX',
    symbol: 'NIO',
  },
  {
    id: 7889,
    name: 'Alibaba tokenized stock FTX',
    symbol: 'BABA',
  },
  {
    id: 7890,
    name: 'Amazon tokenized stock FTX',
    symbol: 'AMZN',
  },
  {
    id: 7891,
    name: 'Pfizer tokenized stock FTX',
    symbol: 'PFE',
  },
  {
    id: 7892,
    name: 'Beyond Meat tokenized stock FTX',
    symbol: 'BYND',
  },
  {
    id: 7893,
    name: 'Taiwan Semiconductor Mfg tokenized stock FTX',
    symbol: 'TSM',
  },
  {
    id: 7894,
    name: 'Apple tokenized stock FTX',
    symbol: 'AAPL',
  },
  {
    id: 7895,
    name: 'Billibilli Inc tokenized stock FTX',
    symbol: 'BILI',
  },
  {
    id: 7896,
    name: 'ARK Innovation ETF tokenized stock FTX',
    symbol: 'ARKK',
  },
  {
    id: 7897,
    name: 'Facebook tokenized stock FTX',
    symbol: 'FB',
  },
  {
    id: 7898,
    name: 'MicroStrategy tokenized stock FTX',
    symbol: 'MSTR',
  },
  {
    id: 7899,
    name: 'Netflix tokenized stock FTX',
    symbol: 'NFLX',
  },
  {
    id: 7900,
    name: 'Moderna tokenized stock FTX',
    symbol: 'MRNA',
  },
  {
    id: 7901,
    name: 'PayPal tokenized stock FTX',
    symbol: 'PYPL',
  },
  {
    id: 7902,
    name: 'Square tokenized stock FTX',
    symbol: 'SQ',
  },
  {
    id: 7903,
    name: 'Advanced Micro Devices tokenized stock FTX',
    symbol: 'AMD',
  },
  {
    id: 7907,
    name: 'VersoView',
    symbol: 'VVT',
  },
  {
    id: 7913,
    name: 'NVIDIA tokenized stock FTX',
    symbol: 'NVDA',
  },
  {
    id: 7914,
    name: 'Google tokenized stock FTX',
    symbol: 'GOOGL',
  },
  {
    id: 7915,
    name: 'SPDR S&P 500 ETF tokenized stock FTX',
    symbol: 'SPY',
  },
  {
    id: 7916,
    name: 'Twitter tokenized stock FTX',
    symbol: 'TWTR',
  },
  {
    id: 7917,
    name: 'Uber tokenized stock FTX',
    symbol: 'UBER',
  },
  {
    id: 7918,
    name: 'BioNTech tokenized stock FTX',
    symbol: 'BNTX',
  },
  {
    id: 7919,
    name: 'Tesla tokenized stock Bittrex',
    symbol: 'TSLA',
  },
  {
    id: 7920,
    name: 'SPDR S&P 500 ETF tokenized stock Bittrex',
    symbol: 'SPY',
  },
  {
    id: 7921,
    name: 'Alibaba tokenized stock Bittrex',
    symbol: 'BABA',
  },
  {
    id: 7922,
    name: 'Beyond Meat Inc tokenized stock Bittrex',
    symbol: 'BYND',
  },
  {
    id: 7923,
    name: 'Pfizer tokenized stock Bittrex',
    symbol: 'PFE',
  },
  {
    id: 7924,
    name: 'Apple tokenized stock Bittrex',
    symbol: 'AAPL',
  },
  {
    id: 7925,
    name: 'BioNTech tokenized stock Bittrex',
    symbol: 'BNTX',
  },
  {
    id: 7926,
    name: 'Facebook tokenized stock Bittrex',
    symbol: 'FB',
  },
  {
    id: 7927,
    name: 'Google tokenized stock Bittrex',
    symbol: 'GOOGL',
  },
  {
    id: 7928,
    name: 'Netflix tokenized stock Bittrex',
    symbol: 'NFLX',
  },
  {
    id: 7929,
    name: 'Amazon tokenized stock Bittrex',
    symbol: 'AMZN',
  },
  {
    id: 7930,
    name: 'Billibilli tokenized stock Bittrex',
    symbol: 'BILI',
  },
  {
    id: 7931,
    name: 'Bondly',
    symbol: 'BONDLY',
  },
  {
    id: 7932,
    name: 'Airbnb tokenized stock FTX',
    symbol: 'ABNB',
  },
  {
    id: 7933,
    name: 'Alpha5',
    symbol: 'A5T',
  },
  {
    id: 7942,
    name: 'Curate',
    symbol: 'XCUR',
  },
  {
    id: 7946,
    name: 'Grace Period Token',
    symbol: 'GPT',
  },
  {
    id: 7947,
    name: 'Rank Token',
    symbol: 'RANK',
  },
  {
    id: 7949,
    name: 'Interfinex',
    symbol: 'IFEX',
  },
  {
    id: 7952,
    name: 'Venus SXP',
    symbol: 'vSXP',
  },
  {
    id: 7957,
    name: 'Venus USDT',
    symbol: 'vUSDT',
  },
  {
    id: 7958,
    name: 'Venus USDC',
    symbol: 'vUSDC',
  },
  {
    id: 7959,
    name: 'Venus BUSD',
    symbol: 'vBUSD',
  },
  {
    id: 7960,
    name: 'Venus XVS',
    symbol: 'vXVS',
  },
  {
    id: 7961,
    name: 'Venus BNB',
    symbol: 'vBNB',
  },
  {
    id: 7962,
    name: 'Venus BTC',
    symbol: 'vBTC',
  },
  {
    id: 7963,
    name: 'Venus ETH',
    symbol: 'vETH',
  },
  {
    id: 7964,
    name: 'Venus LTC',
    symbol: 'vLTC',
  },
  {
    id: 7965,
    name: 'Venus XRP',
    symbol: 'vXRP',
  },
  {
    id: 7966,
    name: '4Bulls',
    symbol: '4B',
  },
  {
    id: 7969,
    name: 'XVIX',
    symbol: 'XVIX',
  },
  {
    id: 7972,
    name: 'Honey',
    symbol: 'HNY',
  },
  {
    id: 7973,
    name: 'Deflect',
    symbol: 'DEFLCT',
  },
  {
    id: 7974,
    name: 'Venus BCH',
    symbol: 'vBCH',
  },
  {
    id: 7975,
    name: 'Venus LINK',
    symbol: 'vLINK',
  },
  {
    id: 7976,
    name: 'Venus DOT',
    symbol: 'vDOT',
  },
  {
    id: 7977,
    name: 'Unit Protocol Duck',
    symbol: 'DUCK',
  },
  {
    id: 7978,
    name: 'Bonfida',
    symbol: 'FIDA',
  },
  {
    id: 7979,
    name: 'Meteorite.network',
    symbol: 'METEOR',
  },
  {
    id: 7980,
    name: 'MinePlex',
    symbol: 'PLEX',
  },
  {
    id: 7981,
    name: 'PIGX',
    symbol: 'PIGX',
  },
  {
    id: 7986,
    name: 'Hub - Human Trust Protocol',
    symbol: 'HUB',
  },
  {
    id: 7988,
    name: 'Zugacoin',
    symbol: 'SZCB',
  },
  {
    id: 7990,
    name: 'Richlab Token',
    symbol: 'RLE',
  },
  {
    id: 7991,
    name: 'Yield',
    symbol: 'YLD',
  },
  {
    id: 7992,
    name: 'Ludena Protocol',
    symbol: 'LDN',
  },
  {
    id: 7993,
    name: 'Node Runners',
    symbol: 'NDR',
  },
  {
    id: 7995,
    name: 'Trinity Protocol',
    symbol: 'TRI',
  },
  {
    id: 7996,
    name: 'Buy-Sell',
    symbol: 'BSE',
  },
  {
    id: 7997,
    name: 'renFIL',
    symbol: 'RENFIL',
  },
  {
    id: 7998,
    name: 'Predictz',
    symbol: 'PRDZ',
  },
  {
    id: 8000,
    name: 'Lido DAO Token',
    symbol: 'LDO',
  },
  {
    id: 8001,
    name: 'Mirrored Apple',
    symbol: 'mAAPL',
  },
  {
    id: 8002,
    name: 'SpiderDAO',
    symbol: 'SPDR',
  },
  {
    id: 8003,
    name: 'Mirrored Google',
    symbol: 'mGOOGL',
  },
  {
    id: 8004,
    name: 'Mirrored Tesla',
    symbol: 'mTSLA',
  },
  {
    id: 8005,
    name: 'Mirrored Netflix',
    symbol: 'mNFLX',
  },
  {
    id: 8006,
    name: 'Mirrored Alibaba',
    symbol: 'mBABA',
  },
  {
    id: 8007,
    name: 'Natural Farm Union Protocol',
    symbol: 'NFUP',
  },
  {
    id: 8011,
    name: 'Davincij15 Token',
    symbol: 'DJ15',
  },
  {
    id: 8012,
    name: 'MediconnectUk',
    symbol: 'MEDI',
  },
  {
    id: 8014,
    name: 'FNK wallet',
    symbol: 'FNK',
  },
  {
    id: 8016,
    name: 'Mirrored Amazon',
    symbol: 'mAMZN',
  },
  {
    id: 8017,
    name: 'Mirrored Microsoft',
    symbol: 'mMSFT',
  },
  {
    id: 8018,
    name: 'Mirrored Twitter',
    symbol: 'mTWTR',
  },
  {
    id: 8019,
    name: 'N3RD Finance',
    symbol: 'N3RDz',
  },
  {
    id: 8023,
    name: 'SPICE',
    symbol: 'SPICE',
  },
  {
    id: 8024,
    name: 'Mirrored iShares Gold Trust',
    symbol: 'mIAU',
  },
  {
    id: 8025,
    name: 'Mirrored Invesco QQQ Trust',
    symbol: 'mQQQ',
  },
  {
    id: 8026,
    name: 'Mirrored iShares Silver Trust',
    symbol: 'mSLV',
  },
  {
    id: 8027,
    name: 'Mirrored United States Oil Fund',
    symbol: 'mUSO',
  },
  {
    id: 8028,
    name: 'Mirrored ProShares VIX',
    symbol: 'mVIXY',
  },
  {
    id: 8029,
    name: 'Oxygen',
    symbol: 'OXY',
  },
  {
    id: 8030,
    name: 'NFTLootBox',
    symbol: 'LOOT',
  },
  {
    id: 8031,
    name: 'governance ZIL',
    symbol: 'GZIL',
  },
  {
    id: 8032,
    name: 'Absorber Protocol',
    symbol: 'ABS',
  },
  {
    id: 8034,
    name: 'BioPassport Token',
    symbol: 'BIOT',
  },
  {
    id: 8036,
    name: 'YVS.Finance',
    symbol: 'YVS',
  },
  {
    id: 8037,
    name: 'Terra Virtua Kolect',
    symbol: 'TVK',
  },
  {
    id: 8039,
    name: 'Reflector.Finance',
    symbol: 'RFCTR',
  },
  {
    id: 8040,
    name: 'R34P',
    symbol: 'R34P',
  },
  {
    id: 8041,
    name: 'Refract',
    symbol: 'RFR',
  },
  {
    id: 8043,
    name: 'MahaDAO',
    symbol: 'MAHA',
  },
  {
    id: 8044,
    name: 'Adappter Token',
    symbol: 'ADP',
  },
  {
    id: 8045,
    name: 'APY Vision',
    symbol: 'VISION',
  },
  {
    id: 8046,
    name: 'Cybertronchain',
    symbol: 'CTC',
  },
  {
    id: 8048,
    name: 'Everyonescrypto',
    symbol: 'EOC',
  },
  {
    id: 8049,
    name: 'Tornado Cash',
    symbol: 'TORN',
  },
  {
    id: 8050,
    name: 'FILUP',
    symbol: 'FILUP',
  },
  {
    id: 8051,
    name: 'FILDOWN',
    symbol: 'FILDOWN',
  },
  {
    id: 8053,
    name: 'SUSHIUP',
    symbol: 'SUSHIUP',
  },
  {
    id: 8054,
    name: 'XLMDOWN',
    symbol: 'XLMDOWN',
  },
  {
    id: 8055,
    name: 'XLMUP',
    symbol: 'XLMUP',
  },
  {
    id: 8056,
    name: 'UNION Protocol Governance Token',
    symbol: 'UNN',
  },
  {
    id: 8057,
    name: 'AnRKey X',
    symbol: '$ANRX',
  },
  {
    id: 8058,
    name: 'Binance VND',
    symbol: 'BVND',
  },
  {
    id: 8059,
    name: 'Golden Ratio Per Liquidity',
    symbol: 'GRPL',
  },
  {
    id: 8060,
    name: 'B21 Invest',
    symbol: 'B21',
  },
  {
    id: 8063,
    name: 'Duck DAO (DLP Duck Token)',
    symbol: 'DUCK',
  },
  {
    id: 8066,
    name: 'YIELD App',
    symbol: 'YLD',
  },
  {
    id: 8068,
    name: 'Coinbase tokenized stock FTX',
    symbol: 'COIN',
  },
  {
    id: 8071,
    name: 'OnX Finance',
    symbol: 'ONX',
  },
  {
    id: 8074,
    name: 'Basis Dollar',
    symbol: 'BSD',
  },
  {
    id: 8075,
    name: 'Rally',
    symbol: 'RLY',
  },
  {
    id: 8076,
    name: 'Capital.Finance',
    symbol: 'CAP',
  },
  {
    id: 8077,
    name: 'Rootkit Finance',
    symbol: 'ROOT',
  },
  {
    id: 8079,
    name: 'Dexfin',
    symbol: 'DXF',
  },
  {
    id: 8080,
    name: 'DeFi Yield Protocol',
    symbol: 'DYP',
  },
  {
    id: 8082,
    name: 'Tornado',
    symbol: 'TCORE',
  },
  {
    id: 8083,
    name: 'Tokenlon Network Token',
    symbol: 'LON',
  },
  {
    id: 8084,
    name: 'nHBTC',
    symbol: 'N0001',
  },
  {
    id: 8085,
    name: 'Lido stETH',
    symbol: 'STETH',
  },
  {
    id: 8086,
    name: 'Ditto',
    symbol: 'DITTO',
  },
  {
    id: 8087,
    name: 'FastSwap',
    symbol: 'FAST',
  },
  {
    id: 8090,
    name: 'Trade Butler Bot',
    symbol: 'TBB',
  },
  {
    id: 8093,
    name: 'DAPPCENTS',
    symbol: 'DPC',
  },
  {
    id: 8100,
    name: 'ankrETH',
    symbol: 'aEth',
  },
  {
    id: 8103,
    name: 'unilock.network',
    symbol: 'UNL',
  },
  {
    id: 8104,
    name: '1inch Network',
    symbol: '1INCH',
  },
  {
    id: 8105,
    name: 'ROCKI',
    symbol: 'ROCKI',
  },
  {
    id: 8106,
    name: 'Dynamic Set Dollar',
    symbol: 'DSD',
  },
  {
    id: 8107,
    name: 'Cobak Token',
    symbol: 'CBK',
  },
  {
    id: 8112,
    name: 'Bankcoin',
    symbol: 'BANK',
  },
  {
    id: 8113,
    name: 'CryptoBank',
    symbol: 'CBANK',
  },
  {
    id: 8117,
    name: 'Dymmax',
    symbol: 'DMX',
  },
  {
    id: 8118,
    name: 'Global Utility Smart Digital Token',
    symbol: 'GUSDT',
  },
  {
    id: 8119,
    name: 'SafePal',
    symbol: 'SFP',
  },
  {
    id: 8120,
    name: 'Whiteheart',
    symbol: 'WHITE',
  },
  {
    id: 8121,
    name: 'Themis',
    symbol: 'MIS',
  },
  {
    id: 8123,
    name: 'Australian Dollar Token',
    symbol: 'AUDT',
  },
  {
    id: 8124,
    name: 'DRC mobility',
    symbol: 'DRC',
  },
  {
    id: 8125,
    name: 'Unique One',
    symbol: 'RARE',
  },
  {
    id: 8126,
    name: 'Bitpower',
    symbol: 'BPP',
  },
  {
    id: 8128,
    name: 'DFSocial Gaming [old]',
    symbol: 'DFSOCIAL',
  },
  {
    id: 8129,
    name: 'Fire Protocol',
    symbol: 'FIRE',
  },
  {
    id: 8130,
    name: 'Supreme Finance',
    symbol: 'HYPE',
  },
  {
    id: 8131,
    name: 'Curio Governance',
    symbol: 'CGT',
  },
  {
    id: 8132,
    name: 'BiFi',
    symbol: 'BIFI',
  },
  {
    id: 8133,
    name: 'Skey Network',
    symbol: 'SKEY',
  },
  {
    id: 8134,
    name: 'Keep3r BSC Network',
    symbol: 'KP3RB',
  },
  {
    id: 8135,
    name: 'Cryptokek',
    symbol: 'KEK',
  },
  {
    id: 8136,
    name: 'WAXE',
    symbol: 'WAXE',
  },
  {
    id: 8137,
    name: 'MITH Cash',
    symbol: 'MIC',
  },
  {
    id: 8140,
    name: 'Wifi Coin',
    symbol: 'WIFI',
  },
  {
    id: 8141,
    name: 'Mithril Share',
    symbol: 'MIS',
  },
  {
    id: 8142,
    name: 'IDL Token',
    symbol: 'IDL',
  },
  {
    id: 8143,
    name: 'Nord Finance',
    symbol: 'NORD',
  },
  {
    id: 8144,
    name: 'OVR',
    symbol: 'OVR',
  },
  {
    id: 8145,
    name: 'SparkPoint Fuel',
    symbol: 'SFUEL',
  },
  {
    id: 8146,
    name: 'Zipmex',
    symbol: 'ZMT',
  },
  {
    id: 8147,
    name: 'WanSwap',
    symbol: 'WASP',
  },
  {
    id: 8148,
    name: 'DigiCol',
    symbol: 'DGCL',
  },
  {
    id: 8149,
    name: 'Finance.Vote',
    symbol: 'FVT',
  },
  {
    id: 8150,
    name: 'Utopia Genesis Foundation',
    symbol: 'UOP',
  },
  {
    id: 8156,
    name: 'GGDApp',
    symbol: 'GGTK',
  },
  {
    id: 8159,
    name: 'One Cash',
    symbol: 'ONC',
  },
  {
    id: 8160,
    name: 'One Share',
    symbol: 'ONS',
  },
  {
    id: 8161,
    name: 'Shopping',
    symbol: 'SPI',
  },
  {
    id: 8162,
    name: 'AMEPAY',
    symbol: 'AME',
  },
  {
    id: 8163,
    name: 'Exeedme',
    symbol: 'XED',
  },
  {
    id: 8164,
    name: 'JulSwap',
    symbol: 'JULD',
  },
  {
    id: 8166,
    name: 'MAPS',
    symbol: 'MAPS',
  },
  {
    id: 8167,
    name: 'Wise Token',
    symbol: 'WISE',
  },
  {
    id: 8168,
    name: 'Bao Finance',
    symbol: 'BAO',
  },
  {
    id: 8169,
    name: 'Polkainsure Finance',
    symbol: 'PIS',
  },
  {
    id: 8172,
    name: 'bDollar Share',
    symbol: 'SBDO',
  },
  {
    id: 8173,
    name: 'Loon Network',
    symbol: 'LOON',
  },
  {
    id: 8174,
    name: 'CircleSwap',
    symbol: 'CIR',
  },
  {
    id: 8176,
    name: 'Firdaos',
    symbol: 'FDO',
  },
  {
    id: 8177,
    name: 'KnoxFS (New)',
    symbol: 'KFX',
  },
  {
    id: 8181,
    name: 'DePay',
    symbol: 'DEPAY',
  },
  {
    id: 8182,
    name: 'VidyX',
    symbol: 'VIDYX',
  },
  {
    id: 8184,
    name: 'Havens Nook',
    symbol: 'HXN',
  },
  {
    id: 8185,
    name: 'Trism',
    symbol: 'TRISM',
  },
  {
    id: 8186,
    name: 'Banana.finance',
    symbol: 'BANANA',
  },
  {
    id: 8187,
    name: 'Yield Optimization Platform & Protocol',
    symbol: 'YOP',
  },
  {
    id: 8188,
    name: 'MoneySwap',
    symbol: 'MSWAP',
  },
  {
    id: 8189,
    name: 'Shabu Shabu Finance',
    symbol: 'KOBE',
  },
  {
    id: 8190,
    name: 'BSCEX',
    symbol: 'BSCX',
  },
  {
    id: 8191,
    name: 'NFTX',
    symbol: 'NFTX',
  },
  {
    id: 8193,
    name: 'Tenet',
    symbol: 'TEN',
  },
  {
    id: 8194,
    name: 'BitDNS',
    symbol: 'DNS',
  },
  {
    id: 8196,
    name: 'Mantis',
    symbol: 'MNTIS',
  },
  {
    id: 8198,
    name: 'HappinessToken',
    symbol: 'HPS',
  },
  {
    id: 8200,
    name: 'Shapeshift FOX Token',
    symbol: 'FOX',
  },
  {
    id: 8201,
    name: 'Delphi Chain Link',
    symbol: 'DCL',
  },
  {
    id: 8202,
    name: 'ZKSwap',
    symbol: 'ZKS',
  },
  {
    id: 8204,
    name: 'Bolt Dollar',
    symbol: 'BTD',
  },
  {
    id: 8205,
    name: 'Bolt Share',
    symbol: 'BTS',
  },
  {
    id: 8206,
    name: 'QuickSwap',
    symbol: 'QUICK',
  },
  {
    id: 8207,
    name: 'PlayAndLike',
    symbol: 'PAL',
  },
  {
    id: 8212,
    name: 'Earn Defi Coin',
    symbol: 'EDC',
  },
  {
    id: 8213,
    name: 'Venus Filecoin',
    symbol: 'vFIL',
  },
  {
    id: 8214,
    name: 'Venus DAI',
    symbol: 'vDAI',
  },
  {
    id: 8216,
    name: 'Electra Protocol',
    symbol: 'XEP',
  },
  {
    id: 8217,
    name: 'CheeseSwap',
    symbol: 'CHS',
  },
  {
    id: 8219,
    name: 'bDollar',
    symbol: 'BDO',
  },
  {
    id: 8220,
    name: 'Serum Ecosystem Token',
    symbol: 'SECO',
  },
  {
    id: 8221,
    name: 'Tronx Coin',
    symbol: 'TRONX',
  },
  {
    id: 8224,
    name: 'Dequant',
    symbol: 'DEQ',
  },
  {
    id: 8226,
    name: 'Xdef Finance',
    symbol: 'XDEF2',
  },
  {
    id: 8227,
    name: 'Connect Financial',
    symbol: 'CNFI',
  },
  {
    id: 8229,
    name: 'UniMex Network',
    symbol: 'UMX',
  },
  {
    id: 8230,
    name: 'AI Network',
    symbol: 'AIN',
  },
  {
    id: 8232,
    name: 'UniDex',
    symbol: 'UNIDX',
  },
  {
    id: 8233,
    name: 'Hithotx',
    symbol: 'HITX',
  },
  {
    id: 8235,
    name: 'Wrapped Monero',
    symbol: 'WXMR',
  },
  {
    id: 8236,
    name: 'Glitch',
    symbol: 'GLCH',
  },
  {
    id: 8237,
    name: 'Basis Dollar Share',
    symbol: 'BSDS',
  },
  {
    id: 8240,
    name: 'SOAR.FI',
    symbol: 'SOAR',
  },
  {
    id: 8241,
    name: 'Prophecy',
    symbol: 'PRY',
  },
  {
    id: 8243,
    name: 'Passive Income',
    symbol: 'PSI',
  },
  {
    id: 8244,
    name: 'Coinstox',
    symbol: 'CSX',
  },
  {
    id: 8245,
    name: 'Hydra',
    symbol: 'HYDRA',
  },
  {
    id: 8247,
    name: 'PayYoda',
    symbol: 'YOT',
  },
  {
    id: 8252,
    name: 'pBTC35A',
    symbol: 'pBTC35A',
  },
  {
    id: 8253,
    name: 'Mars',
    symbol: 'Mars',
  },
  {
    id: 8254,
    name: 'Contribute DAO',
    symbol: 'TDAO',
  },
  {
    id: 8255,
    name: 'Prosper',
    symbol: 'PROS',
  },
  {
    id: 8256,
    name: 'HollyGold',
    symbol: 'HGOLD',
  },
  {
    id: 8258,
    name: 'CUDOS',
    symbol: 'CUDOS',
  },
  {
    id: 8259,
    name: 'Furucombo',
    symbol: 'COMBO',
  },
  {
    id: 8260,
    name: 'Indexed Finance',
    symbol: 'NDX',
  },
  {
    id: 8264,
    name: 'Basis Gold Share',
    symbol: 'BAGS',
  },
  {
    id: 8265,
    name: 'Helmet.insure',
    symbol: 'HELMET',
  },
  {
    id: 8266,
    name: 'Mandala Exchange Token',
    symbol: 'MDX',
  },
  {
    id: 8267,
    name: 'OEC Token',
    symbol: 'OKT',
  },
  {
    id: 8268,
    name: 'Solomon Defi',
    symbol: 'SLM',
  },
  {
    id: 8269,
    name: 'YFTether',
    symbol: 'YFTE',
  },
  {
    id: 8270,
    name: 'Gera Coin',
    symbol: 'GERA',
  },
  {
    id: 8271,
    name: 'Poolz Finance',
    symbol: 'POOLZ',
  },
  {
    id: 8272,
    name: 'THORChain (ERC20)',
    symbol: 'RUNE',
  },
  {
    id: 8273,
    name: 'Basis Gold',
    symbol: 'BAG',
  },
  {
    id: 8275,
    name: 'ISALCOIN',
    symbol: 'ISAL',
  },
  {
    id: 8276,
    name: 'Arianee',
    symbol: 'ARIA20',
  },
  {
    id: 8278,
    name: 'VEROX',
    symbol: 'VRX',
  },
  {
    id: 8279,
    name: 'e-Money',
    symbol: 'NGM',
  },
  {
    id: 8281,
    name: 'Golden Goose',
    symbol: 'GOLD',
  },
  {
    id: 8282,
    name: 'Koinos',
    symbol: 'KOIN',
  },
  {
    id: 8284,
    name: 'TokenAsset',
    symbol: 'NTB',
  },
  {
    id: 8285,
    name: 'Block Duelers NFT Battles',
    symbol: 'BDT',
  },
  {
    id: 8286,
    name: 'Excavo Finance',
    symbol: 'CAVO',
  },
  {
    id: 8288,
    name: 'Wrapped Celo',
    symbol: 'WCELO',
  },
  {
    id: 8290,
    name: 'SuperFarm',
    symbol: 'SUPER',
  },
  {
    id: 8292,
    name: 'Router Protocol',
    symbol: 'ROUTE',
  },
  {
    id: 8293,
    name: 'Zero Exchange',
    symbol: 'ZERO',
  },
  {
    id: 8294,
    name: 'Cometh',
    symbol: 'MUST',
  },
  {
    id: 8295,
    name: 'CPUcoin',
    symbol: 'CPU',
  },
  {
    id: 8296,
    name: 'KLAYswap Protocol',
    symbol: 'KSP',
  },
  {
    id: 8298,
    name: 'Paralink Network',
    symbol: 'PARA',
  },
  {
    id: 8299,
    name: 'Stake DAO',
    symbol: 'SDT',
  },
  {
    id: 8300,
    name: 'CoverCompared',
    symbol: 'CVR',
  },
  {
    id: 8302,
    name: 'QFinance',
    symbol: 'QFI',
  },
  {
    id: 8303,
    name: 'Pokeball',
    symbol: 'POKE',
  },
  {
    id: 8304,
    name: 'Rigel Finance',
    symbol: 'RIGEL',
  },
  {
    id: 8305,
    name: 'Insured Finance',
    symbol: 'INFI',
  },
  {
    id: 8307,
    name: 'DIGG',
    symbol: 'DIGG',
  },
  {
    id: 8309,
    name: 'ARMOR',
    symbol: 'ARMOR',
  },
  {
    id: 8310,
    name: 'TosDis',
    symbol: 'DIS',
  },
  {
    id: 8312,
    name: 'Bitbot Protocol',
    symbol: 'BBP',
  },
  {
    id: 8313,
    name: 'Recharge Finance',
    symbol: 'R3FI',
  },
  {
    id: 8314,
    name: 'Nydronia',
    symbol: 'NIA',
  },
  {
    id: 8316,
    name: 'XUSD Stable',
    symbol: 'XUSD',
  },
  {
    id: 8319,
    name: 'POC Blockchain',
    symbol: 'POC',
  },
  {
    id: 8320,
    name: 'PolkaBridge',
    symbol: 'PBR',
  },
  {
    id: 8321,
    name: 'STING',
    symbol: 'STN',
  },
  {
    id: 8323,
    name: 'PieDAO Balanced Crypto Pie',
    symbol: 'BCP',
  },
  {
    id: 8324,
    name: 'PieDAO Yearn Ecosystem Pie',
    symbol: 'YPIE',
  },
  {
    id: 8325,
    name: 'EOX',
    symbol: 'EOX',
  },
  {
    id: 8328,
    name: 'Armor NXM',
    symbol: 'arNXM',
  },
  {
    id: 8329,
    name: 'PAID Network',
    symbol: 'PAID',
  },
  {
    id: 8330,
    name: 'Xstable.Protocol',
    symbol: 'XST',
  },
  {
    id: 8331,
    name: 'Energy Ledger',
    symbol: 'ELX',
  },
  {
    id: 8332,
    name: 'TECHNOLOGY INNOVATION PROJECT',
    symbol: 'TIP',
  },
  {
    id: 8334,
    name: 'Kebab Token',
    symbol: 'KEBAB',
  },
  {
    id: 8335,
    name: 'Mdex',
    symbol: 'MDX',
  },
  {
    id: 8336,
    name: 'Interop',
    symbol: 'TROP',
  },
  {
    id: 8337,
    name: 'Secret (ERC20)',
    symbol: 'WSCRT',
  },
  {
    id: 8339,
    name: 'xFund',
    symbol: 'XFUND',
  },
  {
    id: 8340,
    name: 'Natus Vincere Fan Token',
    symbol: 'NAVI',
  },
  {
    id: 8341,
    name: 'Young Boys Fan Token',
    symbol: 'YBO',
  },
  {
    id: 8342,
    name: 'GameStop tokenized stock FTX',
    symbol: 'GME',
  },
  {
    id: 8343,
    name: 'AMC Entertainment Holdings tokenized stock FTX',
    symbol: 'AMC',
  },
  {
    id: 8344,
    name: 'Grayscale Bitcoin Trust tokenized stock FTX',
    symbol: 'GBTC',
  },
  {
    id: 8345,
    name: 'BlackBerry tokenized stock FTX',
    symbol: 'BB',
  },
  {
    id: 8349,
    name: 'Onooks',
    symbol: 'OOKS',
  },
  {
    id: 8350,
    name: 'Panda Yield',
    symbol: 'BBOO',
  },
  {
    id: 8351,
    name: 'OptionRoom',
    symbol: 'ROOM',
  },
  {
    id: 8352,
    name: 'Gasgains',
    symbol: 'GASG',
  },
  {
    id: 8353,
    name: 'Beacon ETH',
    symbol: 'BETH',
  },
  {
    id: 8357,
    name: 'Bitcicoin',
    symbol: 'BITCI',
  },
  {
    id: 8358,
    name: 'Potentiam',
    symbol: 'PTM',
  },
  {
    id: 8360,
    name: 'BULLS',
    symbol: 'BULLS',
  },
  {
    id: 8363,
    name: 'renDOGE',
    symbol: 'RENDOGE',
  },
  {
    id: 8364,
    name: 'Bridge Mutual',
    symbol: 'BMI',
  },
  {
    id: 8365,
    name: 'Seascape Crowns',
    symbol: 'CWS',
  },
  {
    id: 8366,
    name: 'World Token',
    symbol: 'WORLD',
  },
  {
    id: 8367,
    name: 'Name Change Token',
    symbol: 'NCT',
  },
  {
    id: 8368,
    name: 'Xeno Token',
    symbol: 'XNO',
  },
  {
    id: 8370,
    name: 'Venus BETH',
    symbol: 'VBETH',
  },
  {
    id: 8372,
    name: 'XNODE',
    symbol: 'XNODE',
  },
  {
    id: 8373,
    name: 'QUAI DAO',
    symbol: 'QUAI',
  },
  {
    id: 8374,
    name: 'protocol finance',
    symbol: 'PFI',
  },
  {
    id: 8375,
    name: 'GOGO.finance',
    symbol: 'GOGO',
  },
  {
    id: 8376,
    name: 'MASQ',
    symbol: 'MASQ',
  },
  {
    id: 8377,
    name: 'SX Network',
    symbol: 'SX',
  },
  {
    id: 8378,
    name: 'Akita Inu',
    symbol: 'AKITA',
  },
  {
    id: 8379,
    name: 'Phoswap',
    symbol: 'PHO',
  },
  {
    id: 8381,
    name: 'Soteria',
    symbol: 'WSOTE',
  },
  {
    id: 8382,
    name: 'Petrachor',
    symbol: 'PTA',
  },
  {
    id: 8383,
    name: 'Filecash',
    symbol: 'FIC',
  },
  {
    id: 8384,
    name: 'Clover Finance',
    symbol: 'CLV',
  },
  {
    id: 8385,
    name: 'Umbrella Network',
    symbol: 'UMB',
  },
  {
    id: 8386,
    name: 'Gourmet Galaxy',
    symbol: 'GUM',
  },
  {
    id: 8387,
    name: 'Auto',
    symbol: 'AUTO',
  },
  {
    id: 8388,
    name: 'REDi',
    symbol: 'REDI',
  },
  {
    id: 8389,
    name: 'BambooDeFi',
    symbol: 'BAMBOO',
  },
  {
    id: 8390,
    name: 'Strudel Finance',
    symbol: '$TRDL',
  },
  {
    id: 8393,
    name: 'Zytara dollar',
    symbol: 'ZUSD',
  },
  {
    id: 8394,
    name: 'Anime Token',
    symbol: 'ANI',
  },
  {
    id: 8397,
    name: 'FEG Token',
    symbol: 'FEG',
  },
  {
    id: 8398,
    name: 'YFIONE',
    symbol: 'YFO',
  },
  {
    id: 8399,
    name: 'Lotto',
    symbol: 'LOTTO',
  },
  {
    id: 8400,
    name: 'UniDexGas',
    symbol: 'UNDG',
  },
  {
    id: 8404,
    name: 'Option Token',
    symbol: 'OT',
  },
  {
    id: 8405,
    name: 'Butterfly Protocol',
    symbol: 'BFLY',
  },
  {
    id: 8406,
    name: 'Apron Network',
    symbol: 'APN',
  },
  {
    id: 8408,
    name: 'Govi',
    symbol: 'GOVI',
  },
  {
    id: 8409,
    name: 'Razor Network',
    symbol: 'RAZOR',
  },
  {
    id: 8410,
    name: 'NFTX Hashmasks Index',
    symbol: 'MASK',
  },
  {
    id: 8411,
    name: 'Marginswap',
    symbol: 'MFI',
  },
  {
    id: 8412,
    name: 'MP3',
    symbol: 'MP3',
  },
  {
    id: 8413,
    name: 'Rug Proof',
    symbol: 'RPT',
  },
  {
    id: 8414,
    name: 'Fairum',
    symbol: 'FAI',
  },
  {
    id: 8415,
    name: 'MeroeChain',
    symbol: 'MRC',
  },
  {
    id: 8416,
    name: 'Finxflo',
    symbol: 'FXF',
  },
  {
    id: 8418,
    name: 'CryptoTask',
    symbol: 'CTASK',
  },
  {
    id: 8419,
    name: 'APYSwap',
    symbol: 'APYS',
  },
  {
    id: 8420,
    name: 'DAO Maker',
    symbol: 'DAO',
  },
  {
    id: 8421,
    name: 'Argon',
    symbol: 'ARGON',
  },
  {
    id: 8422,
    name: 'Pangolin',
    symbol: 'PNG',
  },
  {
    id: 8423,
    name: 'Public Mint',
    symbol: 'MINT',
  },
  {
    id: 8424,
    name: 'Deri Protocol',
    symbol: 'DERI',
  },
  {
    id: 8425,
    name: 'JasmyCoin',
    symbol: 'JASMY',
  },
  {
    id: 8426,
    name: 'Filda',
    symbol: 'FILDA',
  },
  {
    id: 8427,
    name: 'Lendhub',
    symbol: 'LHB',
  },
  {
    id: 8428,
    name: 'Monster Slayer Cash',
    symbol: 'MSC',
  },
  {
    id: 8431,
    name: 'G999',
    symbol: 'G999',
  },
  {
    id: 8433,
    name: 'Chow Chow',
    symbol: 'CHOW',
  },
  {
    id: 8437,
    name: 'USDFreeLiquidity',
    symbol: 'USDFL',
  },
  {
    id: 8438,
    name: 'Hoge Finance',
    symbol: 'HOGE',
  },
  {
    id: 8439,
    name: 'Warp Finance',
    symbol: 'WARP',
  },
  {
    id: 8441,
    name: 'Cenfura Token',
    symbol: 'XCF',
  },
  {
    id: 8442,
    name: 'EthicHub',
    symbol: 'ETHIX',
  },
  {
    id: 8444,
    name: 'Gains Farm',
    symbol: 'GFARM2',
  },
  {
    id: 8445,
    name: 'SharedStake',
    symbol: 'SGT',
  },
  {
    id: 8448,
    name: 'MCOBIT',
    symbol: 'MCT',
  },
  {
    id: 8449,
    name: 'Goose Finance',
    symbol: 'EGG',
  },
  {
    id: 8450,
    name: 'Shield Finance',
    symbol: 'SHLD',
  },
  {
    id: 8452,
    name: 'Shield Protocol',
    symbol: 'SHIELD',
  },
  {
    id: 8453,
    name: 'Tigerfinance',
    symbol: 'TIGER',
  },
  {
    id: 8454,
    name: 'Radar',
    symbol: 'RADAR',
  },
  {
    id: 8455,
    name: 'TAMA EGG NiftyGotchi',
    symbol: 'TME',
  },
  {
    id: 8457,
    name: 'B20',
    symbol: 'B20',
  },
  {
    id: 8458,
    name: 'Peanut',
    symbol: 'NUX',
  },
  {
    id: 8459,
    name: 'PizzaSwap',
    symbol: 'PIZZA',
  },
  {
    id: 8462,
    name: 'Birthday Cake',
    symbol: 'BDAY',
  },
  {
    id: 8463,
    name: 'Tapmydata',
    symbol: 'TAP',
  },
  {
    id: 8464,
    name: 'YFBitcoin',
    symbol: 'YFBTC',
  },
  {
    id: 8465,
    name: 'Monster Slayer Share',
    symbol: 'MSS',
  },
  {
    id: 8467,
    name: 'Uberstate RIT 2.0',
    symbol: 'RIT20',
  },
  {
    id: 8469,
    name: 'LavaSwap',
    symbol: 'LAVA',
  },
  {
    id: 8470,
    name: 'SCV.finance Token',
    symbol: 'SCV',
  },
  {
    id: 8471,
    name: 'YieldPanda Finance',
    symbol: 'yPANDA',
  },
  {
    id: 8473,
    name: 'YieldNyan',
    symbol: 'NYAN',
  },
  {
    id: 8476,
    name: 'Premia',
    symbol: 'PREMIA',
  },
  {
    id: 8478,
    name: 'DAOventures',
    symbol: 'DVD',
  },
  {
    id: 8479,
    name: 'VAIOT',
    symbol: 'VAI',
  },
  {
    id: 8481,
    name: 'CafeSwap Token',
    symbol: 'BREW',
  },
  {
    id: 8483,
    name: 'Berry Data',
    symbol: 'BRY',
  },
  {
    id: 8484,
    name: 'Olyseum',
    symbol: 'OLY',
  },
  {
    id: 8485,
    name: 'Midas Dollar Share',
    symbol: 'MDS',
  },
  {
    id: 8486,
    name: 'Midas Dollar',
    symbol: 'MDO',
  },
  {
    id: 8487,
    name: 'TBCC',
    symbol: 'TBCC',
  },
  {
    id: 8489,
    name: 'XSGD',
    symbol: 'XSGD',
  },
  {
    id: 8490,
    name: 'Punk',
    symbol: 'PUNK',
  },
  {
    id: 8492,
    name: 'Vesper',
    symbol: 'VSP',
  },
  {
    id: 8493,
    name: 'Previse',
    symbol: 'PRVS',
  },
  {
    id: 8494,
    name: 'Modefi',
    symbol: 'MOD',
  },
  {
    id: 8495,
    name: 'Everest',
    symbol: 'ID',
  },
  {
    id: 8496,
    name: 'Wolves of Wall Street',
    symbol: 'WOWS',
  },
  {
    id: 8497,
    name: 'ApeSwap Finance',
    symbol: 'BANANA',
  },
  {
    id: 8499,
    name: '300FIT NETWORK',
    symbol: 'FIT',
  },
  {
    id: 8500,
    name: 'Nitroex',
    symbol: 'NTX',
  },
  {
    id: 8501,
    name: 'Luxurious Pro Network Token',
    symbol: 'LPNT',
  },
  {
    id: 8503,
    name: 'The Smokehouse',
    symbol: 'SMOKE',
  },
  {
    id: 8504,
    name: 'MetaWhale BTC',
    symbol: 'MWBTC',
  },
  {
    id: 8505,
    name: 'Metawhale Gold',
    symbol: 'MWG',
  },
  {
    id: 8507,
    name: 'Kimochi Finance',
    symbol: 'KIMOCHI',
  },
  {
    id: 8508,
    name: 'PoolTogether',
    symbol: 'POOL',
  },
  {
    id: 8509,
    name: 'XMON',
    symbol: 'XMON',
  },
  {
    id: 8510,
    name: 'QiSwap',
    symbol: 'QI',
  },
  {
    id: 8511,
    name: 'DeepCoin',
    symbol: 'DC',
  },
  {
    id: 8513,
    name: 'Basix',
    symbol: 'BASX',
  },
  {
    id: 8515,
    name: 'DEVA TOKEN',
    symbol: 'DEVA',
  },
  {
    id: 8517,
    name: 'BiTToken',
    symbol: 'BITT',
  },
  {
    id: 8518,
    name: 'Chickenkebab Finance',
    symbol: 'CHIK',
  },
  {
    id: 8519,
    name: 'Xend Finance',
    symbol: 'XEND',
  },
  {
    id: 8522,
    name: 'TOZEX',
    symbol: 'TOZ',
  },
  {
    id: 8524,
    name: 'Wrapped Huobi Token',
    symbol: 'WHT',
  },
  {
    id: 8525,
    name: 'Rai Reflex Index',
    symbol: 'RAI',
  },
  {
    id: 8526,
    name: 'Raydium',
    symbol: 'RAY',
  },
  {
    id: 8528,
    name: 'HashBridge Oracle',
    symbol: 'HBO',
  },
  {
    id: 8529,
    name: 'BeeSwap',
    symbol: 'BEE',
  },
  {
    id: 8530,
    name: 'StarLink',
    symbol: 'SLNV2',
  },
  {
    id: 8531,
    name: 'Quantfury Token',
    symbol: 'QTF',
  },
  {
    id: 8532,
    name: 'Hyper Credit Network',
    symbol: 'HPAY',
  },
  {
    id: 8533,
    name: 'Crow Finance',
    symbol: 'CROW',
  },
  {
    id: 8534,
    name: 'Chintai',
    symbol: 'CHEX',
  },
  {
    id: 8536,
    name: 'Mask Network',
    symbol: 'MASK',
  },
  {
    id: 8537,
    name: 'Channels',
    symbol: 'CAN',
  },
  {
    id: 8538,
    name: 'AC Milan Fan Token',
    symbol: 'ACM',
  },
  {
    id: 8540,
    name: 'HecoFi',
    symbol: 'HFI',
  },
  {
    id: 8541,
    name: 'SifChain',
    symbol: 'erowan',
  },
  {
    id: 8543,
    name: 'Kangal',
    symbol: 'KANGAL',
  },
  {
    id: 8544,
    name: 'Fractal',
    symbol: 'FCL',
  },
  {
    id: 8545,
    name: 'Launchpool',
    symbol: 'LPOOL',
  },
  {
    id: 8547,
    name: 'RamenSwap',
    symbol: 'RAMEN',
  },
  {
    id: 8548,
    name: 'Aloha',
    symbol: 'ALOHA',
  },
  {
    id: 8549,
    name: 'Polkacity',
    symbol: 'POLC',
  },
  {
    id: 8550,
    name: 'Swaprol',
    symbol: 'SWPRL',
  },
  {
    id: 8551,
    name: 'DeFi100',
    symbol: 'D100',
  },
  {
    id: 8554,
    name: 'PRCY Coin',
    symbol: 'PRCY',
  },
  {
    id: 8555,
    name: 'Viking Swap',
    symbol: 'VIKING',
  },
  {
    id: 8556,
    name: 'Tcoin',
    symbol: 'TCO',
  },
  {
    id: 8557,
    name: 'DexMex',
    symbol: 'DEXM',
  },
  {
    id: 8558,
    name: 'BT.Finance',
    symbol: 'BT',
  },
  {
    id: 8559,
    name: 'Medican Coin',
    symbol: 'MCAN',
  },
  {
    id: 8560,
    name: 'WhaleRoom',
    symbol: 'WHL',
  },
  {
    id: 8561,
    name: 'KeyFi',
    symbol: 'KEYFI',
  },
  {
    id: 8562,
    name: 'McDonalds Coin',
    symbol: 'MCDC',
  },
  {
    id: 8563,
    name: 'Extend Finance',
    symbol: 'EXF',
  },
  {
    id: 8566,
    name: 'Ballswap',
    symbol: 'BSP',
  },
  {
    id: 8567,
    name: 'HAPI',
    symbol: 'HAPI',
  },
  {
    id: 8569,
    name: 'Libonomy',
    symbol: 'LBY',
  },
  {
    id: 8571,
    name: 'Pub Finance',
    symbol: 'PINT',
  },
  {
    id: 8573,
    name: 'Koloop Basic',
    symbol: 'KPC',
  },
  {
    id: 8575,
    name: 'ProperSix',
    symbol: 'PSIX',
  },
  {
    id: 8576,
    name: 'SOTA Finance',
    symbol: 'SOTA',
  },
  {
    id: 8578,
    name: 'BigBoys Industry',
    symbol: 'BBI',
  },
  {
    id: 8579,
    name: 'Polkamarkets',
    symbol: 'POLK',
  },
  {
    id: 8585,
    name: 'Mirrored Facebook Inc',
    symbol: 'mFB',
  },
  {
    id: 8589,
    name: 'Spore Engineering',
    symbol: 'SPORE',
  },
  {
    id: 8590,
    name: 'Cyclone Protocol',
    symbol: 'CYC',
  },
  {
    id: 8593,
    name: 'FileStar',
    symbol: 'STAR',
  },
  {
    id: 8594,
    name: 'Aave Enjin',
    symbol: 'aENJ',
  },
  {
    id: 8595,
    name: 'Aave Ethereum',
    symbol: 'aETH',
  },
  {
    id: 8597,
    name: 'MP4',
    symbol: 'MP4',
  },
  {
    id: 8598,
    name: 'xSigma',
    symbol: 'SIG',
  },
  {
    id: 8599,
    name: 'xToken',
    symbol: 'XTK',
  },
  {
    id: 8600,
    name: 'Gadoshi',
    symbol: 'GADOSHI',
  },
  {
    id: 8601,
    name: 'Font',
    symbol: 'FONT',
  },
  {
    id: 8602,
    name: 'Bounce Token',
    symbol: 'AUCTION',
  },
  {
    id: 8603,
    name: 'AntiMatter',
    symbol: 'MATTER',
  },
  {
    id: 8605,
    name: 'WOWswap',
    symbol: 'WOW',
  },
  {
    id: 8607,
    name: 'Xion Finance',
    symbol: 'XGT',
  },
  {
    id: 8610,
    name: 'Decentralized Mining Exchange',
    symbol: 'DMC',
  },
  {
    id: 8611,
    name: 'VKENAF',
    symbol: 'VKNF',
  },
  {
    id: 8612,
    name: 'Float Protocol (Bank)',
    symbol: 'BANK',
  },
  {
    id: 8613,
    name: 'Alchemix',
    symbol: 'ALCX',
  },
  {
    id: 8614,
    name: 'Alchemix USD',
    symbol: 'ALUSD',
  },
  {
    id: 8615,
    name: 'Ethernity Chain',
    symbol: 'ERN',
  },
  {
    id: 8616,
    name: 'Aurox',
    symbol: 'URUS',
  },
  {
    id: 8617,
    name: 'PolkaFoundry',
    symbol: 'PKF',
  },
  {
    id: 8618,
    name: 'Multiplier',
    symbol: 'BMXX',
  },
  {
    id: 8619,
    name: 'Moola',
    symbol: 'MLA',
  },
  {
    id: 8620,
    name: 'TOWER',
    symbol: 'TOWER',
  },
  {
    id: 8621,
    name: 'yieldwatch',
    symbol: 'WATCH',
  },
  {
    id: 8622,
    name: 'Bancor Governance Token',
    symbol: 'VBNT',
  },
  {
    id: 8625,
    name: 'SaltSwap Finance',
    symbol: 'SALT',
  },
  {
    id: 8629,
    name: 'Stacker Ventures',
    symbol: 'STACK',
  },
  {
    id: 8632,
    name: 'Taco Finance',
    symbol: 'TACO',
  },
  {
    id: 8633,
    name: 'Nodestats',
    symbol: 'NS',
  },
  {
    id: 8634,
    name: 'Marsan Exchange token',
    symbol: 'MRS',
  },
  {
    id: 8635,
    name: 'xDAI',
    symbol: 'xDAI',
  },
  {
    id: 8636,
    name: 'Trodl',
    symbol: 'TRO',
  },
  {
    id: 8637,
    name: 'Tranche Finance',
    symbol: 'SLICE',
  },
  {
    id: 8638,
    name: 'MIMOSA',
    symbol: 'MIMO',
  },
  {
    id: 8640,
    name: 'Kiwi Finance',
    symbol: 'KIWI',
  },
  {
    id: 8641,
    name: 'DeFi Wizard',
    symbol: 'DWZ',
  },
  {
    id: 8642,
    name: 'Fei USD',
    symbol: 'FEI',
  },
  {
    id: 8643,
    name: 'Shadows',
    symbol: 'DOWS',
  },
  {
    id: 8644,
    name: 'Kylin',
    symbol: 'KYL',
  },
  {
    id: 8645,
    name: 'Oiler Network',
    symbol: 'OIL',
  },
  {
    id: 8646,
    name: 'Mina',
    symbol: 'MINA',
  },
  {
    id: 8647,
    name: 'MurAll',
    symbol: 'PAINT',
  },
  {
    id: 8648,
    name: 'Chain Guardians',
    symbol: 'CGG',
  },
  {
    id: 8649,
    name: 'Oxbull.tech',
    symbol: 'OXB',
  },
  {
    id: 8650,
    name: 'wanBTC',
    symbol: 'WANBTC',
  },
  {
    id: 8651,
    name: 'wanLINK',
    symbol: 'WANLINK',
  },
  {
    id: 8652,
    name: 'wanEOS',
    symbol: 'WANEOS',
  },
  {
    id: 8653,
    name: 'wanSUSHI',
    symbol: 'WANSUSHI',
  },
  {
    id: 8654,
    name: 'wanUNI',
    symbol: 'WANUNI',
  },
  {
    id: 8655,
    name: 'wanUSDC',
    symbol: 'WANUSDC',
  },
  {
    id: 8657,
    name: 'wanUSDT',
    symbol: 'WANUSDT',
  },
  {
    id: 8658,
    name: 'Wrapped WAN',
    symbol: 'WWAN',
  },
  {
    id: 8659,
    name: 'Jetfuel Finance',
    symbol: 'FUEL',
  },
  {
    id: 8660,
    name: 'BSCPAD',
    symbol: 'BSCPAD',
  },
  {
    id: 8661,
    name: 'Vortex Defi',
    symbol: 'VTX',
  },
  {
    id: 8662,
    name: 'Starter',
    symbol: 'START',
  },
  {
    id: 8663,
    name: 'Asgard finance',
    symbol: 'THOR',
  },
  {
    id: 8664,
    name: 'DragonFarm Finance',
    symbol: 'DRAGON',
  },
  {
    id: 8665,
    name: 'Parallel',
    symbol: 'PAR',
  },
  {
    id: 8666,
    name: 'DFX Finance',
    symbol: 'DFX',
  },
  {
    id: 8667,
    name: 'Degen Protocol',
    symbol: 'DGN',
  },
  {
    id: 8668,
    name: 'RYI Platinum',
    symbol: 'RYIP',
  },
  {
    id: 8669,
    name: 'Sovryn',
    symbol: 'SOV',
  },
  {
    id: 8670,
    name: 'Vow',
    symbol: 'VOW',
  },
  {
    id: 8671,
    name: 'VANCI FINANCE',
    symbol: 'VANCII',
  },
  {
    id: 8673,
    name: 'TotemFi',
    symbol: 'TOTM',
  },
  {
    id: 8674,
    name: 'AlloHash',
    symbol: 'ALH',
  },
  {
    id: 8675,
    name: 'Minds',
    symbol: 'MINDS',
  },
  {
    id: 8676,
    name: 'Pasta Finance',
    symbol: 'PASTA',
  },
  {
    id: 8677,
    name: 'Symbol',
    symbol: 'XYM',
  },
  {
    id: 8678,
    name: 'EHash',
    symbol: 'EHASH',
  },
  {
    id: 8679,
    name: 'Unido EP',
    symbol: 'UDO',
  },
  {
    id: 8680,
    name: 'DEOR',
    symbol: 'DEOR',
  },
  {
    id: 8681,
    name: 'Funder One Capital',
    symbol: 'FUNDX',
  },
  {
    id: 8682,
    name: 'Warrior Token',
    symbol: 'WAR',
  },
  {
    id: 8684,
    name: 'APOyield',
    symbol: 'SOUL',
  },
  {
    id: 8690,
    name: 'CAD Coin',
    symbol: 'CADC',
  },
  {
    id: 8691,
    name: 'DEXTF Protocol',
    symbol: 'DEXTF',
  },
  {
    id: 8693,
    name: 'Slime Finance',
    symbol: 'SLME',
  },
  {
    id: 8695,
    name: 'Blank Wallet',
    symbol: 'BLANK',
  },
  {
    id: 8697,
    name: 'Konomi Network',
    symbol: 'KONO',
  },
  {
    id: 8699,
    name: 'DEGEN Index',
    symbol: 'DEGEN',
  },
  {
    id: 8700,
    name: 'NFT Index',
    symbol: 'NFTI',
  },
  {
    id: 8701,
    name: 'Siren',
    symbol: 'SI',
  },
  {
    id: 8702,
    name: 'Ares Protocol',
    symbol: 'ARES',
  },
  {
    id: 8704,
    name: 'Playcent',
    symbol: 'PCNT',
  },
  {
    id: 8705,
    name: 'Bifrost (BNC)',
    symbol: 'BNC',
  },
  {
    id: 8707,
    name: 'Alpaca Finance',
    symbol: 'ALPACA',
  },
  {
    id: 8708,
    name: 'Big Data Protocol',
    symbol: 'BDP',
  },
  {
    id: 8709,
    name: 'ETHA Lend',
    symbol: 'ETHA',
  },
  {
    id: 8710,
    name: 'bAlpha',
    symbol: 'BALPHA',
  },
  {
    id: 8711,
    name: 'Pando',
    symbol: 'PANDO',
  },
  {
    id: 8712,
    name: 'keyTango',
    symbol: 'TANGO',
  },
  {
    id: 8713,
    name: 'Space Cow Boy',
    symbol: 'SCB',
  },
  {
    id: 8715,
    name: 'Taraxa',
    symbol: 'TARA',
  },
  {
    id: 8716,
    name: 'Convergence',
    symbol: 'CONV',
  },
  {
    id: 8717,
    name: 'Oddz',
    symbol: 'ODDZ',
  },
  {
    id: 8719,
    name: 'Illuvium',
    symbol: 'ILV',
  },
  {
    id: 8720,
    name: 'Inverse Finance',
    symbol: 'INV',
  },
  {
    id: 8723,
    name: 'Bogged Finance',
    symbol: 'BOG',
  },
  {
    id: 8725,
    name: 'YEARNYFI NETWORK',
    symbol: 'YNI',
  },
  {
    id: 8726,
    name: 'Idavoll Network',
    symbol: 'IDV',
  },
  {
    id: 8730,
    name: 'Belt Finance',
    symbol: 'BELT',
  },
  {
    id: 8731,
    name: 'CryptEx',
    symbol: 'CRX',
  },
  {
    id: 8732,
    name: 'Swop',
    symbol: 'SWOP',
  },
  {
    id: 8733,
    name: 'BasketCoin',
    symbol: 'BSKT',
  },
  {
    id: 8735,
    name: 'Panda Dao',
    symbol: 'PDAO',
  },
  {
    id: 8736,
    name: 'HyruleSwap',
    symbol: 'RUPEE',
  },
  {
    id: 8737,
    name: 'GSPI Shopping.io Governance',
    symbol: 'GSPI',
  },
  {
    id: 8738,
    name: 'Pastel',
    symbol: 'PSL',
  },
  {
    id: 8740,
    name: 'SHD CASH',
    symbol: 'SHDC',
  },
  {
    id: 8741,
    name: 'Sovi Finance',
    symbol: 'SOVI',
  },
  {
    id: 8744,
    name: 'Toshimon',
    symbol: 'TOSHI',
  },
  {
    id: 8745,
    name: 'A2A',
    symbol: 'A2A',
  },
  {
    id: 8746,
    name: 'Project Inverse',
    symbol: 'XIV',
  },
  {
    id: 8747,
    name: 'CheesecakeSwap Token',
    symbol: 'CCAKE',
  },
  {
    id: 8748,
    name: 'Niubi Swap',
    symbol: 'NIU',
  },
  {
    id: 8750,
    name: 'Prime Whiterock Company',
    symbol: 'PWC',
  },
  {
    id: 8752,
    name: 'Landbox',
    symbol: 'LAND',
  },
  {
    id: 8753,
    name: 'srnArt Gallery',
    symbol: 'SACT',
  },
  {
    id: 8755,
    name: 'Nerve Finance',
    symbol: 'NRV',
  },
  {
    id: 8757,
    name: 'SafeMoon',
    symbol: 'SAFEMOON',
  },
  {
    id: 8758,
    name: 'dFuture',
    symbol: 'DFT',
  },
  {
    id: 8759,
    name: 'ZCore Finance',
    symbol: 'ZEFI',
  },
  {
    id: 8760,
    name: 'EsportsPro',
    symbol: 'ESPRO',
  },
  {
    id: 8761,
    name: 'Decentralized Nations',
    symbol: 'DENA',
  },
  {
    id: 8763,
    name: 'VeraSwap',
    symbol: 'VRAP',
  },
  {
    id: 8765,
    name: 'aWSB',
    symbol: 'aWSB',
  },
  {
    id: 8766,
    name: 'MyNeighborAlice',
    symbol: 'ALICE',
  },
  {
    id: 8767,
    name: 'Unifund',
    symbol: 'IFUND',
  },
  {
    id: 8769,
    name: 'MeetPle',
    symbol: 'MPT',
  },
  {
    id: 8770,
    name: 'Astronaut',
    symbol: 'NAUT',
  },
  {
    id: 8771,
    name: 'GYEN',
    symbol: 'GYEN',
  },
  {
    id: 8772,
    name: 'ZUSD',
    symbol: 'ZUSD',
  },
  {
    id: 8773,
    name: 'Octree',
    symbol: 'OCT',
  },
  {
    id: 8774,
    name: 'FlourMix',
    symbol: 'FLO',
  },
  {
    id: 8777,
    name: 'Biscuit Farm Finance',
    symbol: 'BCU',
  },
  {
    id: 8778,
    name: 'Whirl Finance',
    symbol: 'WHIRL',
  },
  {
    id: 8780,
    name: 'Umbria Network',
    symbol: 'UMBR',
  },
  {
    id: 8782,
    name: 'BitcoinVend',
    symbol: 'BCVT',
  },
  {
    id: 8783,
    name: 'Transmute Protocol',
    symbol: 'XPB',
  },
  {
    id: 8784,
    name: 'NFTL Token',
    symbol: 'NFTL',
  },
  {
    id: 8787,
    name: 'UBU Finance',
    symbol: 'UBU',
  },
  {
    id: 8788,
    name: 'CELEBPLUS',
    symbol: 'CELEB',
  },
  {
    id: 8789,
    name: 'EDDASwap',
    symbol: 'EDDA',
  },
  {
    id: 8790,
    name: 'KINE',
    symbol: 'KINE',
  },
  {
    id: 8791,
    name: 'CyberTime Finance Token',
    symbol: 'CTF',
  },
  {
    id: 8794,
    name: 'Typhoon Network',
    symbol: 'TYPH',
  },
  {
    id: 8795,
    name: 'Mute',
    symbol: 'MUTE',
  },
  {
    id: 8796,
    name: 'Bearn',
    symbol: 'BFI',
  },
  {
    id: 8797,
    name: 'Chronicle',
    symbol: 'XNL',
  },
  {
    id: 8798,
    name: 'Ramifi Protocol',
    symbol: 'RAM',
  },
  {
    id: 8799,
    name: 'InsurAce',
    symbol: 'INSUR',
  },
  {
    id: 8800,
    name: 'Dora Factory',
    symbol: 'DORA',
  },
  {
    id: 8801,
    name: 'Lightning',
    symbol: 'LIGHT',
  },
  {
    id: 8802,
    name: 'Kindcow Finance',
    symbol: 'KIND',
  },
  {
    id: 8804,
    name: 'PREDIQT',
    symbol: 'PQT',
  },
  {
    id: 8806,
    name: 'Carnomaly',
    symbol: 'CARR',
  },
  {
    id: 8807,
    name: 'EXRT Network',
    symbol: 'EXRT',
  },
  {
    id: 8808,
    name: 'Treat DAO [old]',
    symbol: 'TREAT',
  },
  {
    id: 8810,
    name: 'Haze Finance',
    symbol: 'HAZE',
  },
  {
    id: 8811,
    name: 'FlashX Ultra',
    symbol: 'FSXU',
  },
  {
    id: 8813,
    name: 'LABS Group',
    symbol: 'LABS',
  },
  {
    id: 8814,
    name: 'Donnie Finance',
    symbol: 'DON',
  },
  {
    id: 8815,
    name: 'Shadetech',
    symbol: 'SHD',
  },
  {
    id: 8818,
    name: 'UnderDog',
    symbol: 'DOG',
  },
  {
    id: 8820,
    name: 'Evrice',
    symbol: 'EVC',
  },
  {
    id: 8823,
    name: 'Poodl Token',
    symbol: 'POODL',
  },
  {
    id: 8826,
    name: 'Moss Carbon Credit',
    symbol: 'MCO2',
  },
  {
    id: 8827,
    name: 'Boson Protocol',
    symbol: 'BOSON',
  },
  {
    id: 8828,
    name: 'NFT POOL',
    symbol: 'NFTP',
  },
  {
    id: 8829,
    name: 'Pig Finance',
    symbol: 'PIG',
  },
  {
    id: 8832,
    name: 'AlgoVest',
    symbol: 'AVS',
  },
  {
    id: 8833,
    name: 'DeGate',
    symbol: 'DG',
  },
  {
    id: 8835,
    name: 'xMARK',
    symbol: 'XMARK',
  },
  {
    id: 8836,
    name: 'SuperBid',
    symbol: 'SUPERBID',
  },
  {
    id: 8837,
    name: 'Scholarship Coin',
    symbol: 'SCHO',
  },
  {
    id: 8839,
    name: 'Eternal Cash',
    symbol: 'EC',
  },
  {
    id: 8840,
    name: 'DailySwap Token',
    symbol: 'DAILYS',
  },
  {
    id: 8841,
    name: 'Arro Social',
    symbol: 'ARRO',
  },
  {
    id: 8843,
    name: 'BSCView',
    symbol: 'BSCV',
  },
  {
    id: 8844,
    name: 'SPRINK',
    symbol: 'SPRINK',
  },
  {
    id: 8845,
    name: 'Lepricon',
    symbol: 'L3P',
  },
  {
    id: 8847,
    name: 'Fomo App',
    symbol: 'PAPER',
  },
  {
    id: 8849,
    name: 'AXIS Token',
    symbol: 'AXIS',
  },
  {
    id: 8850,
    name: 'Viper Protocol',
    symbol: 'VIPER',
  },
  {
    id: 8851,
    name: 'EFT.finance',
    symbol: 'EFT',
  },
  {
    id: 8852,
    name: 'UME Token',
    symbol: 'UME',
  },
  {
    id: 8853,
    name: 'Brickchain Finance',
    symbol: 'BRICK',
  },
  {
    id: 8854,
    name: 'FXT Token',
    symbol: 'FXT',
  },
  {
    id: 8856,
    name: 'Mango Finance',
    symbol: 'MANGO',
  },
  {
    id: 8857,
    name: 'Anchor Protocol',
    symbol: 'ANC',
  },
  {
    id: 8858,
    name: 'Cub Finance',
    symbol: 'CUB',
  },
  {
    id: 8859,
    name: 'CoffeeSwap',
    symbol: 'COFFEE',
  },
  {
    id: 8860,
    name: 'WaterDefi',
    symbol: 'WATER',
  },
  {
    id: 8862,
    name: 'Rage Fan',
    symbol: 'RAGE',
  },
  {
    id: 8863,
    name: 'Splyt',
    symbol: 'SHOPX',
  },
  {
    id: 8864,
    name: 'Quam Network',
    symbol: 'QUAM',
  },
  {
    id: 8865,
    name: 'vBSWAP',
    symbol: 'VBSWAP',
  },
  {
    id: 8866,
    name: 'BSC TOOLS',
    symbol: 'TOOLS',
  },
  {
    id: 8867,
    name: 'DeHive',
    symbol: 'DHV',
  },
  {
    id: 8868,
    name: '50x.com',
    symbol: '50X',
  },
  {
    id: 8870,
    name: 'Tutti Frutti',
    symbol: 'TFF',
  },
  {
    id: 8871,
    name: 'RYI Unity',
    symbol: 'RYIU',
  },
  {
    id: 8872,
    name: 'Safe Star',
    symbol: 'SAFESTAR',
  },
  {
    id: 8873,
    name: 'GoSwapp',
    symbol: 'GOFI',
  },
  {
    id: 8874,
    name: 'DAFI Protocol',
    symbol: 'DAFI',
  },
  {
    id: 8875,
    name: 'Uno Re',
    symbol: 'UNO',
  },
  {
    id: 8877,
    name: 'KIWIGO',
    symbol: 'KGO',
  },
  {
    id: 8879,
    name: 'Pika',
    symbol: 'PIKA',
  },
  {
    id: 8880,
    name: 'MacaronSwap',
    symbol: 'MCRN',
  },
  {
    id: 8881,
    name: 'MOCHISWAP',
    symbol: 'MOCHI',
  },
  {
    id: 8882,
    name: 'Alliance Fan Token',
    symbol: 'ALL',
  },
  {
    id: 8883,
    name: 'Sint-Truidense Voetbalvereniging Fan Token',
    symbol: 'STV',
  },
  {
    id: 8884,
    name: 'İstanbul Başakşehir Fan Token',
    symbol: 'IBFK',
  },
  {
    id: 8885,
    name: 'Novara Calcio Fan Token',
    symbol: 'NOV',
  },
  {
    id: 8886,
    name: 'USDP Stablecoin',
    symbol: 'USDP',
  },
  {
    id: 8889,
    name: 'Oracle Top 5 Tokens Index',
    symbol: 'ORCL5',
  },
  {
    id: 8891,
    name: 'Bitcoin Standard Hashrate Token',
    symbol: 'BTCST',
  },
  {
    id: 8892,
    name: 'Klondike BTC',
    symbol: 'KBTC',
  },
  {
    id: 8893,
    name: 'Cream ETH 2',
    symbol: 'CRETH2',
  },
  {
    id: 8894,
    name: 'Deeper Network',
    symbol: 'DPR',
  },
  {
    id: 8895,
    name: 'ORAO Network',
    symbol: 'ORAO',
  },
  {
    id: 8896,
    name: 'Unslashed Finance',
    symbol: 'USF',
  },
  {
    id: 8897,
    name: 'KickPad',
    symbol: 'KPAD',
  },
  {
    id: 8899,
    name: 'xSUSHI',
    symbol: 'XSUSHI',
  },
  {
    id: 8901,
    name: 'Rare Pepe',
    symbol: 'RPEPE',
  },
  {
    id: 8902,
    name: 'FM Gallery',
    symbol: 'FMG',
  },
  {
    id: 8904,
    name: 'renZEC',
    symbol: 'RENZEC',
  },
  {
    id: 8905,
    name: 'BitSong',
    symbol: 'BTSG',
  },
  {
    id: 8907,
    name: 'Farming Bad',
    symbol: 'METH',
  },
  {
    id: 8909,
    name: 'Stater',
    symbol: 'STR',
  },
  {
    id: 8910,
    name: 'Daily',
    symbol: 'DAILY',
  },
  {
    id: 8911,
    name: 'Strike',
    symbol: 'STRK',
  },
  {
    id: 8912,
    name: 'Tidal Finance',
    symbol: 'TIDAL',
  },
  {
    id: 8913,
    name: 'DaftCoin',
    symbol: 'DAFT',
  },
  {
    id: 8915,
    name: 'Battle Pets',
    symbol: 'PET',
  },
  {
    id: 8916,
    name: 'Internet Computer',
    symbol: 'ICP',
  },
  {
    id: 8917,
    name: 'Shyft Network',
    symbol: 'SHFT',
  },
  {
    id: 8918,
    name: 'Matic Aave Interest Bearing USDC',
    symbol: 'MAUSDC',
  },
  {
    id: 8919,
    name: 'Matic Aave Interest Bearing USDT',
    symbol: 'MAUSDT',
  },
  {
    id: 8920,
    name: 'Matic Aave Interest Bearing AAVE',
    symbol: 'MAAAVE',
  },
  {
    id: 8921,
    name: 'Matic Aave Interest Bearing YFI',
    symbol: 'MAYFI',
  },
  {
    id: 8922,
    name: 'Matic Aave Interest Bearing UNI',
    symbol: 'MAUNI',
  },
  {
    id: 8923,
    name: 'Matic Aave Interest Bearing LINK',
    symbol: 'MALINK',
  },
  {
    id: 8924,
    name: 'Matic Aave Interest Bearing WETH',
    symbol: 'MAWETH',
  },
  {
    id: 8925,
    name: 'Wrapped Matic',
    symbol: 'WMATIC',
  },
  {
    id: 8926,
    name: 'A2DAO',
    symbol: 'ATD',
  },
  {
    id: 8927,
    name: 'NFT Wars',
    symbol: 'WAR',
  },
  {
    id: 8928,
    name: 'Pocket Bomb',
    symbol: 'PBOM',
  },
  {
    id: 8929,
    name: 'OREO',
    symbol: 'ORE',
  },
  {
    id: 8930,
    name: 'ebox',
    symbol: 'EBOX',
  },
  {
    id: 8931,
    name: 'Collective',
    symbol: 'CO2',
  },
  {
    id: 8932,
    name: 'FarSwap',
    symbol: 'FAR',
  },
  {
    id: 8934,
    name: 'StakerDAO',
    symbol: 'STKR',
  },
  {
    id: 8936,
    name: 'Trias Token (new)',
    symbol: 'TRIAS',
  },
  {
    id: 8937,
    name: 'Woonkly Power',
    symbol: 'WOOP',
  },
  {
    id: 8938,
    name: 'Ellipsis',
    symbol: 'EPS',
  },
  {
    id: 8939,
    name: 'Nimbus',
    symbol: 'NBU',
  },
  {
    id: 8942,
    name: 'Paybswap',
    symbol: 'PAYB',
  },
  {
    id: 8943,
    name: 'WHITEX',
    symbol: 'WHX',
  },
  {
    id: 8944,
    name: 'HOGL finance',
    symbol: 'HOGL',
  },
  {
    id: 8945,
    name: 'StakedZEN',
    symbol: 'STZEN',
  },
  {
    id: 8946,
    name: 'Habitat',
    symbol: 'HBT',
  },
  {
    id: 8947,
    name: 'COPS FINANCE',
    symbol: 'COPS',
  },
  {
    id: 8949,
    name: 'IFToken',
    symbol: 'IFT',
  },
  {
    id: 8950,
    name: 'Cash Tech',
    symbol: 'CATE',
  },
  {
    id: 8951,
    name: 'ThunderSwap',
    symbol: 'TNDR',
  },
  {
    id: 8952,
    name: 'Farm Space',
    symbol: 'SPACE',
  },
  {
    id: 8955,
    name: 'Vancat',
    symbol: 'VANCAT',
  },
  {
    id: 8957,
    name: 'Bitcoin Asset',
    symbol: 'BTA',
  },
  {
    id: 8959,
    name: 'NCAT Token',
    symbol: 'NCAT',
  },
  {
    id: 8960,
    name: 'LNAsolution Coin',
    symbol: 'LAS',
  },
  {
    id: 8961,
    name: 'Futureswap',
    symbol: 'FST',
  },
  {
    id: 8962,
    name: 'ETNA Network',
    symbol: 'ETNA',
  },
  {
    id: 8963,
    name: 'UnMarshal',
    symbol: 'MARSH',
  },
  {
    id: 8964,
    name: 'Blizzard.money',
    symbol: 'xBLZD',
  },
  {
    id: 8966,
    name: 'Safemars',
    symbol: 'SAFEMARS',
  },
  {
    id: 8968,
    name: 'Polychain Monsters',
    symbol: 'PMON',
  },
  {
    id: 8970,
    name: 'Polkalokr',
    symbol: 'LKR',
  },
  {
    id: 8971,
    name: 'MerchDAO',
    symbol: 'MRCH',
  },
  {
    id: 8972,
    name: 'Seedify.fund',
    symbol: 'SFUND',
  },
  {
    id: 8974,
    name: 'Polka Ventures',
    symbol: 'POLVEN',
  },
  {
    id: 8978,
    name: 'PooCoin',
    symbol: 'POOCOIN',
  },
  {
    id: 8981,
    name: 'WardenSwap',
    symbol: 'WAD',
  },
  {
    id: 8984,
    name: 'BlowFish',
    symbol: 'BLOWF',
  },
  {
    id: 8985,
    name: 'Efinity Token',
    symbol: 'EFI',
  },
  {
    id: 8987,
    name: 'InvictusCapital.com Token',
    symbol: 'ICAP',
  },
  {
    id: 8990,
    name: 'Charizard Token',
    symbol: 'CHZ006',
  },
  {
    id: 8992,
    name: 'Cellframe',
    symbol: 'CELL',
  },
  {
    id: 8993,
    name: 'SafeBitcoin',
    symbol: 'SAFEBTC',
  },
  {
    id: 8994,
    name: 'Delta',
    symbol: 'DELTA',
  },
  {
    id: 8996,
    name: 'Mogul Productions',
    symbol: 'STARS',
  },
  {
    id: 8997,
    name: 'Cook Protocol',
    symbol: 'COOK',
  },
  {
    id: 8999,
    name: 'Collateral Pay',
    symbol: 'COLL',
  },
  {
    id: 9002,
    name: 'Busy DAO',
    symbol: 'BUSY',
  },
  {
    id: 9005,
    name: 'Connectico',
    symbol: 'CON',
  },
  {
    id: 9006,
    name: 'MoonDAO',
    symbol: 'MNDAO',
  },
  {
    id: 9007,
    name: 'ZooCoin',
    symbol: 'ZOO',
  },
  {
    id: 9008,
    name: 'AMMYI Coin',
    symbol: 'AMI',
  },
  {
    id: 9009,
    name: 'SaturnV Gold v2',
    symbol: 'SATVGv2',
  },
  {
    id: 9014,
    name: 'Converter.Finance',
    symbol: 'CON',
  },
  {
    id: 9015,
    name: 'Cope',
    symbol: 'COPE',
  },
  {
    id: 9016,
    name: 'DAOhaus',
    symbol: 'HAUS',
  },
  {
    id: 9017,
    name: 'Polkadex',
    symbol: 'PDEX',
  },
  {
    id: 9018,
    name: 'GamyFi Platform',
    symbol: 'GFX',
  },
  {
    id: 9020,
    name: 'Toko Token',
    symbol: 'TKO',
  },
  {
    id: 9021,
    name: 'Wrapped XDAI',
    symbol: 'wxDai',
  },
  {
    id: 9022,
    name: 'Satoshi',
    symbol: 'SATS',
  },
  {
    id: 9023,
    name: 'Bit',
    symbol: 'BITS',
  },
  {
    id: 9024,
    name: 'disBalancer',
    symbol: 'DDOS',
  },
  {
    id: 9025,
    name: 'Tribe',
    symbol: 'TRIBE',
  },
  {
    id: 9026,
    name: 'Blind Boxes',
    symbol: 'BLES',
  },
  {
    id: 9027,
    name: 'Uhive',
    symbol: 'HVE2',
  },
  {
    id: 9029,
    name: 'Graphlinq Protocol',
    symbol: 'GLQ',
  },
  {
    id: 9031,
    name: 'Meliora',
    symbol: 'MORA',
  },
  {
    id: 9032,
    name: 'DDS.Store',
    symbol: 'DDS',
  },
  {
    id: 9033,
    name: 'LCMS',
    symbol: 'LCMS',
  },
  {
    id: 9034,
    name: 'pETH18C',
    symbol: 'pETH18C',
  },
  {
    id: 9035,
    name: 'Vidiachange',
    symbol: 'VIDA',
  },
  {
    id: 9036,
    name: 'Nebulaprotocol',
    symbol: 'SNBL',
  },
  {
    id: 9038,
    name: 'HyperAlloy',
    symbol: 'ALLOY',
  },
  {
    id: 9039,
    name: 'Pilot',
    symbol: 'PTD',
  },
  {
    id: 9040,
    name: 'Pundi X[new]',
    symbol: 'PUNDIX',
  },
  {
    id: 9041,
    name: 'MU DANK',
    symbol: 'DANK',
  },
  {
    id: 9043,
    name: 'Stone DeFi',
    symbol: 'STN',
  },
  {
    id: 9045,
    name: 'JPYC',
    symbol: 'JPYC',
  },
  {
    id: 9046,
    name: '8PAY',
    symbol: '8PAY',
  },
  {
    id: 9047,
    name: 'CARD.STARTER',
    symbol: 'CARDS',
  },
  {
    id: 9048,
    name: 'Xpool',
    symbol: 'XPO',
  },
  {
    id: 9049,
    name: 'Gorilla-Fi',
    symbol: 'GFI',
  },
  {
    id: 9051,
    name: 'Swirl Cash',
    symbol: 'SWIRL',
  },
  {
    id: 9053,
    name: 'UREEQA',
    symbol: 'URQA',
  },
  {
    id: 9054,
    name: 'Robo Token',
    symbol: 'ROBO',
  },
  {
    id: 9055,
    name: 'BerrySwap',
    symbol: 'BERRY',
  },
  {
    id: 9056,
    name: 'Rebasing Liquidity',
    symbol: 'DELTA-RLP',
  },
  {
    id: 9057,
    name: 'VYNK CHAIN',
    symbol: 'VYNC',
  },
  {
    id: 9059,
    name: 'Mero',
    symbol: 'MERO',
  },
  {
    id: 9060,
    name: 'BTA Protocol',
    symbol: 'BTAP',
  },
  {
    id: 9061,
    name: 'Rainicorn',
    symbol: 'RAINI',
  },
  {
    id: 9062,
    name: 'LinkPool',
    symbol: 'LPL',
  },
  {
    id: 9063,
    name: 'Tcake',
    symbol: 'TCAKE',
  },
  {
    id: 9064,
    name: 'Sting Defi',
    symbol: 'SDFI',
  },
  {
    id: 9065,
    name: 'Realfinance Network',
    symbol: 'REFI',
  },
  {
    id: 9066,
    name: 'DCTDAO',
    symbol: 'DCTD',
  },
  {
    id: 9067,
    name: 'Olympus',
    symbol: 'OHM',
  },
  {
    id: 9068,
    name: 'Nodeseeds',
    symbol: 'NDS',
  },
  {
    id: 9069,
    name: 'Goatcoin',
    symbol: 'GOAT',
  },
  {
    id: 9070,
    name: 'CFX Quantum',
    symbol: 'CFXQ',
  },
  {
    id: 9071,
    name: 'Chainge',
    symbol: 'CHNG',
  },
  {
    id: 9073,
    name: 'Popsicle Finance',
    symbol: 'ICE',
  },
  {
    id: 9074,
    name: 'ZUZ Protocol',
    symbol: 'ZUZ',
  },
  {
    id: 9075,
    name: 'Bafi Finance',
    symbol: 'BAFI',
  },
  {
    id: 9077,
    name: 'WasabiX',
    symbol: 'WASABI',
  },
  {
    id: 9078,
    name: 'FansCoin',
    symbol: 'FC',
  },
  {
    id: 9081,
    name: 'SafeEarth',
    symbol: 'SAFEEARTH',
  },
  {
    id: 9082,
    name: 'Swampy',
    symbol: 'SWAMP',
  },
  {
    id: 9083,
    name: 'Equalizer',
    symbol: 'EQZ',
  },
  {
    id: 9087,
    name: 'xDeFi',
    symbol: 'XDEX',
  },
  {
    id: 9089,
    name: 'Tenset',
    symbol: '10SET',
  },
  {
    id: 9092,
    name: 'XBE Token',
    symbol: 'XBE',
  },
  {
    id: 9093,
    name: 'Mixty Finance',
    symbol: 'MXF',
  },
  {
    id: 9095,
    name: 'Relite Finance',
    symbol: 'RELI',
  },
  {
    id: 9096,
    name: 'Vlad Finance',
    symbol: 'VLAD',
  },
  {
    id: 9097,
    name: 'Try.Finance',
    symbol: 'TRY',
  },
  {
    id: 9098,
    name: 'dART Insurance',
    symbol: 'dART',
  },
  {
    id: 9101,
    name: 'GYA',
    symbol: 'GYA',
  },
  {
    id: 9103,
    name: 'GAMEE',
    symbol: 'GMEE',
  },
  {
    id: 9104,
    name: 'AIOZ Network',
    symbol: 'AIOZ',
  },
  {
    id: 9105,
    name: 'ARTX Trading',
    symbol: 'ARTX',
  },
  {
    id: 9107,
    name: 'ZilSwap',
    symbol: 'ZWAP',
  },
  {
    id: 9108,
    name: 'Method Finance',
    symbol: 'MTHD',
  },
  {
    id: 9109,
    name: 'Savix',
    symbol: 'SVX',
  },
  {
    id: 9110,
    name: 'Kattana',
    symbol: 'KTN',
  },
  {
    id: 9111,
    name: 'Ethereum Push Notification Service',
    symbol: 'PUSH',
  },
  {
    id: 9114,
    name: 'τBitcoin',
    symbol: 'ΤBTC',
  },
  {
    id: 9115,
    name: 'WorkQuest Token',
    symbol: 'WQT',
  },
  {
    id: 9116,
    name: 'Finminity',
    symbol: 'FMT',
  },
  {
    id: 9118,
    name: 'Scaleswap',
    symbol: 'SCA',
  },
  {
    id: 9119,
    name: 'Alien Worlds',
    symbol: 'TLM',
  },
  {
    id: 9120,
    name: 'Franklin',
    symbol: 'FLY',
  },
  {
    id: 9121,
    name: 'CUE Protocol',
    symbol: 'CUE',
  },
  {
    id: 9122,
    name: 'COMOS Finance',
    symbol: 'COMOS',
  },
  {
    id: 9123,
    name: 'Secret Finance',
    symbol: 'SEFI',
  },
  {
    id: 9124,
    name: 'Manyswap',
    symbol: 'MANY',
  },
  {
    id: 9125,
    name: 'Gains Associates',
    symbol: 'GAINS',
  },
  {
    id: 9126,
    name: 'Wrapped ECOMI',
    symbol: 'WOMI',
  },
  {
    id: 9131,
    name: 'Alchemist',
    symbol: 'MIST',
  },
  {
    id: 9132,
    name: 'MobiFi',
    symbol: 'MoFi',
  },
  {
    id: 9134,
    name: 'Beyondfi',
    symbol: 'BYN',
  },
  {
    id: 9138,
    name: 'PhoenixDefi.Finance',
    symbol: 'PNIX',
  },
  {
    id: 9139,
    name: 'Yetucoin',
    symbol: 'YETU',
  },
  {
    id: 9140,
    name: 'Moonshot',
    symbol: 'MOONSHOT',
  },
  {
    id: 9141,
    name: 'Milk Token',
    symbol: 'MILK',
  },
  {
    id: 9142,
    name: 'Lemur Finance',
    symbol: 'LEM',
  },
  {
    id: 9144,
    name: 'RAI Finance',
    symbol: 'RAI',
  },
  {
    id: 9145,
    name: 'Yellow Road',
    symbol: 'ROAD',
  },
  {
    id: 9147,
    name: 'yBEAR.finance',
    symbol: 'YBEAR',
  },
  {
    id: 9148,
    name: 'Drep [new]',
    symbol: 'DREP',
  },
  {
    id: 9149,
    name: 'Cryptonovae',
    symbol: 'YAE',
  },
  {
    id: 9150,
    name: 'Orakuru',
    symbol: 'ORK',
  },
  {
    id: 9151,
    name: 'ShardingDAO',
    symbol: 'SHD',
  },
  {
    id: 9152,
    name: 'Octree Finance',
    symbol: 'OAK',
  },
  {
    id: 9153,
    name: 'Interest Bearing Defi Pulse Index',
    symbol: 'BDPI',
  },
  {
    id: 9154,
    name: 'Elastic Governance',
    symbol: 'EGT',
  },
  {
    id: 9155,
    name: 'Digital Fitness',
    symbol: 'DEFIT',
  },
  {
    id: 9157,
    name: 'BasketDAO',
    symbol: 'BASK',
  },
  {
    id: 9158,
    name: 'moonwolf.io',
    symbol: 'WOLF',
  },
  {
    id: 9160,
    name: 'Linkflow Finance',
    symbol: 'LF',
  },
  {
    id: 9161,
    name: 'Brainaut Defi',
    symbol: 'BRN',
  },
  {
    id: 9162,
    name: 'Blue Swap',
    symbol: 'BLUE',
  },
  {
    id: 9163,
    name: 'Secure Pad',
    symbol: 'SEPA',
  },
  {
    id: 9164,
    name: 'Depth Token',
    symbol: 'DEP',
  },
  {
    id: 9167,
    name: 'BaTorrent',
    symbol: 'BA',
  },
  {
    id: 9168,
    name: 'PYXIS Network',
    symbol: 'PYX',
  },
  {
    id: 9169,
    name: 'MMAON',
    symbol: 'MMAON',
  },
  {
    id: 9170,
    name: 'Visor.Finance',
    symbol: 'VISR',
  },
  {
    id: 9171,
    name: 'AMPnet Asset Platform and Exchange',
    symbol: 'AAPX',
  },
  {
    id: 9172,
    name: 'Professional Fighters League Fan Token',
    symbol: 'PFL',
  },
  {
    id: 9173,
    name: 'Raze Network',
    symbol: 'RAZE',
  },
  {
    id: 9175,
    name: 'MOBOX',
    symbol: 'MBOX',
  },
  {
    id: 9176,
    name: 'Rocket Vault-RocketX',
    symbol: 'RVF',
  },
  {
    id: 9177,
    name: 'Pitbull',
    symbol: 'PIT',
  },
  {
    id: 9178,
    name: 'ELONGATE',
    symbol: 'ELONGATE',
  },
  {
    id: 9179,
    name: 'Defi For You',
    symbol: 'DFY',
  },
  {
    id: 9180,
    name: 'SYL',
    symbol: 'SYL',
  },
  {
    id: 9182,
    name: 'ZilPay Wallet / Dragon Zil Token',
    symbol: 'ZLP',
  },
  {
    id: 9185,
    name: 'FairEclipse',
    symbol: 'FECLIPSE',
  },
  {
    id: 9186,
    name: 'Dark Matter',
    symbol: 'DMT',
  },
  {
    id: 9187,
    name: 'MY IDENTITY COIN',
    symbol: 'MYID',
  },
  {
    id: 9188,
    name: 'Globe Derivative Exchange',
    symbol: 'GDT',
  },
  {
    id: 9191,
    name: 'Occam.Fi',
    symbol: 'OCC',
  },
  {
    id: 9193,
    name: 'Prostarter',
    symbol: 'PROT',
  },
  {
    id: 9194,
    name: 'Saito',
    symbol: 'SAITO',
  },
  {
    id: 9196,
    name: 'Genesis Shards',
    symbol: 'GS',
  },
  {
    id: 9198,
    name: 'Hord',
    symbol: 'HORD',
  },
  {
    id: 9199,
    name: 'Chord Protocol',
    symbol: 'CHORD',
  },
  {
    id: 9200,
    name: 'Revomon',
    symbol: 'REVO',
  },
  {
    id: 9201,
    name: 'StackOs',
    symbol: 'STACK',
  },
  {
    id: 9203,
    name: 'Gambit',
    symbol: 'GMT',
  },
  {
    id: 9205,
    name: 'K21',
    symbol: 'K21',
  },
  {
    id: 9206,
    name: 'Trustworks',
    symbol: 'TRUST',
  },
  {
    id: 9207,
    name: 'Metaverse Index',
    symbol: 'MVI',
  },
  {
    id: 9208,
    name: 'SafeLight',
    symbol: 'SAFELIGHT',
  },
  {
    id: 9210,
    name: 'Pollo Dollar',
    symbol: 'PDO',
  },
  {
    id: 9212,
    name: 'CumRocket',
    symbol: 'CUMMIES',
  },
  {
    id: 9213,
    name: 'Moon Stop',
    symbol: 'MNSTP',
  },
  {
    id: 9214,
    name: 'MoonStar',
    symbol: 'MOONSTAR',
  },
  {
    id: 9217,
    name: 'XFai',
    symbol: 'XFIT',
  },
  {
    id: 9218,
    name: 'Mist',
    symbol: 'MIST',
  },
  {
    id: 9220,
    name: 'StrikeX',
    symbol: 'STRX',
  },
  {
    id: 9222,
    name: 'LuckTogether',
    symbol: 'LUCK',
  },
  {
    id: 9223,
    name: 'Alchemist DeFi Mist',
    symbol: 'MIST',
  },
  {
    id: 9224,
    name: 'Alchemist DeFi Aurum',
    symbol: 'AURUM',
  },
  {
    id: 9225,
    name: 'Rigel Protocol',
    symbol: 'RGP',
  },
  {
    id: 9226,
    name: 'ziot Coin',
    symbol: 'ZIOT',
  },
  {
    id: 9227,
    name: 'Raven X',
    symbol: 'RX',
  },
  {
    id: 9228,
    name: 'Martian DAO',
    symbol: 'MDAO',
  },
  {
    id: 9229,
    name: 'WHEAT Token',
    symbol: 'WHEAT',
  },
  {
    id: 9230,
    name: 'Value Network',
    symbol: 'VNTW',
  },
  {
    id: 9231,
    name: 'Hungry Bear',
    symbol: 'HUNGRY',
  },
  {
    id: 9233,
    name: 'IQONIQ FanEcoSystem',
    symbol: 'IQQ',
  },
  {
    id: 9234,
    name: 'Froge Finance',
    symbol: 'FROGE',
  },
  {
    id: 9235,
    name: 'Hyper Finance',
    symbol: 'HYFI',
  },
  {
    id: 9236,
    name: 'TopBidder',
    symbol: 'BID',
  },
  {
    id: 9237,
    name: 'Horizon Protocol',
    symbol: 'HZN',
  },
  {
    id: 9238,
    name: 'Mofi Finance',
    symbol: 'MOFI',
  },
  {
    id: 9239,
    name: 'Fox Finance',
    symbol: 'FOX',
  },
  {
    id: 9241,
    name: 'Satozhi',
    symbol: 'SATOZ',
  },
  {
    id: 9243,
    name: 'Darwinia Crab Network',
    symbol: 'CRAB',
  },
  {
    id: 9245,
    name: 'Signata',
    symbol: 'SATA',
  },
  {
    id: 9247,
    name: 'Whole Earth Coin',
    symbol: 'WEC',
  },
  {
    id: 9248,
    name: 'Carillonium finance',
    symbol: 'CAROM',
  },
  {
    id: 9249,
    name: 'NFTD Protocol',
    symbol: 'NFTD',
  },
  {
    id: 9251,
    name: 'Standard Protocol',
    symbol: 'STND',
  },
  {
    id: 9253,
    name: 'Twinci',
    symbol: 'TWIN',
  },
  {
    id: 9256,
    name: 'SafeYield',
    symbol: 'SAFEYIELD',
  },
  {
    id: 9257,
    name: 'One Get Coin',
    symbol: 'OGC',
  },
  {
    id: 9258,
    name: 'Chia Network',
    symbol: 'XCH',
  },
  {
    id: 9259,
    name: 'TheForce Trade',
    symbol: 'FOC',
  },
  {
    id: 9260,
    name: 'Zigcoin',
    symbol: 'ZIG',
  },
  {
    id: 9261,
    name: 'KelVPN',
    symbol: 'KEL',
  },
  {
    id: 9262,
    name: 'UniFarm',
    symbol: 'UFARM',
  },
  {
    id: 9263,
    name: 'Unizen',
    symbol: 'ZCX',
  },
  {
    id: 9264,
    name: 'PolkaDomain',
    symbol: 'NAME',
  },
  {
    id: 9265,
    name: 'Porta',
    symbol: 'KIAN',
  },
  {
    id: 9266,
    name: 'Safe Protocol',
    symbol: 'SAFEP',
  },
  {
    id: 9268,
    name: '2local',
    symbol: '2LC',
  },
  {
    id: 9269,
    name: 'Refinable',
    symbol: 'FINE',
  },
  {
    id: 9270,
    name: 'Bitcoin Bam',
    symbol: 'BTCBAM',
  },
  {
    id: 9271,
    name: 'Momo Protocol',
    symbol: 'MOMO',
  },
  {
    id: 9272,
    name: 'Munch Token',
    symbol: 'MUNCH',
  },
  {
    id: 9273,
    name: 'Octans',
    symbol: 'OCTA',
  },
  {
    id: 9274,
    name: 'RocketMoon',
    symbol: 'RMOON',
  },
  {
    id: 9276,
    name: 'Pofi',
    symbol: 'POFI',
  },
  {
    id: 9277,
    name: 'Revolution Populi',
    symbol: 'RVP',
  },
  {
    id: 9278,
    name: 'RiskMoon',
    symbol: 'RISKMOON',
  },
  {
    id: 9279,
    name: 'SuperLauncher',
    symbol: 'LAUNCH',
  },
  {
    id: 9282,
    name: 'Hugo Game',
    symbol: 'HUGO',
  },
  {
    id: 9283,
    name: 'Waffle',
    symbol: 'WAF',
  },
  {
    id: 9284,
    name: 'Secured MoonRat Token',
    symbol: 'SMRAT',
  },
  {
    id: 9285,
    name: 'Moonriver',
    symbol: 'MOVR',
  },
  {
    id: 9286,
    name: 'Doge Killer',
    symbol: 'LEASH',
  },
  {
    id: 9287,
    name: 'Uniqly',
    symbol: 'UNIQ',
  },
  {
    id: 9288,
    name: 'BENQI',
    symbol: 'QI',
  },
  {
    id: 9289,
    name: 'Chainswap',
    symbol: 'ASAP',
  },
  {
    id: 9291,
    name: 'Ternoa',
    symbol: 'CAPS',
  },
  {
    id: 9292,
    name: 'Bitsz',
    symbol: 'BITSZ',
  },
  {
    id: 9293,
    name: 'MarsMission Protocol',
    symbol: 'MARSM',
  },
  {
    id: 9294,
    name: 'SAFESUN',
    symbol: 'SAFESUN',
  },
  {
    id: 9295,
    name: 'CLIMB TOKEN FINANCE',
    symbol: 'CLIMB',
  },
  {
    id: 9296,
    name: 'ENV Finance',
    symbol: 'ENV',
  },
  {
    id: 9299,
    name: 'NFT Art Finance',
    symbol: 'NFTART',
  },
  {
    id: 9300,
    name: 'Zeppelin DAO',
    symbol: 'ZEP',
  },
  {
    id: 9302,
    name: 'MoMo KEY',
    symbol: 'KEY',
  },
  {
    id: 9304,
    name: 'DAIN',
    symbol: 'DAIN',
  },
  {
    id: 9308,
    name: 'Vulcan Forged PYR',
    symbol: 'PYR',
  },
  {
    id: 9309,
    name: 'Hyperchain X',
    symbol: 'HYPER',
  },
  {
    id: 9312,
    name: 'The Lab Finance',
    symbol: 'LABO',
  },
  {
    id: 9316,
    name: 'Shipit pro',
    symbol: 'SHPP',
  },
  {
    id: 9318,
    name: 'BeforeCoinMarketCap',
    symbol: 'BCMC1',
  },
  {
    id: 9322,
    name: 'BondAppétit Governance Token',
    symbol: 'BAG',
  },
  {
    id: 9326,
    name: 'ROPE Token',
    symbol: 'ROPE',
  },
  {
    id: 9329,
    name: 'Crypto Excellence',
    symbol: 'CE',
  },
  {
    id: 9330,
    name: 'BIXBCOIN',
    symbol: 'BIXB',
  },
  {
    id: 9332,
    name: 'APWars',
    symbol: 'WGOLD',
  },
  {
    id: 9334,
    name: 'SafeLaunchpad',
    symbol: 'SLD',
  },
  {
    id: 9339,
    name: 'Mello Token',
    symbol: 'MELLO',
  },
  {
    id: 9340,
    name: 'Donkey',
    symbol: 'DONK',
  },
  {
    id: 9342,
    name: 'Community Business Token',
    symbol: 'CBT',
  },
  {
    id: 9344,
    name: '1MillionNFTs',
    symbol: '1MIL',
  },
  {
    id: 9345,
    name: 'BSC Station',
    symbol: 'BSCS',
  },
  {
    id: 9346,
    name: 'NFTify',
    symbol: 'N1',
  },
  {
    id: 9348,
    name: 'Crowny',
    symbol: 'CRWNY',
  },
  {
    id: 9349,
    name: 'CLAIM',
    symbol: 'CLAIM',
  },
  {
    id: 9352,
    name: 'Marshmallowdefi',
    symbol: 'MASH',
  },
  {
    id: 9353,
    name: 'Kalata',
    symbol: 'KALA',
  },
  {
    id: 9355,
    name: 'DoveSwap Finance',
    symbol: 'DOVE',
  },
  {
    id: 9357,
    name: 'DefiDrop Launchpad',
    symbol: 'DROPS',
  },
  {
    id: 9359,
    name: 'Papel Token',
    symbol: 'PAPEL',
  },
  {
    id: 9360,
    name: 'EmploymentCoin',
    symbol: 'EC2',
  },
  {
    id: 9361,
    name: 'Charitas',
    symbol: 'CHAR',
  },
  {
    id: 9364,
    name: 'Unlock Protocol',
    symbol: 'UDT',
  },
  {
    id: 9365,
    name: 'IDOHunt app',
    symbol: 'IDO',
  },
  {
    id: 9367,
    name: 'Bafe io',
    symbol: 'BAFE',
  },
  {
    id: 9368,
    name: 'Euler Tools',
    symbol: 'EULER',
  },
  {
    id: 9369,
    name: 'TakoDefi',
    symbol: 'TAKO',
  },
  {
    id: 9372,
    name: 'ZTB',
    symbol: 'ZTB',
  },
  {
    id: 9373,
    name: 'Milktea.finance',
    symbol: 'MTF',
  },
  {
    id: 9374,
    name: 'Myteamcoin',
    symbol: 'MYC',
  },
  {
    id: 9377,
    name: 'TreeDefi',
    symbol: 'SEED',
  },
  {
    id: 9378,
    name: 'Eclipse',
    symbol: 'ECP',
  },
  {
    id: 9379,
    name: 'SAFE Community Token',
    symbol: 'SAFECOM',
  },
  {
    id: 9384,
    name: 'OrcaX',
    symbol: 'OX',
  },
  {
    id: 9385,
    name: 'Elastic BNB',
    symbol: 'XBN',
  },
  {
    id: 9386,
    name: 'Kishu Inu',
    symbol: 'KISHU',
  },
  {
    id: 9387,
    name: 'Husky',
    symbol: 'HUSKY',
  },
  {
    id: 9389,
    name: 'EarnX',
    symbol: 'EARNX',
  },
  {
    id: 9390,
    name: 'Chainsquare',
    symbol: 'CHS',
  },
  {
    id: 9391,
    name: 'Revo Network',
    symbol: 'REVO',
  },
  {
    id: 9392,
    name: 'Polkatrain',
    symbol: 'POLT',
  },
  {
    id: 9393,
    name: 'Safetesla',
    symbol: 'SAFETESLA',
  },
  {
    id: 9394,
    name: 'Golden Duck',
    symbol: 'GOLDUCK',
  },
  {
    id: 9395,
    name: 'Strite',
    symbol: 'STRI',
  },
  {
    id: 9397,
    name: 'Ethersocks',
    symbol: 'SOX',
  },
  {
    id: 9399,
    name: 'MoonToken',
    symbol: 'MOONTOKEN',
  },
  {
    id: 9400,
    name: 'WenMoon',
    symbol: 'WENMOON',
  },
  {
    id: 9402,
    name: 'Bingus Token',
    symbol: 'BINGUS',
  },
  {
    id: 9406,
    name: 'Penky',
    symbol: 'PENKY',
  },
  {
    id: 9407,
    name: 'AlgOil',
    symbol: 'AGOLP',
  },
  {
    id: 9408,
    name: 'MORPHOSE',
    symbol: 'MORPH',
  },
  {
    id: 9412,
    name: 'NFTSwaps',
    symbol: 'SWAPS',
  },
  {
    id: 9413,
    name: 'Vira-lata Finance',
    symbol: 'REAU',
  },
  {
    id: 9414,
    name: 'Babytoken',
    symbol: 'BABY',
  },
  {
    id: 9416,
    name: 'The Crypto Prophecies',
    symbol: 'TCP',
  },
  {
    id: 9417,
    name: 'Maple',
    symbol: 'MPL',
  },
  {
    id: 9418,
    name: 'BlockSwap Network',
    symbol: 'CBSN',
  },
  {
    id: 9420,
    name: 'SwapDEX',
    symbol: 'SDX',
  },
  {
    id: 9421,
    name: 'Ampleforth Governance Token',
    symbol: 'FORTH',
  },
  {
    id: 9423,
    name: 'Phuture',
    symbol: 'PHTR',
  },
  {
    id: 9425,
    name: 'MECHAZILLA',
    symbol: 'MECHAZ',
  },
  {
    id: 9426,
    name: 'KLend',
    symbol: 'KLT',
  },
  {
    id: 9427,
    name: 'Venus Dogecoin',
    symbol: 'vDOGE',
  },
  {
    id: 9428,
    name: 'Venus Cardano',
    symbol: 'vADA',
  },
  {
    id: 9430,
    name: 'Alphr finance',
    symbol: 'ALPHR',
  },
  {
    id: 9433,
    name: 'GazeTV',
    symbol: 'GAZE',
  },
  {
    id: 9436,
    name: 'Dogelon Mars',
    symbol: 'ELON',
  },
  {
    id: 9437,
    name: 'CherrySwap',
    symbol: 'CHE',
  },
  {
    id: 9438,
    name: 'Nominex Token',
    symbol: 'NMX',
  },
  {
    id: 9440,
    name: 'Mochi Market',
    symbol: 'MOMA',
  },
  {
    id: 9441,
    name: 'Jigstack',
    symbol: 'STAK',
  },
  {
    id: 9443,
    name: 'Step Finance',
    symbol: 'STEP',
  },
  {
    id: 9444,
    name: 'Kyber Network Crystal v2',
    symbol: 'KNC',
  },
  {
    id: 9446,
    name: 'Lottery Token',
    symbol: 'LOT',
  },
  {
    id: 9447,
    name: 'Synthetify',
    symbol: 'SNY',
  },
  {
    id: 9449,
    name: 'Sienna (ERC20)',
    symbol: 'wSIENNA',
  },
  {
    id: 9450,
    name: 'BLACKHOLE PROTOCOL',
    symbol: 'BLACK',
  },
  {
    id: 9451,
    name: 'Verso',
    symbol: 'VSO',
  },
  {
    id: 9452,
    name: 'Bandot Protocol',
    symbol: 'BDT',
  },
  {
    id: 9453,
    name: 'Agave',
    symbol: 'AGVE',
  },
  {
    id: 9455,
    name: 'Lemond',
    symbol: 'LEMD',
  },
  {
    id: 9456,
    name: 'Australian Safe Shepherd',
    symbol: 'ASS',
  },
  {
    id: 9457,
    name: 'Shield Network',
    symbol: 'SHIELDNET',
  },
  {
    id: 9458,
    name: 'Hokkaido Inu',
    symbol: 'HOKK',
  },
  {
    id: 9459,
    name: 'Krill',
    symbol: 'KRILL',
  },
  {
    id: 9461,
    name: 'X World Games',
    symbol: 'XWG',
  },
  {
    id: 9462,
    name: 'Wrapped AVAX',
    symbol: 'WAVAX',
  },
  {
    id: 9465,
    name: 'Mooni DeFi',
    symbol: 'MOONI',
  },
  {
    id: 9466,
    name: 'Edgecoin',
    symbol: 'EDGT',
  },
  {
    id: 9467,
    name: 'Celo Euro',
    symbol: 'CEUR',
  },
  {
    id: 9468,
    name: 'Spore',
    symbol: 'SPORE',
  },
  {
    id: 9469,
    name: 'Unicly Genesis Collection',
    symbol: 'UUNICLY',
  },
  {
    id: 9473,
    name: 'Unicly CryptoPunks Collection',
    symbol: 'UPUNK',
  },
  {
    id: 9474,
    name: 'Unicly Doki Doki Collection',
    symbol: 'UDOKI',
  },
  {
    id: 9475,
    name: 'Unicly Chris McCann Collection',
    symbol: 'UCM',
  },
  {
    id: 9476,
    name: 'Unicly Mystic Axies Collection',
    symbol: 'UAXIE',
  },
  {
    id: 9477,
    name: 'Unicly Hashmasks Collection',
    symbol: 'UMASK',
  },
  {
    id: 9478,
    name: 'Wault [New]',
    symbol: 'WAULTX',
  },
  {
    id: 9480,
    name: 'Hope',
    symbol: 'HOPE',
  },
  {
    id: 9481,
    name: 'Pendle',
    symbol: 'PENDLE',
  },
  {
    id: 9482,
    name: 'Lympo Market Token',
    symbol: 'LMT',
  },
  {
    id: 9484,
    name: 'E1337',
    symbol: '1337',
  },
  {
    id: 9488,
    name: 'ZooKeeper',
    symbol: 'ZOO',
  },
  {
    id: 9489,
    name: 'Dopple Finance',
    symbol: 'DOP',
  },
  {
    id: 9490,
    name: 'Ara Blocks',
    symbol: 'ARA',
  },
  {
    id: 9491,
    name: 'Smaugs NFT',
    symbol: 'SMG',
  },
  {
    id: 9492,
    name: 'ETHERLAND',
    symbol: 'ELAND',
  },
  {
    id: 9493,
    name: 'Reflexer Ungovernance Token',
    symbol: 'FLX',
  },
  {
    id: 9495,
    name: 'Evolution',
    symbol: 'GEN',
  },
  {
    id: 9496,
    name: 'NIFDO Protocol',
    symbol: 'NFD',
  },
  {
    id: 9498,
    name: 'EnreachDAO',
    symbol: 'NRCH',
  },
  {
    id: 9502,
    name: 'Pippi Finance',
    symbol: 'PIPI',
  },
  {
    id: 9503,
    name: 'CryptoTycoon',
    symbol: 'CTT',
  },
  {
    id: 9504,
    name: 'NAOS Finance',
    symbol: 'NAOS',
  },
  {
    id: 9505,
    name: 'Lever Token',
    symbol: 'LEV',
  },
  {
    id: 9507,
    name: 'Göztepe S.K. Fan Token',
    symbol: 'GOZ',
  },
  {
    id: 9508,
    name: 'Universidad de Chile Fan Token',
    symbol: 'UCH',
  },
  {
    id: 9509,
    name: 'Legia Warsaw Fan Token',
    symbol: 'LEG',
  },
  {
    id: 9510,
    name: 'Fortuna Sittard Fan Token',
    symbol: 'FOR',
  },
  {
    id: 9511,
    name: 'Dfyn Network',
    symbol: 'DFYN',
  },
  {
    id: 9512,
    name: 'Cubiex Power',
    symbol: 'CBIX-P',
  },
  {
    id: 9516,
    name: 'Valkyrie Network',
    symbol: 'VAL',
  },
  {
    id: 9518,
    name: 'MemePad',
    symbol: 'MEPAD',
  },
  {
    id: 9519,
    name: 'LabraCoin',
    symbol: 'LABRA',
  },
  {
    id: 9520,
    name: 'POP',
    symbol: 'POP!',
  },
  {
    id: 9522,
    name: 'Bonfire',
    symbol: 'BONFIRE',
  },
  {
    id: 9524,
    name: 'Media Network',
    symbol: 'MEDIA',
  },
  {
    id: 9525,
    name: 'MoonMoon',
    symbol: 'MOONMOON',
  },
  {
    id: 9526,
    name: 'LOCGame',
    symbol: 'LOCG',
  },
  {
    id: 9527,
    name: 'NFT Alley',
    symbol: 'ALLEY',
  },
  {
    id: 9530,
    name: 'FaraLand',
    symbol: 'FARA',
  },
  {
    id: 9532,
    name: 'Impermax',
    symbol: 'IMX',
  },
  {
    id: 9533,
    name: 'GreenTrust',
    symbol: 'GNT',
  },
  {
    id: 9535,
    name: 'CrossFi',
    symbol: 'CRFI',
  },
  {
    id: 9537,
    name: 'EpiK Protocol',
    symbol: 'EPK',
  },
  {
    id: 9538,
    name: 'Anti-Lockdown',
    symbol: 'FREE',
  },
  {
    id: 9539,
    name: 'UnitedCrowd',
    symbol: 'UCT',
  },
  {
    id: 9541,
    name: 'AABC Token',
    symbol: 'AABC',
  },
  {
    id: 9544,
    name: 'POLKARARE',
    symbol: 'PRARE',
  },
  {
    id: 9545,
    name: 'NFTb',
    symbol: 'NFTB',
  },
  {
    id: 9546,
    name: 'ODIN PROTOCOL',
    symbol: 'ODIN',
  },
  {
    id: 9547,
    name: 'AurusSILVER',
    symbol: 'AWS',
  },
  {
    id: 9548,
    name: 'CroxSwap',
    symbol: 'CROX',
  },
  {
    id: 9549,
    name: 'Mercurial Finance',
    symbol: 'MER',
  },
  {
    id: 9550,
    name: 'PERI Finance',
    symbol: 'PERI',
  },
  {
    id: 9551,
    name: 'Digible',
    symbol: 'DIGI',
  },
  {
    id: 9553,
    name: 'B-cube.ai',
    symbol: 'BCUBE',
  },
  {
    id: 9554,
    name: 'EtherSmart',
    symbol: 'ETM',
  },
  {
    id: 9555,
    name: 'RUG BIDEN',
    symbol: 'RUGBID',
  },
  {
    id: 9559,
    name: 'UNILAYERX',
    symbol: 'LAYERX',
  },
  {
    id: 9560,
    name: 'WindSwap',
    symbol: 'WINDY',
  },
  {
    id: 9562,
    name: 'Coldstack',
    symbol: 'CLS',
  },
  {
    id: 9563,
    name: 'TradeStars',
    symbol: 'TSX',
  },
  {
    id: 9564,
    name: 'CryptoCart',
    symbol: 'CC',
  },
  {
    id: 9566,
    name: 'Liquity USD',
    symbol: 'LUSD',
  },
  {
    id: 9567,
    name: 'eSwapping',
    symbol: 'ESWAP',
  },
  {
    id: 9568,
    name: 'SafeComet',
    symbol: 'SAFECOMET',
  },
  {
    id: 9569,
    name: 'OXO.Farm',
    symbol: 'OXO',
  },
  {
    id: 9571,
    name: 'Mirror Farm',
    symbol: 'MOR',
  },
  {
    id: 9573,
    name: 'Animal Adoption Advocacy',
    symbol: 'PAWS',
  },
  {
    id: 9574,
    name: 'CoShi Inu',
    symbol: 'COSHI',
  },
  {
    id: 9575,
    name: 'Hamtaro',
    symbol: 'HAMTARO',
  },
  {
    id: 9576,
    name: 'Vulkania',
    symbol: 'VLK',
  },
  {
    id: 9577,
    name: 'Mycro',
    symbol: 'MYO',
  },
  {
    id: 9578,
    name: 'Dungeonswap',
    symbol: 'DND',
  },
  {
    id: 9579,
    name: 'Corra.Finance',
    symbol: 'CORA',
  },
  {
    id: 9580,
    name: 'Evolution Finance',
    symbol: 'EVN',
  },
  {
    id: 9581,
    name: 'BitBlocks Finance',
    symbol: 'BBKFI',
  },
  {
    id: 9582,
    name: 'DisCas Vision',
    symbol: 'DISC',
  },
  {
    id: 9583,
    name: 'Melalie',
    symbol: 'MEL',
  },
  {
    id: 9584,
    name: 'Slam Token',
    symbol: 'SLAM',
  },
  {
    id: 9585,
    name: 'XBN Community Token',
    symbol: 'XBC',
  },
  {
    id: 9586,
    name: 'PRIVATEUM INITIATIVE',
    symbol: 'PVM',
  },
  {
    id: 9588,
    name: 'O3 Swap',
    symbol: 'O3',
  },
  {
    id: 9590,
    name: 'OBORTECH',
    symbol: 'OBOT',
  },
  {
    id: 9592,
    name: 'Fortress Lending',
    symbol: 'FTS',
  },
  {
    id: 9594,
    name: 'g9tro Crowdfunding Platform',
    symbol: 'G9TRO',
  },
  {
    id: 9595,
    name: 'CaliCoin',
    symbol: 'CALI',
  },
  {
    id: 9597,
    name: 'dFund',
    symbol: 'DFND',
  },
  {
    id: 9598,
    name: 'Lion Token',
    symbol: 'LION',
  },
  {
    id: 9601,
    name: 'Forefront',
    symbol: 'FF',
  },
  {
    id: 9602,
    name: 'GOAT COIN',
    symbol: 'GOAT',
  },
  {
    id: 9604,
    name: 'Privapp Network',
    symbol: 'bPRIVA',
  },
  {
    id: 9605,
    name: 'TruePNL',
    symbol: 'PNL',
  },
  {
    id: 9606,
    name: 'Plethori',
    symbol: 'PLE',
  },
  {
    id: 9607,
    name: 'Bankless DAO',
    symbol: 'BANK',
  },
  {
    id: 9608,
    name: 'Spookyswap',
    symbol: 'BOO',
  },
  {
    id: 9609,
    name: 'CompliFi',
    symbol: 'COMFI',
  },
  {
    id: 9611,
    name: 'ElenaUSD',
    symbol: 'USE',
  },
  {
    id: 9612,
    name: 'Elena Protocol',
    symbol: 'ELENA',
  },
  {
    id: 9613,
    name: 'Trustpad',
    symbol: 'TPAD',
  },
  {
    id: 9615,
    name: 'Polylastic',
    symbol: 'POLX',
  },
  {
    id: 9618,
    name: 'DogeMoon',
    symbol: 'DGMOON',
  },
  {
    id: 9620,
    name: 'Wrapped Statera',
    symbol: 'WSTA',
  },
  {
    id: 9621,
    name: 'DinoExchange',
    symbol: 'DINO',
  },
  {
    id: 9622,
    name: 'Nftfy',
    symbol: 'NFTFY',
  },
  {
    id: 9623,
    name: 'FairLunar',
    symbol: 'FLUNAR',
  },
  {
    id: 9625,
    name: 'Triforce Protocol',
    symbol: 'TFC',
  },
  {
    id: 9626,
    name: 'Emblem',
    symbol: 'EMB',
  },
  {
    id: 9627,
    name: 'ComfyToken',
    symbol: 'COMFY',
  },
  {
    id: 9629,
    name: 'GMR Finance',
    symbol: 'GMR',
  },
  {
    id: 9630,
    name: 'Safeicarus',
    symbol: 'SAFEICARUS',
  },
  {
    id: 9631,
    name: 'Polkally',
    symbol: 'KALLY',
  },
  {
    id: 9632,
    name: 'UMI',
    symbol: 'UMI',
  },
  {
    id: 9635,
    name: 'SYA x Flooz',
    symbol: 'SYA',
  },
  {
    id: 9636,
    name: 'Widercoin',
    symbol: 'WDR',
  },
  {
    id: 9637,
    name: 'Altura',
    symbol: 'ALU',
  },
  {
    id: 9638,
    name: 'SingularityDAO',
    symbol: 'SDAO',
  },
  {
    id: 9639,
    name: 'Pussy Financial',
    symbol: 'PUSSY',
  },
  {
    id: 9640,
    name: 'MetisDAO',
    symbol: 'METIS',
  },
  {
    id: 9641,
    name: 'PhoenxiDefi Finance',
    symbol: 'PNIXS',
  },
  {
    id: 9642,
    name: 'SILVER (SVS)',
    symbol: 'SVS',
  },
  {
    id: 9643,
    name: 'Don-key',
    symbol: 'DON',
  },
  {
    id: 9646,
    name: 'FOMO LAB',
    symbol: 'FOMO',
  },
  {
    id: 9650,
    name: 'DiamondToken',
    symbol: 'DIAMOND',
  },
  {
    id: 9651,
    name: 'Ethermon',
    symbol: 'EMON',
  },
  {
    id: 9653,
    name: 'Nabox',
    symbol: 'NABOX',
  },
  {
    id: 9654,
    name: 'CryptoBlades',
    symbol: 'SKILL',
  },
  {
    id: 9655,
    name: 'Blocktyme',
    symbol: 'BTYM',
  },
  {
    id: 9656,
    name: 'CateCoin',
    symbol: 'CATE',
  },
  {
    id: 9657,
    name: 'Pinknode',
    symbol: 'PNODE',
  },
  {
    id: 9660,
    name: 'Parasset',
    symbol: 'ASET',
  },
  {
    id: 9662,
    name: 'Shield',
    symbol: 'SLD',
  },
  {
    id: 9663,
    name: 'ArGo',
    symbol: 'ARGO',
  },
  {
    id: 9664,
    name: 'HyperGraph',
    symbol: 'HGT',
  },
  {
    id: 9665,
    name: 'My DeFi Pet',
    symbol: 'DPET',
  },
  {
    id: 9666,
    name: 'Terran Coin',
    symbol: 'TRR',
  },
  {
    id: 9667,
    name: 'BNB Diamond',
    symbol: 'BNBD',
  },
  {
    id: 9669,
    name: 'Pube finance',
    symbol: 'PUBE',
  },
  {
    id: 9670,
    name: 'GogolCoin',
    symbol: 'GOL',
  },
  {
    id: 9671,
    name: 'upBNB',
    symbol: 'UPBNB',
  },
  {
    id: 9673,
    name: 'Loser Coin',
    symbol: 'LOWB',
  },
  {
    id: 9674,
    name: 'Wilder World',
    symbol: 'WILD',
  },
  {
    id: 9675,
    name: 'Drops Ownership Power',
    symbol: 'DOP',
  },
  {
    id: 9676,
    name: 'Gastrocoin',
    symbol: 'GTC',
  },
  {
    id: 9677,
    name: 'Nadeshiko',
    symbol: 'NDSK',
  },
  {
    id: 9678,
    name: 'Total Crypto Market Cap Token',
    symbol: 'TCAP',
  },
  {
    id: 9679,
    name: 'MoonStarter',
    symbol: 'MNST',
  },
  {
    id: 9680,
    name: 'Small dogecoin',
    symbol: 'SDOG',
  },
  {
    id: 9681,
    name: 'NFTCircle',
    symbol: 'NFTC',
  },
  {
    id: 9682,
    name: 'XCOM',
    symbol: 'XC',
  },
  {
    id: 9683,
    name: 'Booster',
    symbol: 'BOO',
  },
  {
    id: 9685,
    name: 'Jomon Shiba',
    symbol: 'JSHIBA',
  },
  {
    id: 9686,
    name: 'My Crypto Heroes',
    symbol: 'MCHC',
  },
  {
    id: 9690,
    name: 'Rabbit token',
    symbol: 'RBT',
  },
  {
    id: 9691,
    name: 'Venus Reward Token',
    symbol: 'VRT',
  },
  {
    id: 9692,
    name: 'CatzCoin',
    symbol: 'CATZ',
  },
  {
    id: 9693,
    name: 'DOGGY',
    symbol: 'DOGGY',
  },
  {
    id: 9694,
    name: 'Upfire',
    symbol: 'UPR',
  },
  {
    id: 9698,
    name: 'Tycoon',
    symbol: 'TYC',
  },
  {
    id: 9699,
    name: 'HyperMeteor',
    symbol: 'HYMETEOR',
  },
  {
    id: 9700,
    name: 'Microtuber',
    symbol: 'MCT',
  },
  {
    id: 9701,
    name: 'Jindoge',
    symbol: 'JINDOGE',
  },
  {
    id: 9705,
    name: 'GOAT Zuckerberg',
    symbol: 'ZGOAT',
  },
  {
    id: 9708,
    name: 'ShibaPup',
    symbol: 'SHIBAPUP',
  },
  {
    id: 9709,
    name: 'MoonTrust',
    symbol: 'MNTT',
  },
  {
    id: 9710,
    name: 'Kabosu',
    symbol: 'KABOSU',
  },
  {
    id: 9711,
    name: 'Sanshu Inu',
    symbol: 'SANSHU',
  },
  {
    id: 9712,
    name: 'Shih Tzu',
    symbol: 'SHIH',
  },
  {
    id: 9713,
    name: 'Demodyfi',
    symbol: 'DMOD',
  },
  {
    id: 9718,
    name: 'Kineko',
    symbol: 'KKO',
  },
  {
    id: 9719,
    name: 'Woofy',
    symbol: 'WOOFY',
  },
  {
    id: 9720,
    name: 'PlatON',
    symbol: 'LAT',
  },
  {
    id: 9721,
    name: 'Samoyedcoin',
    symbol: 'SAMO',
  },
  {
    id: 9722,
    name: 'Fluity',
    symbol: 'FLTY',
  },
  {
    id: 9725,
    name: 'Butter TOken',
    symbol: 'BUTTER',
  },
  {
    id: 9732,
    name: 'Dogefather',
    symbol: 'DOGEFATHER',
  },
  {
    id: 9734,
    name: 'Saferune',
    symbol: 'SAFERUNE',
  },
  {
    id: 9735,
    name: 'Xenon Pay',
    symbol: 'X2P',
  },
  {
    id: 9736,
    name: 'ShibaCash',
    symbol: 'SHIBACASH',
  },
  {
    id: 9737,
    name: 'HummingBird Finance',
    symbol: 'HMNG',
  },
  {
    id: 9738,
    name: 'Bitcoin and Ethereum Standard Token',
    symbol: 'BEST',
  },
  {
    id: 9739,
    name: 'Bird Finance',
    symbol: 'BIRD',
  },
  {
    id: 9740,
    name: 'Dot Finance',
    symbol: 'PINK',
  },
  {
    id: 9741,
    name: 'Solanium',
    symbol: 'SLIM',
  },
  {
    id: 9742,
    name: 'ElonTech',
    symbol: 'ETCH',
  },
  {
    id: 9747,
    name: 'Cryption Network',
    symbol: 'CNT',
  },
  {
    id: 9748,
    name: 'Renascent Finance',
    symbol: 'RENASCENT',
  },
  {
    id: 9749,
    name: 'WallStreetBets DApp',
    symbol: 'WSB',
  },
  {
    id: 9751,
    name: 'COLD FINANCE',
    symbol: 'COLD',
  },
  {
    id: 9752,
    name: 'AFEN Blockchain',
    symbol: 'AFEN',
  },
  {
    id: 9755,
    name: 'Moma Protocol',
    symbol: 'MOMAT',
  },
  {
    id: 9756,
    name: 'Virtue Poker',
    symbol: 'VPP',
  },
  {
    id: 9757,
    name: 'WeStarter',
    symbol: 'WAR',
  },
  {
    id: 9758,
    name: 'SuperNova',
    symbol: 'SHARE',
  },
  {
    id: 9759,
    name: 'BSC Gold',
    symbol: 'BSCGOLD',
  },
  {
    id: 9760,
    name: 'Stratos',
    symbol: 'STOS',
  },
  {
    id: 9761,
    name: 'SaferMoon',
    symbol: 'SAFERMOON',
  },
  {
    id: 9763,
    name: 'Copiosa Coin',
    symbol: 'COP',
  },
  {
    id: 9764,
    name: 'MILC Platform',
    symbol: 'MLT',
  },
  {
    id: 9765,
    name: 'Hanzo Inu',
    symbol: 'HNZO',
  },
  {
    id: 9766,
    name: 'Rentible',
    symbol: 'RNB',
  },
  {
    id: 9767,
    name: 'Frenchie Network',
    symbol: 'FREN',
  },
  {
    id: 9771,
    name: 'LaunchX',
    symbol: 'LNCHX',
  },
  {
    id: 9772,
    name: 'SnowgeCoin',
    symbol: 'SNOWGE',
  },
  {
    id: 9774,
    name: 'Sleepy Sloth Finance',
    symbol: 'SLEEPY',
  },
  {
    id: 9779,
    name: 'Supersonic Finance',
    symbol: 'SSN',
  },
  {
    id: 9780,
    name: 'Snowball',
    symbol: 'SNOB',
  },
  {
    id: 9783,
    name: 'Roseon Finance',
    symbol: 'ROSN',
  },
  {
    id: 9789,
    name: 'ETH 2x Flexible Leverage Index',
    symbol: 'ETH2X-FLI',
  },
  {
    id: 9790,
    name: 'Coco Swap',
    symbol: 'COCO',
  },
  {
    id: 9792,
    name: 'ACENT',
    symbol: 'ACE',
  },
  {
    id: 9795,
    name: 'Caramel Swap',
    symbol: 'MEL',
  },
  {
    id: 9796,
    name: 'Bakery Tools',
    symbol: 'TBAKE',
  },
  {
    id: 9797,
    name: 'Avalaunch',
    symbol: 'XAVA',
  },
  {
    id: 9798,
    name: 'VELOREX',
    symbol: 'VEX',
  },
  {
    id: 9799,
    name: 'SafeZone',
    symbol: 'SAFEZONE',
  },
  {
    id: 9802,
    name: 'Mozik',
    symbol: 'MOZ',
  },
  {
    id: 9805,
    name: 'Evai.io',
    symbol: 'EVAI',
  },
  {
    id: 9807,
    name: 'ProSwap',
    symbol: 'PROS',
  },
  {
    id: 9810,
    name: 'Lunar Highway',
    symbol: 'LUNAR',
  },
  {
    id: 9811,
    name: 'Catjam',
    symbol: 'CATJAM',
  },
  {
    id: 9812,
    name: 'Gorilla Diamond',
    symbol: 'GDT',
  },
  {
    id: 9813,
    name: 'GrowingFi',
    symbol: 'GROW',
  },
  {
    id: 9816,
    name: 'APENFT',
    symbol: 'NFT',
  },
  {
    id: 9817,
    name: 'DeFIRE',
    symbol: 'CWAP',
  },
  {
    id: 9819,
    name: 'PalGold',
    symbol: 'PALG',
  },
  {
    id: 9820,
    name: 'Metaverse NFT Index',
    symbol: 'PLAY',
  },
  {
    id: 9821,
    name: 'PocMon-Old',
    symbol: 'PMON',
  },
  {
    id: 9823,
    name: 'SUNI',
    symbol: 'SUNI',
  },
  {
    id: 9824,
    name: 'HappyCoin',
    symbol: 'HAPPY',
  },
  {
    id: 9825,
    name: 'NiiFi',
    symbol: 'NIIFI',
  },
  {
    id: 9827,
    name: 'Sportcash One',
    symbol: 'SCONEX',
  },
  {
    id: 9828,
    name: 'Nafter',
    symbol: 'NAFT',
  },
  {
    id: 9829,
    name: 'Shiba Corp',
    symbol: 'BSHIBA',
  },
  {
    id: 9830,
    name: 'Dexioprotocol',
    symbol: 'DEXI',
  },
  {
    id: 9832,
    name: 'MoonJuice',
    symbol: 'MOJO',
  },
  {
    id: 9835,
    name: 'Koduro',
    symbol: 'KODURO',
  },
  {
    id: 9837,
    name: 'Flux Protocol',
    symbol: 'FLUX',
  },
  {
    id: 9838,
    name: 'xSuter',
    symbol: 'XSUTER',
  },
  {
    id: 9839,
    name: 'BlockBank',
    symbol: 'BBANK',
  },
  {
    id: 9840,
    name: 'xxxNifty',
    symbol: 'NSFW',
  },
  {
    id: 9844,
    name: 'Atlantic Finance Token',
    symbol: 'ATFI',
  },
  {
    id: 9846,
    name: 'HaggleX',
    symbol: 'HAG',
  },
  {
    id: 9848,
    name: 'Moonlight Token',
    symbol: 'MOONLIGHT',
  },
  {
    id: 9849,
    name: 'SafeGem.Finance',
    symbol: 'GEMS',
  },
  {
    id: 9854,
    name: 'Tiger King',
    symbol: 'TKING',
  },
  {
    id: 9855,
    name: 'EthereumMax',
    symbol: 'EMAX',
  },
  {
    id: 9856,
    name: 'Knit Finance',
    symbol: 'KFT',
  },
  {
    id: 9859,
    name: 'YUMMY',
    symbol: 'YUMMY',
  },
  {
    id: 9861,
    name: 'Float Protocol: Float',
    symbol: 'FLOAT',
  },
  {
    id: 9862,
    name: 'Sishi Finance',
    symbol: 'SISHI',
  },
  {
    id: 9863,
    name: 'TrustBase',
    symbol: 'TBE',
  },
  {
    id: 9865,
    name: 'Ispolink',
    symbol: 'ISP',
  },
  {
    id: 9866,
    name: 'Fear',
    symbol: 'FEAR',
  },
  {
    id: 9867,
    name: 'Hot Cross',
    symbol: 'HOTCROSS',
  },
  {
    id: 9868,
    name: 'XCAD Network',
    symbol: 'XCAD',
  },
  {
    id: 9869,
    name: 'Spherium',
    symbol: 'SPHRI',
  },
  {
    id: 9870,
    name: 'xWIN Finance',
    symbol: 'XWIN',
  },
  {
    id: 9871,
    name: 'Kesef Finance',
    symbol: 'KSF',
  },
  {
    id: 9872,
    name: 'TheFutbolCoin',
    symbol: 'TFC',
  },
  {
    id: 9873,
    name: 'Deez Nuts',
    symbol: 'DEEZNUTS',
  },
  {
    id: 9878,
    name: 'PathFund',
    symbol: 'PATH',
  },
  {
    id: 9886,
    name: 'MoonPirate',
    symbol: 'MOONPIRATE',
  },
  {
    id: 9888,
    name: 'Oviex',
    symbol: 'OVI',
  },
  {
    id: 9889,
    name: 'Bistroo',
    symbol: 'BIST',
  },
  {
    id: 9891,
    name: 'BinaryX',
    symbol: 'BNX',
  },
  {
    id: 9892,
    name: 'YooShi',
    symbol: 'YOOSHI',
  },
  {
    id: 9897,
    name: 'GigaPool',
    symbol: 'GIGA',
  },
  {
    id: 9898,
    name: 'Wenlambo',
    symbol: 'WENLAMBO',
  },
  {
    id: 9899,
    name: 'PEACOCKCOIN (BSC)',
    symbol: 'PEKC',
  },
  {
    id: 9900,
    name: 'HODL',
    symbol: 'HODL',
  },
  {
    id: 9901,
    name: 'Fundum Capital',
    symbol: 'FND',
  },
  {
    id: 9903,
    name: 'Convex Finance',
    symbol: 'CVX',
  },
  {
    id: 9904,
    name: 'GeroWallet',
    symbol: 'GERO',
  },
  {
    id: 9905,
    name: 'Rune',
    symbol: 'RUNE',
  },
  {
    id: 9906,
    name: 'Bunicorn',
    symbol: 'BUNI',
  },
  {
    id: 9907,
    name: 'Low Orbit Crypto Cannon',
    symbol: 'LOCC',
  },
  {
    id: 9908,
    name: 'Ki',
    symbol: 'XKI',
  },
  {
    id: 9910,
    name: 'Football Stars',
    symbol: 'FootballStars',
  },
  {
    id: 9917,
    name: 'AzeusX',
    symbol: 'AZX',
  },
  {
    id: 9920,
    name: 'RUSH COIN',
    symbol: 'RUSH',
  },
  {
    id: 9921,
    name: 'Aquari',
    symbol: 'AQUARI',
  },
  {
    id: 9925,
    name: 'Pampther',
    symbol: 'PAMPTHER',
  },
  {
    id: 9926,
    name: 'yBEARSwap',
    symbol: 'SBEAR',
  },
  {
    id: 9928,
    name: 'Space Token',
    symbol: 'SPACE',
  },
  {
    id: 9930,
    name: 'Tena [new]',
    symbol: 'TENA',
  },
  {
    id: 9931,
    name: 'SONM (BEP-20)',
    symbol: 'SNM',
  },
  {
    id: 9932,
    name: 'ElonDoge',
    symbol: 'EDOGE',
  },
  {
    id: 9933,
    name: 'PrivacySwap',
    symbol: 'PRV',
  },
  {
    id: 9935,
    name: 'Mrweb Finance',
    symbol: 'AMA',
  },
  {
    id: 9936,
    name: 'Elephant Money',
    symbol: 'ELEPHANT',
  },
  {
    id: 9938,
    name: 'OpenOcean',
    symbol: 'OOE',
  },
  {
    id: 9941,
    name: 'Chihuahua',
    symbol: 'HUA',
  },
  {
    id: 9943,
    name: 'American Shiba',
    symbol: 'USHIBA',
  },
  {
    id: 9946,
    name: 'Your Future Exchange',
    symbol: 'YFX',
  },
  {
    id: 9947,
    name: 'Chihua Token',
    symbol: 'CHIHUA',
  },
  {
    id: 9948,
    name: 'Simba Inu',
    symbol: 'SIM',
  },
  {
    id: 9949,
    name: 'Baby Shark',
    symbol: 'SHARK',
  },
  {
    id: 9951,
    name: 'WaultSwap',
    symbol: 'WEX',
  },
  {
    id: 9954,
    name: 'Netvrk',
    symbol: 'NTVRK',
  },
  {
    id: 9958,
    name: 'SafeMoon Inu',
    symbol: 'SMI',
  },
  {
    id: 9961,
    name: 'HotDoge',
    symbol: 'HOTDOGE',
  },
  {
    id: 9962,
    name: 'STARSHIP',
    symbol: 'STARSHIP',
  },
  {
    id: 9963,
    name: 'Neko Network',
    symbol: 'NEKO',
  },
  {
    id: 9966,
    name: 'Summit Koda Token',
    symbol: 'KODA',
  },
  {
    id: 9967,
    name: 'SafeBlast',
    symbol: 'BLAST',
  },
  {
    id: 9968,
    name: 'Corgidoge',
    symbol: 'CORGI',
  },
  {
    id: 9969,
    name: 'SaylorMoon',
    symbol: 'SMOON',
  },
  {
    id: 9976,
    name: 'Freela',
    symbol: 'FREL',
  },
  {
    id: 9979,
    name: 'Echelon DAO',
    symbol: 'ECHO',
  },
  {
    id: 9980,
    name: 'Redpanda Earth',
    symbol: 'REDPANDA',
  },
  {
    id: 9981,
    name: 'Weentar',
    symbol: '$WNTR',
  },
  {
    id: 9982,
    name: 'DINGO TOKEN',
    symbol: 'DINGO',
  },
  {
    id: 9983,
    name: 'TOAD.Network',
    symbol: 'TOAD',
  },
  {
    id: 9984,
    name: 'CluCoin',
    symbol: 'CLU',
  },
  {
    id: 9987,
    name: 'OpenSwap',
    symbol: 'OSWAP',
  },
  {
    id: 9989,
    name: 'Solrise Finance',
    symbol: 'SLRS',
  },
  {
    id: 9991,
    name: 'Charli3',
    symbol: 'C3',
  },
  {
    id: 9992,
    name: 'HEDGE4.Ai',
    symbol: 'HEJJ',
  },
  {
    id: 9996,
    name: 'Bezoge Earth',
    symbol: 'BEZOGE',
  },
  {
    id: 9997,
    name: 'NOA PLAY',
    symbol: 'NOA',
  },
  {
    id: 9998,
    name: 'Unicly',
    symbol: 'UNIC',
  },
  {
    id: 10003,
    name: 'ApeHaven',
    symbol: 'APES',
  },
  {
    id: 10004,
    name: 'GETART',
    symbol: 'GAX',
  },
  {
    id: 10005,
    name: 'Zoo Token',
    symbol: 'ZOOT',
  },
  {
    id: 10006,
    name: 'Graviton',
    symbol: 'GTON',
  },
  {
    id: 10011,
    name: 'CoinWind',
    symbol: 'COW',
  },
  {
    id: 10012,
    name: 'Lonelyfans',
    symbol: 'LOF',
  },
  {
    id: 10021,
    name: 'Dogey-Inu',
    symbol: 'DINU',
  },
  {
    id: 10023,
    name: 'Planet Finance',
    symbol: 'AQUA',
  },
  {
    id: 10024,
    name: 'Tsuki Inu',
    symbol: 'TKINU',
  },
  {
    id: 10027,
    name: 'Dick',
    symbol: 'DICK',
  },
  {
    id: 10030,
    name: 'Mars Ecosystem Token',
    symbol: 'XMS',
  },
  {
    id: 10031,
    name: 'TEN',
    symbol: 'TENFI',
  },
  {
    id: 10033,
    name: 'NFTMart Token',
    symbol: 'NMT',
  },
  {
    id: 10034,
    name: 'CARBON',
    symbol: 'GEMS',
  },
  {
    id: 10035,
    name: 'Teslafan',
    symbol: 'TESLF',
  },
  {
    id: 10036,
    name: 'BSClaunch',
    symbol: 'BSL',
  },
  {
    id: 10040,
    name: 'Wall Street Games',
    symbol: 'WSG',
  },
  {
    id: 10042,
    name: 'Karura',
    symbol: 'KAR',
  },
  {
    id: 10044,
    name: 'DeFi Factory Token',
    symbol: 'DEFT',
  },
  {
    id: 10046,
    name: 'Dotmoovs',
    symbol: 'MOOV',
  },
  {
    id: 10047,
    name: 'EPIK Prime',
    symbol: 'EPIK',
  },
  {
    id: 10048,
    name: 'Keisuke Inu',
    symbol: '$KEI',
  },
  {
    id: 10049,
    name: 'Manchester City Fan Token',
    symbol: 'CITY',
  },
  {
    id: 10050,
    name: 'HOPPY',
    symbol: 'HOP',
  },
  {
    id: 10051,
    name: 'LITTLE RABBIT',
    symbol: 'LTRBT',
  },
  {
    id: 10052,
    name: 'Gitcoin',
    symbol: 'GTC',
  },
  {
    id: 10055,
    name: 'Crust Shadow',
    symbol: 'CSM',
  },
  {
    id: 10060,
    name: 'SafeHamsters',
    symbol: 'SAFEHAMSTERS',
  },
  {
    id: 10061,
    name: 'CumInu',
    symbol: 'CUMINU',
  },
  {
    id: 10070,
    name: 'YouSwap',
    symbol: 'YOU',
  },
  {
    id: 10072,
    name: 'BurnX 2.0',
    symbol: 'BURNX20',
  },
  {
    id: 10075,
    name: 'SAFESPACE',
    symbol: 'SAFESPACE',
  },
  {
    id: 10078,
    name: 'Matador Token',
    symbol: 'MTDR',
  },
  {
    id: 10079,
    name: 'Quidax Token',
    symbol: 'QDX',
  },
  {
    id: 10080,
    name: 'Island Coin',
    symbol: 'ISLE',
  },
  {
    id: 10081,
    name: 'SafeMoonCash',
    symbol: 'SAFEMOONCASH',
  },
  {
    id: 10083,
    name: 'ClassZZ',
    symbol: 'CZZ',
  },
  {
    id: 10085,
    name: 'Shiba BSC',
    symbol: 'SHIBSC',
  },
  {
    id: 10087,
    name: 'PACT community token',
    symbol: 'PACT',
  },
  {
    id: 10088,
    name: 'PolyDoge',
    symbol: 'POLYDOGE',
  },
  {
    id: 10089,
    name: 'Fire Token',
    symbol: 'FIRE',
  },
  {
    id: 10090,
    name: 'Friends With Benefits Pro',
    symbol: 'FWB',
  },
  {
    id: 10093,
    name: 'Gold Secured Currency',
    symbol: 'GSX',
  },
  {
    id: 10094,
    name: 'Apache',
    symbol: 'APACHE',
  },
  {
    id: 10095,
    name: 'Elk Finance',
    symbol: 'ELK',
  },
  {
    id: 10098,
    name: 'Greenheart CBD',
    symbol: 'CBD',
  },
  {
    id: 10099,
    name: 'Kalmar',
    symbol: 'KALM',
  },
  {
    id: 10101,
    name: 'Kwikswap Protocol',
    symbol: 'KWIK',
  },
  {
    id: 10102,
    name: 'BankSocial',
    symbol: 'BSL',
  },
  {
    id: 10103,
    name: 'Lossless',
    symbol: 'LSS',
  },
  {
    id: 10104,
    name: 'YaySwap',
    symbol: 'YAY',
  },
  {
    id: 10108,
    name: 'Smart Trade Coin',
    symbol: 'TRADE',
  },
  {
    id: 10109,
    name: 'Feeder.finance',
    symbol: 'FEED',
  },
  {
    id: 10113,
    name: 'Ourglass',
    symbol: 'GLASS',
  },
  {
    id: 10114,
    name: 'NFT Starter',
    symbol: 'NST',
  },
  {
    id: 10117,
    name: 'Moonarch.app',
    symbol: 'MOONARCH',
  },
  {
    id: 10121,
    name: 'ByteNext',
    symbol: 'BNU',
  },
  {
    id: 10123,
    name: 'NFT TOKEN PILOT',
    symbol: 'NFTP',
  },
  {
    id: 10127,
    name: 'JINDO INU',
    symbol: 'JIND',
  },
  {
    id: 10128,
    name: 'TeraBlock',
    symbol: 'TBC',
  },
  {
    id: 10129,
    name: 'Citizen Finance',
    symbol: 'CIFI',
  },
  {
    id: 10131,
    name: 'HashPanda',
    symbol: 'PANDA',
  },
  {
    id: 10134,
    name: 'Polycat Finance',
    symbol: 'FISH',
  },
  {
    id: 10136,
    name: 'SIL.FINANCE',
    symbol: 'SIL',
  },
  {
    id: 10139,
    name: '0x_nodes',
    symbol: 'BIOS',
  },
  {
    id: 10145,
    name: 'DeFinity',
    symbol: 'DEFX',
  },
  {
    id: 10147,
    name: 'ToolApe',
    symbol: 'TAPE',
  },
  {
    id: 10150,
    name: 'Aqua Pig',
    symbol: 'AQUAPIG',
  },
  {
    id: 10151,
    name: 'Foliowatch',
    symbol: 'FWATCH',
  },
  {
    id: 10154,
    name: 'XRE Global',
    symbol: 'XRE',
  },
  {
    id: 10155,
    name: 'Vanity',
    symbol: 'VNY',
  },
  {
    id: 10157,
    name: 'Sustainable Energy Token',
    symbol: 'SET',
  },
  {
    id: 10158,
    name: 'SpaceGrime',
    symbol: 'GRIMEX',
  },
  {
    id: 10159,
    name: 'E-coin Finance',
    symbol: 'ECOIN',
  },
  {
    id: 10160,
    name: 'Swaperry',
    symbol: 'PERRY',
  },
  {
    id: 10161,
    name: 'OptionPanda',
    symbol: 'OPA',
  },
  {
    id: 10163,
    name: 'Papp Mobile',
    symbol: 'PAPP',
  },
  {
    id: 10165,
    name: 'PORNROCKET',
    symbol: 'PORNROCKET',
  },
  {
    id: 10166,
    name: 'AstroElon',
    symbol: 'ELONONE',
  },
  {
    id: 10169,
    name: 'NFTTONE',
    symbol: 'TONE',
  },
  {
    id: 10170,
    name: 'Mercor Finance',
    symbol: 'MRCR',
  },
  {
    id: 10172,
    name: 'DekBox',
    symbol: 'DEK',
  },
  {
    id: 10174,
    name: 'CREAMPYE',
    symbol: 'PYE',
  },
  {
    id: 10175,
    name: 'Chihua Token',
    symbol: 'CHIMOM',
  },
  {
    id: 10177,
    name: 'Supermoon',
    symbol: 'OSM',
  },
  {
    id: 10178,
    name: 'Rabbit Finance',
    symbol: 'RABBIT',
  },
  {
    id: 10179,
    name: 'StartFi',
    symbol: 'STFI',
  },
  {
    id: 10180,
    name: 'GMT Token',
    symbol: 'GMT',
  },
  {
    id: 10182,
    name: 'Manifold Finance',
    symbol: 'FOLD',
  },
  {
    id: 10183,
    name: 'DeSpace Protocol',
    symbol: 'DES',
  },
  {
    id: 10185,
    name: 'Moonlana',
    symbol: 'MOLA',
  },
  {
    id: 10188,
    name: 'Automata Network',
    symbol: 'ATA',
  },
  {
    id: 10189,
    name: 'Hina Inu',
    symbol: '$HINA',
  },
  {
    id: 10190,
    name: 'LittleMouse',
    symbol: 'LTMS',
  },
  {
    id: 10195,
    name: 'UltraSafe Token',
    symbol: 'ULTRA',
  },
  {
    id: 10196,
    name: 'Keanu Inu',
    symbol: 'KEANU',
  },
  {
    id: 10197,
    name: 'Erotica',
    symbol: 'EROTICA',
  },
  {
    id: 10199,
    name: 'ENERGY Token',
    symbol: 'ENERGY',
  },
  {
    id: 10201,
    name: 'BitBook',
    symbol: 'BBT',
  },
  {
    id: 10205,
    name: 'Dobermann',
    symbol: 'DOBE',
  },
  {
    id: 10207,
    name: 'Zinari',
    symbol: 'ZINA',
  },
  {
    id: 10217,
    name: 'Cyclos',
    symbol: 'CYS',
  },
  {
    id: 10220,
    name: 'Museum of Crypto Art',
    symbol: 'MOCA',
  },
  {
    id: 10221,
    name: 'Fanadise',
    symbol: 'FAN',
  },
  {
    id: 10222,
    name: 'Vodra',
    symbol: 'VDR',
  },
  {
    id: 10223,
    name: 'Vega Protocol',
    symbol: 'VEGA',
  },
  {
    id: 10225,
    name: 'Pera Finance',
    symbol: 'PERA',
  },
  {
    id: 10227,
    name: 'GDOGE Finance',
    symbol: 'GDOGE',
  },
  {
    id: 10228,
    name: 'Omlira',
    symbol: 'OML',
  },
  {
    id: 10232,
    name: 'MakiSwap',
    symbol: 'MAKI',
  },
  {
    id: 10234,
    name: 'Draken',
    symbol: 'DRK',
  },
  {
    id: 10235,
    name: 'Bulk',
    symbol: 'BULK',
  },
  {
    id: 10237,
    name: 'QiDao',
    symbol: 'QI',
  },
  {
    id: 10238,
    name: 'MAI',
    symbol: 'MIMATIC',
  },
  {
    id: 10239,
    name: 'SpiritSwap',
    symbol: 'SPIRIT',
  },
  {
    id: 10240,
    name: 'Wrapped Fantom',
    symbol: 'WFTM',
  },
  {
    id: 10242,
    name: 'Pupper',
    symbol: 'PUP',
  },
  {
    id: 10244,
    name: 'Frapped USDT',
    symbol: 'fUSDT',
  },
  {
    id: 10246,
    name: 'KoHo Chain',
    symbol: 'KHC',
  },
  {
    id: 10249,
    name: 'MoonRabbit',
    symbol: 'MOONRABBIT',
  },
  {
    id: 10250,
    name: 'Sensible.Finance',
    symbol: 'SENSI',
  },
  {
    id: 10251,
    name: 'The Corgi of PolkaBridge',
    symbol: 'CORGIB',
  },
  {
    id: 10252,
    name: 'Mozart Finance',
    symbol: 'MELODY',
  },
  {
    id: 10253,
    name: 'GIVE GLOBAL',
    symbol: 'GIVE',
  },
  {
    id: 10255,
    name: 'Game Ace Token',
    symbol: 'GAT',
  },
  {
    id: 10257,
    name: 'Shibaken Finance',
    symbol: 'SHIBAKEN',
  },
  {
    id: 10258,
    name: 'ElonDoge DAO',
    symbol: 'EDAO',
  },
  {
    id: 10260,
    name: 'Thorstarter',
    symbol: 'XRUNE',
  },
  {
    id: 10262,
    name: 'KleeKai',
    symbol: 'KLEE',
  },
  {
    id: 10264,
    name: 'Charged Particles',
    symbol: 'IONX',
  },
  {
    id: 10265,
    name: 'Gold Fever',
    symbol: 'NGL',
  },
  {
    id: 10266,
    name: 'Direwolf',
    symbol: 'DIREWOLF',
  },
  {
    id: 10269,
    name: 'Cheems',
    symbol: 'CHEEMS',
  },
  {
    id: 10270,
    name: 'MILF',
    symbol: 'MILF',
  },
  {
    id: 10271,
    name: 'Eleven Finance',
    symbol: 'ELE',
  },
  {
    id: 10272,
    name: 'AladdinDAO',
    symbol: 'ALD',
  },
  {
    id: 10274,
    name: 'Catge coin',
    symbol: 'CATGE',
  },
  {
    id: 10275,
    name: 'Catgirl',
    symbol: 'CATGIRL',
  },
  {
    id: 10277,
    name: 'TRONPAD',
    symbol: 'TRONPAD',
  },
  {
    id: 10278,
    name: 'Genshiro',
    symbol: 'GENS',
  },
  {
    id: 10279,
    name: 'Less Network',
    symbol: 'LESS',
  },
  {
    id: 10282,
    name: 'SafePizza',
    symbol: 'PIZZA',
  },
  {
    id: 10285,
    name: 'Bitspawn',
    symbol: 'SPWN',
  },
  {
    id: 10288,
    name: 'Healing Potion',
    symbol: 'HPPOT',
  },
  {
    id: 10289,
    name: 'Daisy Launch Pad',
    symbol: 'DAISY',
  },
  {
    id: 10290,
    name: 'RFOX Finance',
    symbol: 'VFOX',
  },
  {
    id: 10291,
    name: 'Convex CRV',
    symbol: 'CVXCRV',
  },
  {
    id: 10293,
    name: 'Swarm',
    symbol: 'BZZ',
  },
  {
    id: 10295,
    name: 'IOI Token',
    symbol: 'IOI',
  },
  {
    id: 10297,
    name: 'HIPPO TOKEN',
    symbol: 'HIP',
  },
  {
    id: 10298,
    name: 'Sunder Goverance Token',
    symbol: 'Sunder',
  },
  {
    id: 10300,
    name: 'MiamiCoin',
    symbol: 'MIA',
  },
  {
    id: 10303,
    name: 'AutoShark',
    symbol: 'JAWS',
  },
  {
    id: 10307,
    name: 'Project Quantum',
    symbol: 'QBIT',
  },
  {
    id: 10311,
    name: 'NFT STARS',
    symbol: 'NFTS',
  },
  {
    id: 10312,
    name: 'EscoinToken',
    symbol: 'ELG',
  },
  {
    id: 10314,
    name: 'DragonBite',
    symbol: 'BITE',
  },
  {
    id: 10315,
    name: 'FarmHero',
    symbol: 'HERO',
  },
  {
    id: 10316,
    name: 'SafeETH',
    symbol: 'SAFEETH',
  },
  {
    id: 10319,
    name: 'Kombai Inu',
    symbol: 'KOMBAI',
  },
  {
    id: 10324,
    name: 'Gravity Finance',
    symbol: 'GFI',
  },
  {
    id: 10325,
    name: 'Safe Energy',
    symbol: 'ENERGYX',
  },
  {
    id: 10326,
    name: 'BullPerks',
    symbol: 'BLP',
  },
  {
    id: 10327,
    name: 'Yuang Coin',
    symbol: 'YUANG',
  },
  {
    id: 10329,
    name: 'TasteNFT',
    symbol: 'TASTE',
  },
  {
    id: 10331,
    name: 'Safeswap Governance Token',
    symbol: 'SSGT',
  },
  {
    id: 10333,
    name: 'PUGLIFE',
    symbol: 'PUGL',
  },
  {
    id: 10334,
    name: 'BabySwap',
    symbol: 'BABY',
  },
  {
    id: 10336,
    name: 'Hamster',
    symbol: 'HAM',
  },
  {
    id: 10337,
    name: 'Sheesha Finance [BEP20]',
    symbol: 'SHEESHA',
  },
  {
    id: 10340,
    name: 'BscArmy',
    symbol: 'BARMY',
  },
  {
    id: 10347,
    name: 'Human',
    symbol: 'HMT',
  },
  {
    id: 10348,
    name: 'Sarcophagus',
    symbol: 'SARCO',
  },
  {
    id: 10349,
    name: 'Blockmine',
    symbol: 'GOLD NUGGET',
  },
  {
    id: 10350,
    name: 'Black Eye Galaxy',
    symbol: 'BYG',
  },
  {
    id: 10351,
    name: 'HTMOON',
    symbol: 'HTMOON',
  },
  {
    id: 10361,
    name: 'Feyorra',
    symbol: 'FEY',
  },
  {
    id: 10364,
    name: 'APWine Finance',
    symbol: 'APW',
  },
  {
    id: 10366,
    name: 'Cake Monster',
    symbol: 'MONSTA',
  },
  {
    id: 10367,
    name: 'April',
    symbol: 'APRIL',
  },
  {
    id: 10368,
    name: 'Cryptex Finance',
    symbol: 'CTX',
  },
  {
    id: 10369,
    name: 'SafePanda',
    symbol: 'SPND',
  },
  {
    id: 10370,
    name: 'Global DeFi',
    symbol: 'GDEFI',
  },
  {
    id: 10371,
    name: 'Newinu',
    symbol: 'NEWINU',
  },
  {
    id: 10372,
    name: 'Dacxi',
    symbol: 'DACXI',
  },
  {
    id: 10373,
    name: 'SolFarm',
    symbol: 'TULIP',
  },
  {
    id: 10376,
    name: 'dAppstore',
    symbol: 'DAPPX',
  },
  {
    id: 10378,
    name: 'KarenCoin',
    symbol: 'KAREN',
  },
  {
    id: 10379,
    name: 'Kekwcoin',
    symbol: 'KEKW',
  },
  {
    id: 10381,
    name: 'Zild Finance',
    symbol: 'ZILD',
  },
  {
    id: 10384,
    name: 'DAO1',
    symbol: 'DAO1',
  },
  {
    id: 10385,
    name: 'Ally Direct Token',
    symbol: 'DRCT',
  },
  {
    id: 10387,
    name: 'Star Foxx',
    symbol: 'FOXX',
  },
  {
    id: 10388,
    name: 'SupremeX',
    symbol: 'SXC',
  },
  {
    id: 10391,
    name: 'Creator Platform',
    symbol: 'CTR',
  },
  {
    id: 10392,
    name: 'The Everlasting Parachain',
    symbol: 'ELP',
  },
  {
    id: 10393,
    name: 'LEOPARD',
    symbol: 'LEOPARD',
  },
  {
    id: 10394,
    name: 'Kuma Inu',
    symbol: 'KUMA',
  },
  {
    id: 10400,
    name: 'Bogecoin',
    symbol: 'BOGE',
  },
  {
    id: 10401,
    name: 'ZKCHAOS',
    symbol: 'CHAOS',
  },
  {
    id: 10402,
    name: 'BlackPool',
    symbol: 'BPT',
  },
  {
    id: 10403,
    name: 'Kommunitas',
    symbol: 'KOM',
  },
  {
    id: 10404,
    name: 'Integral',
    symbol: 'ITGR',
  },
  {
    id: 10405,
    name: 'NftyPlay',
    symbol: 'POLO',
  },
  {
    id: 10407,
    name: 'Baby Doge Coin',
    symbol: 'BabyDoge',
  },
  {
    id: 10408,
    name: 'Formation Fi',
    symbol: 'FORM',
  },
  {
    id: 10409,
    name: 'Opulous',
    symbol: 'OPUL',
  },
  {
    id: 10411,
    name: 'Moonfarm Finance',
    symbol: 'MFO',
  },
  {
    id: 10412,
    name: 'HoDooi.com',
    symbol: 'HOD',
  },
  {
    id: 10414,
    name: 'Green Shiba Inu (new)',
    symbol: 'GINUX',
  },
  {
    id: 10416,
    name: 'Fat Doge',
    symbol: 'FOGE',
  },
  {
    id: 10418,
    name: '2crazyNFT',
    symbol: '2CRZ',
  },
  {
    id: 10419,
    name: 'sEUR',
    symbol: 'SEUR',
  },
  {
    id: 10420,
    name: 'UCoin',
    symbol: 'UCOIN',
  },
  {
    id: 10421,
    name: 'Torum',
    symbol: 'XTM',
  },
  {
    id: 10423,
    name: 'HollaEx Token',
    symbol: 'XHT',
  },
  {
    id: 10424,
    name: 'Volatility Protocol Token',
    symbol: 'VOL',
  },
  {
    id: 10426,
    name: 'Stopelon',
    symbol: 'STOPELON',
  },
  {
    id: 10427,
    name: 'Polker',
    symbol: 'PKR',
  },
  {
    id: 10428,
    name: 'Alium Finance',
    symbol: 'ALM',
  },
  {
    id: 10429,
    name: 'HaloDAO',
    symbol: 'RNBW',
  },
  {
    id: 10430,
    name: 'Argentine Football Association Fan Token',
    symbol: 'ARG',
  },
  {
    id: 10431,
    name: 'Future Of Finance Fund',
    symbol: 'FFF',
  },
  {
    id: 10434,
    name: 'SafeLaunch',
    symbol: 'SFEX',
  },
  {
    id: 10435,
    name: 'PuddingSwap',
    symbol: 'PUD',
  },
  {
    id: 10436,
    name: 'Xiglute Coin',
    symbol: 'XGC',
  },
  {
    id: 10438,
    name: 'GoCerberus',
    symbol: 'CERBERUS',
  },
  {
    id: 10441,
    name: 'ApeRocket',
    symbol: 'SPACE',
  },
  {
    id: 10442,
    name: 'Decentralized Social',
    symbol: 'DESO',
  },
  {
    id: 10443,
    name: 'BarbecueSwap Finance',
    symbol: 'BBQ',
  },
  {
    id: 10445,
    name: 'Jomon Inu',
    symbol: 'JINU',
  },
  {
    id: 10447,
    name: 'Scooby',
    symbol: '$SBD',
  },
  {
    id: 10449,
    name: 'Gondola Finance',
    symbol: 'GDL',
  },
  {
    id: 10452,
    name: 'SolAPE Token',
    symbol: 'SOLAPE',
  },
  {
    id: 10455,
    name: 'EQIFI',
    symbol: 'EQX',
  },
  {
    id: 10456,
    name: 'Moon Nation Game',
    symbol: 'MNG',
  },
  {
    id: 10461,
    name: 'Memecoin',
    symbol: 'MEM',
  },
  {
    id: 10462,
    name: 'SHILL Token',
    symbol: 'SHILL',
  },
  {
    id: 10463,
    name: 'Anypad',
    symbol: 'APAD',
  },
  {
    id: 10465,
    name: 'Polytrade',
    symbol: 'TRADE',
  },
  {
    id: 10467,
    name: 'IRON Titanium Token',
    symbol: 'TITAN',
  },
  {
    id: 10468,
    name: 'InvestDex',
    symbol: 'INVEST',
  },
  {
    id: 10469,
    name: 'iMe Lab',
    symbol: 'LIME',
  },
  {
    id: 10480,
    name: 'Mammon',
    symbol: 'MMON',
  },
  {
    id: 10482,
    name: 'BULL FINANCE',
    symbol: 'BULL',
  },
  {
    id: 10483,
    name: 'ShapePay',
    symbol: 'SPP',
  },
  {
    id: 10484,
    name: 'Iron',
    symbol: 'IRON',
  },
  {
    id: 10485,
    name: 'Credmark',
    symbol: 'CMK',
  },
  {
    id: 10489,
    name: 'Doggy Swap',
    symbol: 'DOGS',
  },
  {
    id: 10491,
    name: 'PancakeFork Finance',
    symbol: 'CAKF',
  },
  {
    id: 10492,
    name: 'Genebank Token',
    symbol: 'GNBT',
  },
  {
    id: 10494,
    name: 'Octopus Protocol',
    symbol: 'OPS',
  },
  {
    id: 10498,
    name: 'Saitama',
    symbol: 'SAITAMA',
  },
  {
    id: 10499,
    name: 'CleanOcean',
    symbol: 'CLEANOCEAN',
  },
  {
    id: 10501,
    name: 'BaconDAO',
    symbol: 'BACON',
  },
  {
    id: 10502,
    name: 'SafeMars',
    symbol: 'SMARS',
  },
  {
    id: 10503,
    name: 'Prude Token',
    symbol: 'PRUDE',
  },
  {
    id: 10504,
    name: 'Hepa Finance',
    symbol: 'HEPA',
  },
  {
    id: 10506,
    name: 'HitBTC Token',
    symbol: 'HIT',
  },
  {
    id: 10508,
    name: 'Instadapp',
    symbol: 'INST',
  },
  {
    id: 10511,
    name: 'Cavapoo',
    symbol: 'CAVA',
  },
  {
    id: 10512,
    name: 'SAFETREES',
    symbol: 'TREES',
  },
  {
    id: 10513,
    name: 'PinkPanda',
    symbol: 'PINKPANDA',
  },
  {
    id: 10514,
    name: 'HUNNY FINANCE',
    symbol: 'HUNNY',
  },
  {
    id: 10515,
    name: 'ARC Governance',
    symbol: 'ARCX',
  },
  {
    id: 10516,
    name: 'Promise',
    symbol: 'PROMISE',
  },
  {
    id: 10517,
    name: 'BoomBaby.io',
    symbol: 'BOOMB',
  },
  {
    id: 10519,
    name: 'Curio Stable Coin',
    symbol: 'CSC',
  },
  {
    id: 10522,
    name: 'Pacoca',
    symbol: 'PACOCA',
  },
  {
    id: 10524,
    name: 'reBaked',
    symbol: 'BAKED',
  },
  {
    id: 10525,
    name: 'Plutos Network',
    symbol: 'PLUT',
  },
  {
    id: 10526,
    name: 'TribeOne',
    symbol: 'HAKA',
  },
  {
    id: 10527,
    name: 'Lithium',
    symbol: 'LITH',
  },
  {
    id: 10528,
    name: 'ExzoCoin 2.0',
    symbol: 'EXZO',
  },
  {
    id: 10529,
    name: 'Sun (New)',
    symbol: 'SUN',
  },
  {
    id: 10530,
    name: 'CrossWallet',
    symbol: 'CWT',
  },
  {
    id: 10531,
    name: 'ButterSwap',
    symbol: 'BUTTER',
  },
  {
    id: 10532,
    name: 'Divergence',
    symbol: 'DIVER',
  },
  {
    id: 10533,
    name: 'Mindsync',
    symbol: 'MAI',
  },
  {
    id: 10537,
    name: 'Xolo Finance',
    symbol: 'XOLO',
  },
  {
    id: 10541,
    name: 'AnimalHouse',
    symbol: 'AHOUSE',
  },
  {
    id: 10543,
    name: 'Ballbag Token',
    symbol: 'BALLBAG',
  },
  {
    id: 10544,
    name: 'Bitcrush',
    symbol: 'CRUSH',
  },
  {
    id: 10547,
    name: 'Bagels Finance',
    symbol: 'BAGEL',
  },
  {
    id: 10548,
    name: 'EverRise',
    symbol: 'RISE',
  },
  {
    id: 10550,
    name: 'King Arthur',
    symbol: 'BKING',
  },
  {
    id: 10552,
    name: 'DUKE INU TOKEN',
    symbol: 'DUKE',
  },
  {
    id: 10554,
    name: 'Sekuritance',
    symbol: 'SKRT',
  },
  {
    id: 10555,
    name: 'Canary',
    symbol: 'CNR',
  },
  {
    id: 10556,
    name: 'B.Protocol',
    symbol: 'BPRO',
  },
  {
    id: 10557,
    name: 'Swapz',
    symbol: 'SWAPZ',
  },
  {
    id: 10560,
    name: 'SoMee Advertising Token',
    symbol: 'SAT',
  },
  {
    id: 10561,
    name: 'Polystarter.net',
    symbol: 'POLR',
  },
  {
    id: 10563,
    name: 'Decubate',
    symbol: 'DCB',
  },
  {
    id: 10566,
    name: 'BlackHat',
    symbol: 'BLKC',
  },
  {
    id: 10570,
    name: 'Binance Smart Chain Girl',
    symbol: 'BSCGIRL',
  },
  {
    id: 10576,
    name: 'MoonLift Protocol',
    symbol: 'MLTPX',
  },
  {
    id: 10578,
    name: 'Myōbu',
    symbol: 'MYOBU',
  },
  {
    id: 10581,
    name: 'Axolotl Finance',
    symbol: 'AXO',
  },
  {
    id: 10583,
    name: 'Monkey Token',
    symbol: 'MBY',
  },
  {
    id: 10584,
    name: 'Jejudoge',
    symbol: 'JEJUDOGE',
  },
  {
    id: 10585,
    name: 'TrustFi Network',
    symbol: 'TFI',
  },
  {
    id: 10586,
    name: 'TABOO TOKEN',
    symbol: 'TABOO',
  },
  {
    id: 10592,
    name: 'Lith Token',
    symbol: 'LITH',
  },
  {
    id: 10593,
    name: 'Flurry Finance',
    symbol: 'FLURRY',
  },
  {
    id: 10594,
    name: 'Liquidifty',
    symbol: 'LQT',
  },
  {
    id: 10598,
    name: 'LedgerScore',
    symbol: 'LED',
  },
  {
    id: 10602,
    name: 'Base Reward Token',
    symbol: 'BRT',
  },
  {
    id: 10603,
    name: 'Immutable X',
    symbol: 'IMX',
  },
  {
    id: 10605,
    name: 'HOGT',
    symbol: 'HOGT',
  },
  {
    id: 10608,
    name: 'Sake',
    symbol: 'SAK3',
  },
  {
    id: 10609,
    name: 'Fanspel',
    symbol: 'FAN',
  },
  {
    id: 10610,
    name: 'SMARTPAD',
    symbol: 'PAD',
  },
  {
    id: 10613,
    name: 'Empire Token',
    symbol: 'EMPIRE',
  },
  {
    id: 10616,
    name: 'Shibby',
    symbol: 'SHIBBY',
  },
  {
    id: 10620,
    name: 'FarmHero',
    symbol: 'HONOR',
  },
  {
    id: 10622,
    name: 'XCarnival',
    symbol: 'XCV',
  },
  {
    id: 10628,
    name: 'Hyper Deflate',
    symbol: 'HDFL',
  },
  {
    id: 10629,
    name: 'PussyCredit',
    symbol: 'PUSSC',
  },
  {
    id: 10631,
    name: 'Gods Unchained',
    symbol: 'GODS',
  },
  {
    id: 10632,
    name: 'Nimbus Governance Token',
    symbol: 'GNBU',
  },
  {
    id: 10636,
    name: 'Xiasi Inu',
    symbol: 'XIASI',
  },
  {
    id: 10637,
    name: 'CARMA COIN',
    symbol: 'CARMA',
  },
  {
    id: 10639,
    name: 'Steel',
    symbol: 'STEEL',
  },
  {
    id: 10640,
    name: 'Kawakami Inu',
    symbol: 'KAWA',
  },
  {
    id: 10641,
    name: 'RichQUACK.com',
    symbol: 'QUACK',
  },
  {
    id: 10642,
    name: 'GoldFarm',
    symbol: 'GOLD',
  },
  {
    id: 10644,
    name: 'SafeBull',
    symbol: 'SAFEBULL',
  },
  {
    id: 10646,
    name: 'Night Life Crypto',
    symbol: 'NLIFE',
  },
  {
    id: 10647,
    name: 'BNbitcoin',
    symbol: 'BNBTC',
  },
  {
    id: 10648,
    name: 'EIFI FINANCE',
    symbol: 'EIFI',
  },
  {
    id: 10649,
    name: 'MoonPump',
    symbol: 'PUMP',
  },
  {
    id: 10653,
    name: 'JDI Yield',
    symbol: 'JDI',
  },
  {
    id: 10657,
    name: 'YetiSwap',
    symbol: 'YTS',
  },
  {
    id: 10660,
    name: 'AUTZ Token',
    symbol: 'AUTZ',
  },
  {
    id: 10665,
    name: 'KogeCoin.io',
    symbol: 'KOGECOIN',
  },
  {
    id: 10666,
    name: 'Lanceria',
    symbol: 'LANC',
  },
  {
    id: 10669,
    name: 'Pallapay',
    symbol: 'PALLA',
  },
  {
    id: 10674,
    name: 'Synapse Network',
    symbol: 'SNP',
  },
  {
    id: 10675,
    name: 'Hare Token',
    symbol: 'HARE',
  },
  {
    id: 10681,
    name: 'MoonRise',
    symbol: 'MOONRISE',
  },
  {
    id: 10684,
    name: 'Tiki Token',
    symbol: 'TIKI',
  },
  {
    id: 10685,
    name: 'Olive Cash',
    symbol: 'OLIVE',
  },
  {
    id: 10686,
    name: 'Evanesco Network',
    symbol: 'EVA',
  },
  {
    id: 10688,
    name: 'Yield Guild Games',
    symbol: 'YGG',
  },
  {
    id: 10692,
    name: 'Aidi Finance',
    symbol: 'AIDI',
  },
  {
    id: 10693,
    name: 'Whale Fall',
    symbol: 'Whale',
  },
  {
    id: 10695,
    name: 'MoonEdge',
    symbol: 'MOONED',
  },
  {
    id: 10696,
    name: 'MaticPad',
    symbol: 'MATPAD',
  },
  {
    id: 10700,
    name: 'KickToken',
    symbol: 'KICK',
  },
  {
    id: 10704,
    name: 'Binamon',
    symbol: 'BMON',
  },
  {
    id: 10705,
    name: 'CoinSwap Space',
    symbol: 'CSS',
  },
  {
    id: 10706,
    name: 'peachfolio',
    symbol: 'PCHF',
  },
  {
    id: 10712,
    name: 'Flourishing AI',
    symbol: 'AI',
  },
  {
    id: 10713,
    name: 'Burp',
    symbol: 'BURP',
  },
  {
    id: 10714,
    name: 'Babylons',
    symbol: 'BABI',
  },
  {
    id: 10715,
    name: 'AirCoin',
    symbol: 'AIR',
  },
  {
    id: 10716,
    name: 'Nobunaga Token',
    symbol: 'NBNG',
  },
  {
    id: 10720,
    name: 'Black Phoenix',
    symbol: 'BPX',
  },
  {
    id: 10721,
    name: 'TacoCat Token',
    symbol: 'TCT',
  },
  {
    id: 10722,
    name: 'SolanaSail',
    symbol: 'SAIL',
  },
  {
    id: 10723,
    name: 'Waves Ducks',
    symbol: 'EGG',
  },
  {
    id: 10724,
    name: 'SolarWind Token',
    symbol: 'SLW',
  },
  {
    id: 10725,
    name: 'WaultSwap Polygon',
    symbol: 'WEXPOLY',
  },
  {
    id: 10727,
    name: 'Bird Finance(HECO)',
    symbol: 'BIRD',
  },
  {
    id: 10729,
    name: 'UFO Gaming',
    symbol: 'UFO',
  },
  {
    id: 10730,
    name: 'CherryPick',
    symbol: 'CHERRY',
  },
  {
    id: 10731,
    name: 'MCS Token',
    symbol: 'MCS',
  },
  {
    id: 10735,
    name: 'SOCIETY OF GALACTIC EXPLORATION',
    symbol: 'SGE',
  },
  {
    id: 10736,
    name: 'Kelpie Inu',
    symbol: 'KELPIE',
  },
  {
    id: 10740,
    name: 'Liti Capital',
    symbol: 'WLITI',
  },
  {
    id: 10742,
    name: 'NEXTYPE',
    symbol: 'NT',
  },
  {
    id: 10744,
    name: 'DeRace',
    symbol: 'DERC',
  },
  {
    id: 10746,
    name: 'Biswap',
    symbol: 'BSW',
  },
  {
    id: 10747,
    name: 'ETHPad',
    symbol: 'ETHPAD',
  },
  {
    id: 10748,
    name: 'PolkaWar',
    symbol: 'PWAR',
  },
  {
    id: 10750,
    name: 'Qredo',
    symbol: 'QRDO',
  },
  {
    id: 10751,
    name: 'Sportemon-Go',
    symbol: 'SGO',
  },
  {
    id: 10752,
    name: 'Floki Shiba',
    symbol: 'FSHIB',
  },
  {
    id: 10753,
    name: 'Evodefi',
    symbol: 'GENX',
  },
  {
    id: 10754,
    name: 'Travel Care',
    symbol: 'TRAVEL',
  },
  {
    id: 10756,
    name: 'Omni Real Estate Token',
    symbol: 'ORT',
  },
  {
    id: 10757,
    name: 'Turtle',
    symbol: 'TURTLE',
  },
  {
    id: 10759,
    name: 'DeversiFi',
    symbol: 'DVF',
  },
  {
    id: 10762,
    name: 'Leonicorn Swap',
    symbol: 'LEOS',
  },
  {
    id: 10763,
    name: 'Aston Martin Cognizant Fan Token',
    symbol: 'AM',
  },
  {
    id: 10764,
    name: 'OLYMPUS',
    symbol: 'OLYMPUS',
  },
  {
    id: 10767,
    name: 'Pylon Protocol',
    symbol: 'MINE',
  },
  {
    id: 10769,
    name: 'Baby Moon Wolf',
    symbol: 'BABYWOLF',
  },
  {
    id: 10770,
    name: 'SafeBreast Inu',
    symbol: 'BREAST',
  },
  {
    id: 10772,
    name: 'Tardigrades Finance (BSC)',
    symbol: 'TRDG',
  },
  {
    id: 10774,
    name: 'Sonar',
    symbol: 'PING',
  },
  {
    id: 10775,
    name: 'Locklet',
    symbol: 'LKT',
  },
  {
    id: 10776,
    name: 'Signum',
    symbol: 'SIGNA',
  },
  {
    id: 10777,
    name: 'DinoSwap',
    symbol: 'DINO',
  },
  {
    id: 10778,
    name: 'Metahero',
    symbol: 'HERO',
  },
  {
    id: 10779,
    name: 'LOVE EARTH COIN',
    symbol: 'LEC',
  },
  {
    id: 10783,
    name: 'SWAPP Protocol',
    symbol: 'SWAPP',
  },
  {
    id: 10784,
    name: 'KCCPAD',
    symbol: 'KCCPAD',
  },
  {
    id: 10787,
    name: 'Thoreum',
    symbol: 'THOREUM',
  },
  {
    id: 10789,
    name: 'Tether EURt',
    symbol: 'EURT',
  },
  {
    id: 10790,
    name: "Arty's World",
    symbol: 'ARTY',
  },
  {
    id: 10791,
    name: 'eCash',
    symbol: 'XEC',
  },
  {
    id: 10793,
    name: 'Alfa Romeo Racing ORLEN Fan Token',
    symbol: 'SAUBER',
  },
  {
    id: 10794,
    name: '$OFC Coin',
    symbol: 'OFC',
  },
  {
    id: 10796,
    name: 'ARTH Shares',
    symbol: 'ARTHX',
  },
  {
    id: 10797,
    name: 'ACryptoSI',
    symbol: 'ACSI',
  },
  {
    id: 10798,
    name: 'MiniDOGE',
    symbol: 'MINIDOGE',
  },
  {
    id: 10799,
    name: 'SCIFI Index',
    symbol: 'SCIFI',
  },
  {
    id: 10800,
    name: 'Hungarian Vizsla Inu',
    symbol: 'HVI',
  },
  {
    id: 10801,
    name: 'DashSports',
    symbol: 'DASS',
  },
  {
    id: 10803,
    name: 'RealFevr',
    symbol: 'FEVR',
  },
  {
    id: 10804,
    name: 'Floki Inu',
    symbol: 'FLOKI',
  },
  {
    id: 10805,
    name: 'Throne',
    symbol: 'THN',
  },
  {
    id: 10807,
    name: 'CoinW Token',
    symbol: 'CWT',
  },
  {
    id: 10808,
    name: 'Ubeswap',
    symbol: 'UBE',
  },
  {
    id: 10809,
    name: 'Inari',
    symbol: 'INARI',
  },
  {
    id: 10810,
    name: 'Jetswap.finance',
    symbol: 'WINGS',
  },
  {
    id: 10814,
    name: 'One Basis Cash',
    symbol: 'OBS',
  },
  {
    id: 10815,
    name: 'Vacay',
    symbol: 'VACAY',
  },
  {
    id: 10817,
    name: 'Ryoshi Token',
    symbol: 'RYOSHI',
  },
  {
    id: 10818,
    name: 'Penguin Finance',
    symbol: 'PEFI',
  },
  {
    id: 10819,
    name: 'MocktailSwap',
    symbol: 'MOK',
  },
  {
    id: 10820,
    name: 'Yieldly',
    symbol: 'YLDY',
  },
  {
    id: 10821,
    name: 'Starlink',
    symbol: 'STARL',
  },
  {
    id: 10822,
    name: 'Robust Token',
    symbol: 'RBT',
  },
  {
    id: 10824,
    name: 'Hertz Network',
    symbol: 'HTZ',
  },
  {
    id: 10829,
    name: 'NEFTiPEDiA',
    symbol: 'NFT',
  },
  {
    id: 10830,
    name: 'ZORT',
    symbol: 'ZORT',
  },
  {
    id: 10831,
    name: 'Parallel Protocol',
    symbol: 'MIMO',
  },
  {
    id: 10832,
    name: 'Etherlite',
    symbol: 'ETL',
  },
  {
    id: 10833,
    name: 'ADAX',
    symbol: 'ADAX',
  },
  {
    id: 10834,
    name: 'GemBites',
    symbol: 'GBTS',
  },
  {
    id: 10836,
    name: 'NUT MONEY',
    symbol: 'NUT',
  },
  {
    id: 10838,
    name: 'GIVE Token',
    symbol: 'GIVE',
  },
  {
    id: 10839,
    name: 'Yield Parrot',
    symbol: 'LORY',
  },
  {
    id: 10841,
    name: 'Wolf Safe Poor People',
    symbol: 'WSPP',
  },
  {
    id: 10844,
    name: 'Zerogoki',
    symbol: 'REI',
  },
  {
    id: 10847,
    name: 'TurboTrix Finance',
    symbol: 'TTF',
  },
  {
    id: 10848,
    name: 'Polyroll',
    symbol: 'ROLL',
  },
  {
    id: 10850,
    name: 'CFL 365 Finance',
    symbol: 'CFL365',
  },
  {
    id: 10851,
    name: 'Useless',
    symbol: 'USELESS',
  },
  {
    id: 10853,
    name: 'ETHDOWN',
    symbol: 'ETHDOWN',
  },
  {
    id: 10854,
    name: 'Railgun',
    symbol: 'RAIL',
  },
  {
    id: 10856,
    name: 'BabySpaceFloki',
    symbol: 'BSF',
  },
  {
    id: 10857,
    name: 'Shibance',
    symbol: 'WOOF',
  },
  {
    id: 10858,
    name: 'GOMA Finance',
    symbol: 'GOMA',
  },
  {
    id: 10861,
    name: 'Gamestarter',
    symbol: 'GAME',
  },
  {
    id: 10862,
    name: 'Tiger Cub',
    symbol: 'TCUB',
  },
  {
    id: 10863,
    name: 'RichCity',
    symbol: 'RICH',
  },
  {
    id: 10864,
    name: 'NAFTY',
    symbol: 'NAFTY',
  },
  {
    id: 10865,
    name: 'ARTH [polygon]',
    symbol: 'ARTH',
  },
  {
    id: 10866,
    name: 'Million',
    symbol: 'MM',
  },
  {
    id: 10869,
    name: 'Baby Bitcoin',
    symbol: 'BBTC',
  },
  {
    id: 10870,
    name: 'RARA',
    symbol: 'RARA',
  },
  {
    id: 10872,
    name: 'BABYXRP',
    symbol: 'BBYXRP',
  },
  {
    id: 10873,
    name: 'DOOR',
    symbol: 'DOOR',
  },
  {
    id: 10875,
    name: 'ChainCade',
    symbol: 'CHAINCADE',
  },
  {
    id: 10876,
    name: 'Mommy Doge Coin',
    symbol: 'MOMMYDOGE',
  },
  {
    id: 10877,
    name: 'Ainu Token',
    symbol: 'AINU',
  },
  {
    id: 10880,
    name: 'Didcoin',
    symbol: 'DID',
  },
  {
    id: 10881,
    name: 'UltimoGG',
    symbol: 'ULTGG',
  },
  {
    id: 10887,
    name: 'CatBread',
    symbol: 'CATBREAD',
  },
  {
    id: 10888,
    name: 'NewB.Farm',
    symbol: 'NEWB',
  },
  {
    id: 10889,
    name: 'DRIFE',
    symbol: 'DRF',
  },
  {
    id: 10891,
    name: 'Only1',
    symbol: 'LIKE',
  },
  {
    id: 10893,
    name: 'Brokoli Network',
    symbol: 'BRKL',
  },
  {
    id: 10894,
    name: 'StorX Network',
    symbol: 'SRX',
  },
  {
    id: 10895,
    name: 'SEED',
    symbol: 'SEED',
  },
  {
    id: 10896,
    name: 'CumStar',
    symbol: 'CUMSTAR',
  },
  {
    id: 10897,
    name: 'Alitas',
    symbol: 'ALT',
  },
  {
    id: 10898,
    name: 'Wrapped Centrifuge',
    symbol: 'WCFG',
  },
  {
    id: 10899,
    name: 'Daddy Doge',
    symbol: 'DADDYDOGE',
  },
  {
    id: 10900,
    name: 'Hachiko Inu',
    symbol: 'INU',
  },
  {
    id: 10901,
    name: 'Shiba Floki',
    symbol: 'FLOKI',
  },
  {
    id: 10902,
    name: 'TruBadger',
    symbol: 'TRUBGR',
  },
  {
    id: 10903,
    name: 'Coin98',
    symbol: 'C98',
  },
  {
    id: 10904,
    name: 'BunnyPark',
    symbol: 'BP',
  },
  {
    id: 10905,
    name: 'AirNFTs',
    symbol: 'AIRT',
  },
  {
    id: 10908,
    name: 'KuSwap',
    symbol: 'KUS',
  },
  {
    id: 10909,
    name: 'Unicly Genesis MoonCats Collection',
    symbol: 'UGMC',
  },
  {
    id: 10911,
    name: 'MissDoge',
    symbol: 'MDOGE',
  },
  {
    id: 10914,
    name: 'BABY DOGE INU',
    symbol: '$BABYDOGEINU',
  },
  {
    id: 10918,
    name: 'Crypto Village Accelerator',
    symbol: 'CVAG',
  },
  {
    id: 10919,
    name: 'CoinsPaid',
    symbol: 'CPD',
  },
  {
    id: 10922,
    name: 'TreasureKey',
    symbol: 'PIRATE',
  },
  {
    id: 10925,
    name: 'CBET Token',
    symbol: 'CBET',
  },
  {
    id: 10928,
    name: 'DOJO',
    symbol: 'DOJO',
  },
  {
    id: 10929,
    name: 'ZoidPay',
    symbol: 'ZPAY',
  },
  {
    id: 10932,
    name: 'Impossible Finance',
    symbol: 'IF',
  },
  {
    id: 10933,
    name: 'Impossible Decentralized Incubator Access',
    symbol: 'IDIA',
  },
  {
    id: 10935,
    name: 'Aldrin',
    symbol: 'RIN',
  },
  {
    id: 10937,
    name: 'SafeCap Token',
    symbol: 'SFC',
  },
  {
    id: 10943,
    name: 'miniShibaToken',
    symbol: 'MINISHIB',
  },
  {
    id: 10944,
    name: 'OMNI - People Driven',
    symbol: 'OAI',
  },
  {
    id: 10947,
    name: 'GODL',
    symbol: 'GODL',
  },
  {
    id: 10949,
    name: 'Baanx',
    symbol: 'BXX',
  },
  {
    id: 10951,
    name: 'Tokyo AU',
    symbol: 'TOKAU',
  },
  {
    id: 10952,
    name: "The People's Coin",
    symbol: 'PEEPS',
  },
  {
    id: 10953,
    name: 'Kaby Arena',
    symbol: 'KABY',
  },
  {
    id: 10954,
    name: 'MContent',
    symbol: 'MCONTENT',
  },
  {
    id: 10955,
    name: '1TRONIC Network',
    symbol: '1TRC',
  },
  {
    id: 10959,
    name: 'Zoe Cash',
    symbol: 'ZOE',
  },
  {
    id: 10960,
    name: 'WIZARD',
    symbol: 'WIZARD',
  },
  {
    id: 10963,
    name: 'Wolfystreetbets',
    symbol: 'WOLFY',
  },
  {
    id: 10965,
    name: 'XXT-Token',
    symbol: 'XXT',
  },
  {
    id: 10967,
    name: 'YIN Finance',
    symbol: 'YIN',
  },
  {
    id: 10968,
    name: 'MultiPad',
    symbol: 'MPAD',
  },
  {
    id: 10969,
    name: 'Cardence.io',
    symbol: '$CRDN',
  },
  {
    id: 10970,
    name: 'BabyDoge ETH',
    symbol: 'BABYDOGE',
  },
  {
    id: 10971,
    name: 'Baby Cake',
    symbol: 'BABYCAKE',
  },
  {
    id: 10973,
    name: 'PureFi Protocol',
    symbol: 'UFI',
  },
  {
    id: 10974,
    name: 'Tranchess',
    symbol: 'CHESS',
  },
  {
    id: 10976,
    name: 'Crusaders of Crypto',
    symbol: 'CRUSADER',
  },
  {
    id: 10977,
    name: 'Mint Club',
    symbol: 'MINT',
  },
  {
    id: 10978,
    name: 'PolkaCipher',
    symbol: 'CPHR',
  },
  {
    id: 10979,
    name: 'Universe.XYZ',
    symbol: 'XYZ',
  },
  {
    id: 10980,
    name: 'Digies Coin',
    symbol: 'DIGS',
  },
  {
    id: 10983,
    name: 'Queen of Shiba',
    symbol: 'QUEENSHIBA',
  },
  {
    id: 10987,
    name: 'AVME',
    symbol: 'AVME',
  },
  {
    id: 10988,
    name: 'Safe Earn',
    symbol: 'SAFEARN',
  },
  {
    id: 10990,
    name: 'DAppNode',
    symbol: 'NODE',
  },
  {
    id: 10991,
    name: 'Aurum',
    symbol: '$AUR',
  },
  {
    id: 10994,
    name: 'BiShares',
    symbol: 'BISON',
  },
  {
    id: 10998,
    name: 'Wild Credit',
    symbol: 'WILD',
  },
  {
    id: 11001,
    name: 'DogeBTC',
    symbol: 'DOGEBTC',
  },
  {
    id: 11003,
    name: 'Diamonds Alaska Malamuted',
    symbol: 'DAM',
  },
  {
    id: 11004,
    name: 'RisingSun',
    symbol: 'RSUN',
  },
  {
    id: 11007,
    name: 'Bitcoin Banana',
    symbol: 'BIBA',
  },
  {
    id: 11009,
    name: 'Military Finance',
    symbol: 'MIL',
  },
  {
    id: 11011,
    name: 'Projekt Diamond',
    symbol: 'DIAMND',
  },
  {
    id: 11013,
    name: 'LIQ Protocol',
    symbol: 'LIQ',
  },
  {
    id: 11015,
    name: 'Team Vitality Fan Token',
    symbol: 'VIT',
  },
  {
    id: 11016,
    name: 'CoinMerge',
    symbol: 'CMERGE',
  },
  {
    id: 11017,
    name: 'PolygonFarm Finance',
    symbol: 'SPADE',
  },
  {
    id: 11018,
    name: 'CryptoArt.Ai',
    symbol: 'CART',
  },
  {
    id: 11019,
    name: 'TeslaSafe',
    symbol: 'TESLASAFE',
  },
  {
    id: 11020,
    name: 'ZOO Crypto World',
    symbol: 'ZOO',
  },
  {
    id: 11022,
    name: 'PackagePortal',
    symbol: 'PORT',
  },
  {
    id: 11023,
    name: 'Wrapped KuCoin Token',
    symbol: 'WKCS',
  },
  {
    id: 11024,
    name: 'KingDeFi',
    symbol: 'KRW',
  },
  {
    id: 11026,
    name: 'Spacelens',
    symbol: 'SPACE',
  },
  {
    id: 11027,
    name: 'Dexfolio',
    symbol: 'DEXF',
  },
  {
    id: 11029,
    name: 'Artex',
    symbol: 'ARTEX',
  },
  {
    id: 11030,
    name: 'TAIYO',
    symbol: 'TAIYO',
  },
  {
    id: 11033,
    name: 'RedFEG',
    symbol: 'REDFEG',
  },
  {
    id: 11035,
    name: 'Splintershards',
    symbol: 'SPS',
  },
  {
    id: 11036,
    name: 'Alkimi',
    symbol: '$ADS',
  },
  {
    id: 11037,
    name: 'ShibaMask',
    symbol: 'SHBMA',
  },
  {
    id: 11038,
    name: 'BFG Token',
    symbol: 'BFG',
  },
  {
    id: 11039,
    name: 'AMC FIGHT NIGHT',
    symbol: 'AMC',
  },
  {
    id: 11041,
    name: 'Kross Chain LaunchPad',
    symbol: 'KCLP',
  },
  {
    id: 11042,
    name: 'NFTBooks',
    symbol: 'NFTBS',
  },
  {
    id: 11043,
    name: 'Gambler Shiba',
    symbol: 'GSHIBA',
  },
  {
    id: 11046,
    name: 'The Pablo Token',
    symbol: 'PABLO',
  },
  {
    id: 11047,
    name: 'GameX',
    symbol: 'GMX',
  },
  {
    id: 11053,
    name: 'Cogecoin',
    symbol: 'COGE',
  },
  {
    id: 11055,
    name: 'SaveBritney',
    symbol: 'SBRT',
  },
  {
    id: 11056,
    name: 'Golden Doge',
    symbol: 'GDOGE',
  },
  {
    id: 11057,
    name: 'RiceFarm Token',
    symbol: 'RICE',
  },
  {
    id: 11060,
    name: 'Baby Shiba Inu',
    symbol: 'BABYSHIBAINU',
  },
  {
    id: 11061,
    name: 'Multiverse',
    symbol: 'AI',
  },
  {
    id: 11062,
    name: 'MaticVerse',
    symbol: 'Mverse',
  },
  {
    id: 11066,
    name: 'DinoX',
    symbol: 'DNXC',
  },
  {
    id: 11067,
    name: 'Step Hero',
    symbol: 'HERO',
  },
  {
    id: 11074,
    name: '1-UP',
    symbol: '1-UP',
  },
  {
    id: 11075,
    name: 'Pyram Token',
    symbol: 'PYRAM',
  },
  {
    id: 11076,
    name: 'JOJO',
    symbol: 'JOJO',
  },
  {
    id: 11078,
    name: 'IAGON',
    symbol: 'IAG',
  },
  {
    id: 11079,
    name: 'Bitrise',
    symbol: 'BRISE',
  },
  {
    id: 11080,
    name: 'Fibswap DEx',
    symbol: 'FIBO',
  },
  {
    id: 11082,
    name: 'Arena Token',
    symbol: 'ARENA',
  },
  {
    id: 11083,
    name: 'TripCandy',
    symbol: 'CANDY',
  },
  {
    id: 11085,
    name: 'BitBase Token',
    symbol: 'BTBS',
  },
  {
    id: 11086,
    name: 'Gamerse',
    symbol: 'LFG',
  },
  {
    id: 11087,
    name: 'Ethereum Chain Token',
    symbol: 'ECT',
  },
  {
    id: 11088,
    name: 'Enjinstarter',
    symbol: 'EJS',
  },
  {
    id: 11089,
    name: 'Ninja Doge',
    symbol: '$NINJADOGE',
  },
  {
    id: 11090,
    name: 'Invitoken',
    symbol: 'INVI',
  },
  {
    id: 11092,
    name: 'Bitget Token',
    symbol: 'BGB',
  },
  {
    id: 11093,
    name: 'Drip Network',
    symbol: 'DRIP',
  },
  {
    id: 11103,
    name: 'Strike ETH',
    symbol: 'sETH',
  },
  {
    id: 11104,
    name: 'Artery Network',
    symbol: 'ARTR',
  },
  {
    id: 11105,
    name: 'PearZap',
    symbol: 'PEAR',
  },
  {
    id: 11106,
    name: 'Binamars',
    symbol: 'BMARS',
  },
  {
    id: 11107,
    name: 'Birb',
    symbol: 'BIRB',
  },
  {
    id: 11108,
    name: 'Foxy Equilibrium',
    symbol: 'Foxy',
  },
  {
    id: 11109,
    name: 'Electric Cash',
    symbol: 'ELCASH',
  },
  {
    id: 11110,
    name: 'Spores Network',
    symbol: 'SPO',
  },
  {
    id: 11112,
    name: 'MyBricks',
    symbol: '$BRICKS',
  },
  {
    id: 11113,
    name: 'Unipilot',
    symbol: 'PILOT',
  },
  {
    id: 11114,
    name: 'xNFT Protocol',
    symbol: 'XNFT',
  },
  {
    id: 11115,
    name: 'LoserChick EGG',
    symbol: 'EGG',
  },
  {
    id: 11116,
    name: 'LoserChick',
    symbol: 'CHICK',
  },
  {
    id: 11118,
    name: 'RBIZ',
    symbol: 'RBIZ',
  },
  {
    id: 11119,
    name: 'Bimp.Finance',
    symbol: 'BIMP',
  },
  {
    id: 11120,
    name: 'Seeder Finance',
    symbol: 'LEAF',
  },
  {
    id: 11121,
    name: 'Rewards',
    symbol: 'RWD',
  },
  {
    id: 11126,
    name: 'Hypersign identity',
    symbol: 'HID',
  },
  {
    id: 11129,
    name: 'CryptoZoon',
    symbol: 'ZOON',
  },
  {
    id: 11130,
    name: 'Plant Vs Undead',
    symbol: 'PVU',
  },
  {
    id: 11132,
    name: 'Wrapped OKT',
    symbol: 'WOKT',
  },
  {
    id: 11134,
    name: 'OEC BTC',
    symbol: 'BTCK',
  },
  {
    id: 11139,
    name: 'Tokenplay',
    symbol: 'TOP',
  },
  {
    id: 11146,
    name: 'Jswap.Finance',
    symbol: 'JF',
  },
  {
    id: 11147,
    name: 'DeFi11',
    symbol: 'D11',
  },
  {
    id: 11148,
    name: 'Proxy',
    symbol: 'PRXY',
  },
  {
    id: 11149,
    name: 'Tenshi',
    symbol: 'TENSHI',
  },
  {
    id: 11150,
    name: 'Define',
    symbol: 'DFA',
  },
  {
    id: 11153,
    name: 'EmiSwap',
    symbol: 'ESW',
  },
  {
    id: 11155,
    name: 'AST.finance',
    symbol: 'AST',
  },
  {
    id: 11156,
    name: 'dYdX',
    symbol: 'DYDX',
  },
  {
    id: 11158,
    name: 'SubGame',
    symbol: 'SGB',
  },
  {
    id: 11159,
    name: 'Tianyu Finance',
    symbol: 'TYC',
  },
  {
    id: 11160,
    name: 'BOY X HIGHSPEED',
    symbol: 'BXH',
  },
  {
    id: 11162,
    name: 'MicroSHIBA',
    symbol: 'MICROSHIB',
  },
  {
    id: 11163,
    name: 'YSL',
    symbol: 'YSL',
  },
  {
    id: 11164,
    name: 'Vabble',
    symbol: 'VAB',
  },
  {
    id: 11165,
    name: 'Orca',
    symbol: 'ORCA',
  },
  {
    id: 11167,
    name: 'HODL 2.0',
    symbol: 'HODL',
  },
  {
    id: 11168,
    name: 'Vent Finance',
    symbol: 'VENT',
  },
  {
    id: 11169,
    name: 'DogemonGo',
    symbol: 'DOGO',
  },
  {
    id: 11171,
    name: 'Mango Markets',
    symbol: 'MNGO',
  },
  {
    id: 11172,
    name: 'CoPuppy',
    symbol: 'CP',
  },
  {
    id: 11175,
    name: 'SafeVault',
    symbol: 'VAULT',
  },
  {
    id: 11178,
    name: 'Wrapped LUNA Token',
    symbol: 'WLUNA',
  },
  {
    id: 11181,
    name: 'Saber',
    symbol: 'SBR',
  },
  {
    id: 11182,
    name: 'Toy Doge Coin',
    symbol: 'TOYDOGE',
  },
  {
    id: 11183,
    name: 'BABY DOGE BILLIONAIRE',
    symbol: 'BABYDB',
  },
  {
    id: 11184,
    name: 'Baby Poocoin',
    symbol: 'BABYPOO',
  },
  {
    id: 11185,
    name: 'TABANK',
    symbol: 'TAB',
  },
  {
    id: 11186,
    name: 'Vention',
    symbol: 'VENTION',
  },
  {
    id: 11187,
    name: 'ViceToken',
    symbol: 'VICEX',
  },
  {
    id: 11188,
    name: 'Dopex',
    symbol: 'DPX',
  },
  {
    id: 11189,
    name: 'Vaulty',
    symbol: 'VLTY',
  },
  {
    id: 11190,
    name: 'KittyCake',
    symbol: 'KCAKE',
  },
  {
    id: 11191,
    name: 'Lydia Finance',
    symbol: 'LYD',
  },
  {
    id: 11193,
    name: 'Bright Union',
    symbol: 'BRIGHT',
  },
  {
    id: 11194,
    name: 'Wallet Swap',
    symbol: 'WSWAP',
  },
  {
    id: 11197,
    name: 'Sukhavati Network',
    symbol: 'SKT',
  },
  {
    id: 11201,
    name: 'Alpha Kombat',
    symbol: 'ALKOM',
  },
  {
    id: 11202,
    name: 'Tokemak',
    symbol: 'TOKE',
  },
  {
    id: 11205,
    name: 'TrusterCoin',
    symbol: 'TSC',
  },
  {
    id: 11206,
    name: 'Bloktopia',
    symbol: 'BLOK',
  },
  {
    id: 11207,
    name: 'Bitcoin Asia',
    symbol: 'BTCA',
  },
  {
    id: 11208,
    name: 'SumSwap',
    symbol: 'SUM',
  },
  {
    id: 11209,
    name: 'TRAVA.FINANCE',
    symbol: 'TRAVA',
  },
  {
    id: 11210,
    name: 'Ethereum Eagle',
    symbol: 'EGL',
  },
  {
    id: 11211,
    name: 'DNAxCAT Token',
    symbol: 'DXCT',
  },
  {
    id: 11212,
    name: 'Star Atlas',
    symbol: 'ATLAS',
  },
  {
    id: 11213,
    name: 'Star Atlas DAO',
    symbol: 'POLIS',
  },
  {
    id: 11214,
    name: 'Carbon Coin',
    symbol: 'CBC',
  },
  {
    id: 11216,
    name: 'Boost Coin',
    symbol: 'BOOST',
  },
  {
    id: 11218,
    name: 'BoringDAO',
    symbol: 'BORING',
  },
  {
    id: 11219,
    name: 'Baby Doug',
    symbol: 'BABYDOUG',
  },
  {
    id: 11220,
    name: 'Port Finance',
    symbol: 'PORT',
  },
  {
    id: 11221,
    name: 'BitDAO',
    symbol: 'BIT',
  },
  {
    id: 11222,
    name: 'Wrapped NCG (Nine Chronicles Gold)',
    symbol: 'WNCG',
  },
  {
    id: 11223,
    name: 'MetaMUI',
    symbol: 'MMUI',
  },
  {
    id: 11224,
    name: 'MoonBear.finance',
    symbol: 'MBF',
  },
  {
    id: 11225,
    name: '$LONDON',
    symbol: 'LONDON',
  },
  {
    id: 11227,
    name: 'PolkaMonster',
    symbol: 'PKMON',
  },
  {
    id: 11229,
    name: 'Puppies Network',
    symbol: 'PPN',
  },
  {
    id: 11230,
    name: 'Sakura',
    symbol: 'SKU',
  },
  {
    id: 11232,
    name: 'Highstreet',
    symbol: 'HIGH',
  },
  {
    id: 11233,
    name: 'Monsoon Finance',
    symbol: 'MCASH',
  },
  {
    id: 11234,
    name: 'Position Exchange',
    symbol: 'POSI',
  },
  {
    id: 11235,
    name: 'BUMooN',
    symbol: 'BUMN',
  },
  {
    id: 11239,
    name: 'RedShiba',
    symbol: 'REDSHIBA',
  },
  {
    id: 11240,
    name: 'hi Dollar',
    symbol: 'HI',
  },
  {
    id: 11242,
    name: 'Moonpot',
    symbol: 'POTS',
  },
  {
    id: 11243,
    name: 'Nano Dogecoin',
    symbol: 'INDC',
  },
  {
    id: 11245,
    name: 'Landshare',
    symbol: 'LAND',
  },
  {
    id: 11246,
    name: 'Rhinos Finance',
    symbol: 'RHO',
  },
  {
    id: 11247,
    name: 'Kephi Gallery',
    symbol: 'KPHI',
  },
  {
    id: 11250,
    name: 'VIRVIA ONLINE SHOPPING',
    symbol: 'VDV',
  },
  {
    id: 11251,
    name: 'Dexlab',
    symbol: 'DXL',
  },
  {
    id: 11253,
    name: 'Doont Buy',
    symbol: 'DBUY',
  },
  {
    id: 11254,
    name: 'Minifootball',
    symbol: 'MINIFOOTBALL',
  },
  {
    id: 11255,
    name: 'Orica',
    symbol: 'ORI',
  },
  {
    id: 11260,
    name: 'Staked ICX',
    symbol: 'sICX',
  },
  {
    id: 11261,
    name: 'Balanced Dollars',
    symbol: 'bnUSD',
  },
  {
    id: 11262,
    name: 'Balance Tokens',
    symbol: 'BALN',
  },
  {
    id: 11263,
    name: 'Binapet',
    symbol: 'BPET',
  },
  {
    id: 11265,
    name: 'NFTBlackMarket',
    symbol: 'NBM',
  },
  {
    id: 11267,
    name: 'Altrucoin',
    symbol: 'ALTRUCOIN',
  },
  {
    id: 11268,
    name: 'Multigame',
    symbol: 'MULTI',
  },
  {
    id: 11270,
    name: 'kCoin',
    symbol: 'kCoin',
  },
  {
    id: 11271,
    name: 'DogeCola',
    symbol: 'DOGECOLA',
  },
  {
    id: 11272,
    name: 'Wrapped Arweave',
    symbol: 'WAR',
  },
  {
    id: 11273,
    name: 'Polylauncher',
    symbol: 'ANGEL',
  },
  {
    id: 11275,
    name: 'BinStarter',
    symbol: 'BSR',
  },
  {
    id: 11276,
    name: 'The Grand Banks',
    symbol: 'GRAND',
  },
  {
    id: 11277,
    name: 'MaidCoin',
    symbol: '$MAID',
  },
  {
    id: 11278,
    name: 'Project TXA',
    symbol: 'TXA',
  },
  {
    id: 11279,
    name: 'Block Ape Scissors',
    symbol: 'BAS',
  },
  {
    id: 11281,
    name: 'KCC MemePad',
    symbol: 'KCCM',
  },
  {
    id: 11283,
    name: 'Ryoshis Vision',
    symbol: 'RYOSHI',
  },
  {
    id: 11285,
    name: 'MuskSwap',
    symbol: 'MUSK',
  },
  {
    id: 11287,
    name: 'HoneyFarm Finance',
    symbol: 'HONEY',
  },
  {
    id: 11288,
    name: 'Madagascar',
    symbol: '$TIME',
  },
  {
    id: 11289,
    name: 'Spell Token',
    symbol: 'SPELL',
  },
  {
    id: 11290,
    name: 'StarTerra',
    symbol: 'STT',
  },
  {
    id: 11291,
    name: 'Kryptomon',
    symbol: 'KMON',
  },
  {
    id: 11292,
    name: 'Unreal Finance',
    symbol: 'UGT',
  },
  {
    id: 11293,
    name: 'Avaware',
    symbol: 'AVE',
  },
  {
    id: 11294,
    name: 'SuperRare',
    symbol: 'RARE',
  },
  {
    id: 11297,
    name: 'Solanax',
    symbol: 'SOLD',
  },
  {
    id: 11298,
    name: 'CrossSwap',
    symbol: 'CSWAP',
  },
  {
    id: 11299,
    name: 'POTENT',
    symbol: 'PTT',
  },
  {
    id: 11300,
    name: 'Baby Saitama Inu',
    symbol: 'BABYSAITAMA',
  },
  {
    id: 11301,
    name: 'YEL.Finance',
    symbol: 'YEL',
  },
  {
    id: 11303,
    name: 'pSwampy',
    symbol: 'PSWAMP',
  },
  {
    id: 11305,
    name: 'SafuYield Protocol',
    symbol: 'SAFUYIELD',
  },
  {
    id: 11307,
    name: 'Beta Finance',
    symbol: 'BETA',
  },
  {
    id: 11308,
    name: 'Fenerbahçe Token',
    symbol: 'FB',
  },
  {
    id: 11311,
    name: 'Intersola',
    symbol: 'ISOLA',
  },
  {
    id: 11312,
    name: 'Transparent Token',
    symbol: 'TRANSPARENT',
  },
  {
    id: 11313,
    name: 'Beast Token',
    symbol: 'BEAST',
  },
  {
    id: 11314,
    name: 'CardWallet',
    symbol: 'CW',
  },
  {
    id: 11316,
    name: 'AfterBack',
    symbol: 'AFTRBCK',
  },
  {
    id: 11317,
    name: 'Relay Token',
    symbol: 'RELAY',
  },
  {
    id: 11318,
    name: 'Goldex Token',
    symbol: 'GLDX',
  },
  {
    id: 11319,
    name: 'Sherpa',
    symbol: 'SHERPA',
  },
  {
    id: 11321,
    name: 'YDragon',
    symbol: 'YDR',
  },
  {
    id: 11322,
    name: 'Mobius Finance',
    symbol: 'MOT',
  },
  {
    id: 11323,
    name: 'Crypto Carbon Energy',
    symbol: 'CYCE',
  },
  {
    id: 11324,
    name: 'Forest Knight',
    symbol: 'KNIGHT',
  },
  {
    id: 11326,
    name: 'SoccerHub',
    symbol: 'SCH',
  },
  {
    id: 11327,
    name: 'Sphynx Network',
    symbol: 'SPH',
  },
  {
    id: 11329,
    name: 'KamPay',
    symbol: 'KAMPAY',
  },
  {
    id: 11330,
    name: 'VIMworld',
    symbol: 'VEED',
  },
  {
    id: 11331,
    name: 'Eloin',
    symbol: 'ELOIN',
  },
  {
    id: 11332,
    name: 'Storage Area Network Anywhere',
    symbol: 'SANA',
  },
  {
    id: 11333,
    name: 'BankEth',
    symbol: 'BANKETH',
  },
  {
    id: 11334,
    name: 'YSL.IO',
    symbol: 'SYSL',
  },
  {
    id: 11336,
    name: 'Nobility',
    symbol: 'NBL',
  },
  {
    id: 11337,
    name: 'OS',
    symbol: 'OS',
  },
  {
    id: 11338,
    name: 'Block Commerce Protocol',
    symbol: 'BCP',
  },
  {
    id: 11340,
    name: 'Immutable',
    symbol: 'DARA',
  },
  {
    id: 11341,
    name: 'delta.theta',
    symbol: 'DLTA',
  },
  {
    id: 11344,
    name: 'Mate',
    symbol: 'MATE',
  },
  {
    id: 11345,
    name: 'Civilization',
    symbol: 'CIV',
  },
  {
    id: 11346,
    name: 'Radio Caca',
    symbol: 'RACA',
  },
  {
    id: 11347,
    name: 'Nuketoken',
    symbol: 'NUKE',
  },
  {
    id: 11348,
    name: 'Identity',
    symbol: 'IDTT',
  },
  {
    id: 11349,
    name: 'ADAPad',
    symbol: 'ADAPAD',
  },
  {
    id: 11350,
    name: 'NFTLaunch',
    symbol: 'NFTL',
  },
  {
    id: 11352,
    name: 'Moonie NFT',
    symbol: 'MNY',
  },
  {
    id: 11353,
    name: 'PEACOCKCOIN (ERC)',
    symbol: 'PEKC',
  },
  {
    id: 11354,
    name: 'WagyuSwap',
    symbol: 'WAG',
  },
  {
    id: 11355,
    name: 'Bzzone',
    symbol: 'BZZONE',
  },
  {
    id: 11356,
    name: 'Hashmasks',
    symbol: 'MASK20',
  },
  {
    id: 11357,
    name: 'Art Blocks Curated Full Set',
    symbol: 'ABC123',
  },
  {
    id: 11358,
    name: 'NiftyNFT',
    symbol: 'NIFTY',
  },
  {
    id: 11359,
    name: 'Dragon Slayer',
    symbol: 'DRS',
  },
  {
    id: 11360,
    name: 'AlinX',
    symbol: 'ALIX',
  },
  {
    id: 11361,
    name: 'SandMan',
    symbol: 'SANDMAN',
  },
  {
    id: 11362,
    name: 'PolkaParty',
    symbol: 'POLP',
  },
  {
    id: 11363,
    name: 'GrimToken',
    symbol: 'GRIM',
  },
  {
    id: 11364,
    name: 'RoboDoge Coin',
    symbol: 'ROBODOGE',
  },
  {
    id: 11365,
    name: 'CardSwap',
    symbol: 'CSWAP',
  },
  {
    id: 11366,
    name: 'Paribus',
    symbol: 'PBX',
  },
  {
    id: 11367,
    name: 'Aurory',
    symbol: 'AURY',
  },
  {
    id: 11368,
    name: 'Feisty Doge NFT',
    symbol: 'NFD',
  },
  {
    id: 11370,
    name: 'Duel Network',
    symbol: 'DUEL',
  },
  {
    id: 11371,
    name: 'RoboFi',
    symbol: 'VICS',
  },
  {
    id: 11373,
    name: 'Metaverse Miner',
    symbol: 'META',
  },
  {
    id: 11374,
    name: 'Mines of Dalarnia',
    symbol: 'DAR',
  },
  {
    id: 11375,
    name: 'Kokoswap',
    symbol: 'KOKO',
  },
  {
    id: 11377,
    name: '1Doge',
    symbol: '1DOGE',
  },
  {
    id: 11379,
    name: 'BIGFOOT',
    symbol: 'FOOT',
  },
  {
    id: 11380,
    name: 'Dogecoin 2.0',
    symbol: 'DOGE2',
  },
  {
    id: 11382,
    name: 'My Pet Social',
    symbol: 'MPS',
  },
  {
    id: 11383,
    name: 'Buni Universal Reward',
    symbol: 'BUR',
  },
  {
    id: 11384,
    name: 'SoMee.Social',
    symbol: 'SOMEE',
  },
  {
    id: 11385,
    name: 'NFTPad',
    symbol: 'NFTPAD',
  },
  {
    id: 11387,
    name: 'CropperFinance',
    symbol: 'CRP',
  },
  {
    id: 11390,
    name: 'Hibiki Finance',
    symbol: 'HIBIKI',
  },
  {
    id: 11391,
    name: 'Stable 1inch',
    symbol: 'ONE1INCH',
  },
  {
    id: 11392,
    name: 'Moon Rabbit',
    symbol: 'AAA',
  },
  {
    id: 11393,
    name: 'Yucreat',
    symbol: 'YUCT',
  },
  {
    id: 11394,
    name: 'Green Climate World',
    symbol: 'WGC',
  },
  {
    id: 11395,
    name: 'BOHR',
    symbol: 'BR',
  },
  {
    id: 11396,
    name: 'JOE',
    symbol: 'JOE',
  },
  {
    id: 11397,
    name: 'Kaiken Shiba',
    symbol: 'KSHIB',
  },
  {
    id: 11398,
    name: 'HoneyFarm',
    symbol: 'BEAR',
  },
  {
    id: 11403,
    name: 'Flourish Coin',
    symbol: 'FLRS',
  },
  {
    id: 11404,
    name: "People's Punk",
    symbol: 'DDDD',
  },
  {
    id: 11405,
    name: 'Bored Museum',
    symbol: 'BORED',
  },
  {
    id: 11408,
    name: 'Big Digital Shares',
    symbol: 'BDS',
  },
  {
    id: 11409,
    name: 'Tarot',
    symbol: 'TAROT',
  },
  {
    id: 11410,
    name: 'Pinkslip Finance',
    symbol: 'PSLIP',
  },
  {
    id: 11412,
    name: 'Binemon',
    symbol: 'BIN',
  },
  {
    id: 11413,
    name: 'Ceres',
    symbol: 'CERES',
  },
  {
    id: 11414,
    name: 'Qubit',
    symbol: 'QBT',
  },
  {
    id: 11415,
    name: 'Yield Yak',
    symbol: 'YAK',
  },
  {
    id: 11416,
    name: 'TKBToken',
    symbol: 'TKB',
  },
  {
    id: 11417,
    name: 'Gaj Finance',
    symbol: 'GAJ',
  },
  {
    id: 11418,
    name: 'Kanaloa Network',
    symbol: 'KANA',
  },
  {
    id: 11419,
    name: 'Toncoin',
    symbol: 'TONCOIN',
  },
  {
    id: 11420,
    name: 'Tune.FM',
    symbol: 'JAM',
  },
  {
    id: 11421,
    name: 'Marnotaur',
    symbol: 'TAUR',
  },
  {
    id: 11422,
    name: 'Wanaka Farm',
    symbol: 'WANA',
  },
  {
    id: 11423,
    name: 'vEmpire DDAO',
    symbol: 'VEMP',
  },
  {
    id: 11424,
    name: 'Lendefi',
    symbol: 'LDFI',
  },
  {
    id: 11425,
    name: 'Non-Fungible TOKE',
    symbol: 'TOKE',
  },
  {
    id: 11426,
    name: "Don't KYC",
    symbol: 'DKYC',
  },
  {
    id: 11427,
    name: 'Coinary Token',
    symbol: 'CYT',
  },
  {
    id: 11429,
    name: 'Tundra Token',
    symbol: 'TUNDRA',
  },
  {
    id: 11431,
    name: 'Minimals',
    symbol: 'MMS',
  },
  {
    id: 11432,
    name: 'Wanderlust',
    symbol: 'WANDER',
  },
  {
    id: 11433,
    name: 'Ape Fun Token',
    symbol: 'AFT',
  },
  {
    id: 11437,
    name: 'DEEPSPACE',
    symbol: 'DPS',
  },
  {
    id: 11446,
    name: 'S.C. Corinthians Fan Token',
    symbol: 'SCCP',
  },
  {
    id: 11448,
    name: 'The HUSL',
    symbol: 'HUSL',
  },
  {
    id: 11449,
    name: 'DogeWarrior',
    symbol: 'DWR',
  },
  {
    id: 11450,
    name: 'Skyrim Finance',
    symbol: 'SKYRIM',
  },
  {
    id: 11451,
    name: 'Shiden Network',
    symbol: 'SDN',
  },
  {
    id: 11452,
    name: 'FNDZ',
    symbol: 'FNDZ',
  },
  {
    id: 11453,
    name: 'NFT Tech',
    symbol: 'NFTT',
  },
  {
    id: 11454,
    name: 'Glimpse',
    symbol: 'GLMS',
  },
  {
    id: 11455,
    name: 'Polinate',
    symbol: 'POLI',
  },
  {
    id: 11456,
    name: 'SnowCrash Token',
    symbol: 'NORA',
  },
  {
    id: 11457,
    name: 'PARTY',
    symbol: 'PARTY',
  },
  {
    id: 11458,
    name: 'EVRYNET',
    symbol: 'EVRY',
  },
  {
    id: 11459,
    name: 'My DeFi Legends',
    symbol: 'DLEGENDS',
  },
  {
    id: 11460,
    name: 'Spectrum Token',
    symbol: 'SPEC',
  },
  {
    id: 11461,
    name: 'MARINADE STAKED SOL',
    symbol: 'MSOL',
  },
  {
    id: 11462,
    name: 'Fabric',
    symbol: 'FAB',
  },
  {
    id: 11463,
    name: 'Husky Avax',
    symbol: 'HUSKY',
  },
  {
    id: 11464,
    name: 'ApeXit Finance',
    symbol: 'APEX',
  },
  {
    id: 11465,
    name: 'CATO',
    symbol: 'CATO',
  },
  {
    id: 11466,
    name: 'PUNK Floor',
    symbol: 'FLOOR',
  },
  {
    id: 11467,
    name: 'Oxbull Solana',
    symbol: 'OXS',
  },
  {
    id: 11468,
    name: 'Future',
    symbol: 'FTR',
  },
  {
    id: 11469,
    name: 'Solpad Finance',
    symbol: 'SOLPAD',
  },
  {
    id: 11470,
    name: 'Boring Protocol',
    symbol: 'BOP',
  },
  {
    id: 11471,
    name: 'SolanaSail Governance Token',
    symbol: 'GSAIL',
  },
  {
    id: 11473,
    name: 'Yaki Gold',
    symbol: 'YAG',
  },
  {
    id: 11474,
    name: 'DeHero',
    symbol: 'HEROES',
  },
  {
    id: 11477,
    name: 'Drakeball Super',
    symbol: 'DBS',
  },
  {
    id: 11480,
    name: 'LaunchZone',
    symbol: 'LZ',
  },
  {
    id: 11486,
    name: 'WifeDoge',
    symbol: 'WIFEDOGE',
  },
  {
    id: 11489,
    name: 'GameNFT',
    symbol: 'GNFT',
  },
  {
    id: 11491,
    name: 'MaticLaunch',
    symbol: 'MTCL',
  },
  {
    id: 11492,
    name: 'TCGCoin 2.0',
    symbol: 'TCG2',
  },
  {
    id: 11493,
    name: 'MiniUSDC',
    symbol: 'MINIUSDC',
  },
  {
    id: 11495,
    name: 'Tomb',
    symbol: 'TOMB',
  },
  {
    id: 11496,
    name: 'Global Coin Research',
    symbol: 'GCR',
  },
  {
    id: 11497,
    name: 'Scream',
    symbol: 'SCREAM',
  },
  {
    id: 11498,
    name: 'Chainbing',
    symbol: 'CBG',
  },
  {
    id: 11499,
    name: 'AMATERAS',
    symbol: 'AMT',
  },
  {
    id: 11500,
    name: 'Biconomy Exchange Token (BIT)',
    symbol: 'BIT',
  },
  {
    id: 11502,
    name: 'CryptoCars',
    symbol: 'CCAR',
  },
  {
    id: 11503,
    name: 'Manga Token',
    symbol: '$MANGA',
  },
  {
    id: 11505,
    name: 'Pet Games',
    symbol: 'PETG',
  },
  {
    id: 11506,
    name: 'Wrapped FCT',
    symbol: 'WFCT',
  },
  {
    id: 11507,
    name: 'Stable UNI',
    symbol: 'ONEUNI',
  },
  {
    id: 11508,
    name: 'DyzToken',
    symbol: 'DYZ',
  },
  {
    id: 11509,
    name: 'DeepSpace Token',
    symbol: 'DXO',
  },
  {
    id: 11511,
    name: 'Honey Defi',
    symbol: 'HONEY',
  },
  {
    id: 11512,
    name: 'Kalao',
    symbol: 'KLO',
  },
  {
    id: 11516,
    name: 'Ekta',
    symbol: 'EKTA',
  },
  {
    id: 11517,
    name: 'REWARD HUNTERS TOKEN',
    symbol: 'RHT',
  },
  {
    id: 11519,
    name: 'DefPace',
    symbol: 'DPACE',
  },
  {
    id: 11520,
    name: 'Kaiken Inu',
    symbol: 'KAIECO',
  },
  {
    id: 11521,
    name: 'Rhythm',
    symbol: 'RHYTHM',
  },
  {
    id: 11522,
    name: 'Jenny Metaverse DAO Token',
    symbol: 'UJENNY',
  },
  {
    id: 11523,
    name: 'Starmon Metaverse',
    symbol: 'SMON',
  },
  {
    id: 11525,
    name: 'Entropyfi',
    symbol: 'ERP',
  },
  {
    id: 11528,
    name: 'Valencia CF Fan Token',
    symbol: 'VCF',
  },
  {
    id: 11532,
    name: 'Arsenal Fan Token',
    symbol: 'AFC',
  },
  {
    id: 11533,
    name: 'UFC Fan Token',
    symbol: 'UFC',
  },
  {
    id: 11537,
    name: 'GridZone.io',
    symbol: 'ZONE',
  },
  {
    id: 11538,
    name: 'Wraith',
    symbol: 'WRAITH',
  },
  {
    id: 11539,
    name: 'Vendit',
    symbol: 'VNDT',
  },
  {
    id: 11540,
    name: 'Polar Sync',
    symbol: 'POLAR',
  },
  {
    id: 11541,
    name: 'Ariva',
    symbol: 'ARV',
  },
  {
    id: 11542,
    name: 'Silver Token',
    symbol: 'SILVER',
  },
  {
    id: 11543,
    name: 'Bakumatsu Swap Finance',
    symbol: 'RYMA',
  },
  {
    id: 11548,
    name: 'Omm Tokens',
    symbol: 'OMM',
  },
  {
    id: 11552,
    name: 'Talken',
    symbol: 'TALK',
  },
  {
    id: 11553,
    name: 'WEYU',
    symbol: 'WEYU',
  },
  {
    id: 11555,
    name: 'UnderMineGold',
    symbol: 'UMG',
  },
  {
    id: 11556,
    name: 'CryptoZoo  (new)',
    symbol: 'ZOO',
  },
  {
    id: 11557,
    name: 'The Doge NFT',
    symbol: 'DOG',
  },
  {
    id: 11558,
    name: 'Blocks Space',
    symbol: 'BLS',
  },
  {
    id: 11559,
    name: 'Wault USD',
    symbol: 'WUSD',
  },
  {
    id: 11560,
    name: 'DeHub',
    symbol: 'DEHUB',
  },
  {
    id: 11561,
    name: 'eGAME Initiative',
    symbol: 'EGI',
  },
  {
    id: 11562,
    name: 'Kava Swap',
    symbol: 'SWP',
  },
  {
    id: 11563,
    name: 'aiRight',
    symbol: 'AIRI',
  },
  {
    id: 11564,
    name: 'OFI.CASH',
    symbol: 'OFI',
  },
  {
    id: 11565,
    name: 'Famcentral',
    symbol: 'FAM',
  },
  {
    id: 11566,
    name: 'ASH',
    symbol: 'ASH',
  },
  {
    id: 11568,
    name: 'Adventure Gold',
    symbol: 'AGLD',
  },
  {
    id: 11569,
    name: 'Ovato',
    symbol: 'OVO',
  },
  {
    id: 11570,
    name: 'The Recharge',
    symbol: 'RCG',
  },
  {
    id: 11571,
    name: 'Unvest',
    symbol: 'UNV',
  },
  {
    id: 11572,
    name: 'Honey Token',
    symbol: 'SWEET',
  },
  {
    id: 11573,
    name: 'Pylon Eco Token',
    symbol: 'PETN',
  },
  {
    id: 11575,
    name: 'Mensa Protocol',
    symbol: 'MENSA',
  },
  {
    id: 11576,
    name: 'Genesis Pool',
    symbol: 'GPOOL',
  },
  {
    id: 11578,
    name: 'Cirus Foundation',
    symbol: 'CIRUS',
  },
  {
    id: 11579,
    name: 'Cryptomeda',
    symbol: 'TECH',
  },
  {
    id: 11580,
    name: 'PolyShield Finance',
    symbol: 'SHI3LD',
  },
  {
    id: 11581,
    name: 'Black Market Gaming',
    symbol: 'BMG',
  },
  {
    id: 11582,
    name: 'Lumi Credits',
    symbol: 'LUMI',
  },
  {
    id: 11583,
    name: 'Annex Finance',
    symbol: 'ANN',
  },
  {
    id: 11584,
    name: 'Braintrust',
    symbol: 'BTRST',
  },
  {
    id: 11585,
    name: 'Wonderland',
    symbol: 'TIME',
  },
  {
    id: 11586,
    name: 'Story',
    symbol: 'STORY',
  },
  {
    id: 11587,
    name: 'Bruce Non Fungible Token',
    symbol: 'BNFT',
  },
  {
    id: 11588,
    name: 'Crypto Raiders',
    symbol: 'AURUM',
  },
  {
    id: 11590,
    name: 'NearPad',
    symbol: 'PAD',
  },
  {
    id: 11591,
    name: 'Raid Token',
    symbol: 'RAID',
  },
  {
    id: 11592,
    name: 'FingerprintsDAO',
    symbol: 'PRINTS',
  },
  {
    id: 11593,
    name: 'CRYPTO PHOENIX',
    symbol: 'CPHX',
  },
  {
    id: 11596,
    name: 'SingularFarm',
    symbol: 'SING',
  },
  {
    id: 11597,
    name: 'Lillion',
    symbol: 'LIL',
  },
  {
    id: 11599,
    name: 'Alita Finance',
    symbol: 'ALI',
  },
  {
    id: 11600,
    name: 'SMD COIN',
    symbol: 'SMD',
  },
  {
    id: 11601,
    name: 'BurnDoge',
    symbol: 'BURNDOGE',
  },
  {
    id: 11603,
    name: 'MarketMove',
    symbol: 'MOVE',
  },
  {
    id: 11605,
    name: 'HeroFi',
    symbol: 'HEROEGG',
  },
  {
    id: 11606,
    name: 'VICEWRLD',
    symbol: 'VICE',
  },
  {
    id: 11607,
    name: 'Smart Wallet Token',
    symbol: 'SWT',
  },
  {
    id: 11610,
    name: 'BitcoMine Token',
    symbol: 'BME',
  },
  {
    id: 11612,
    name: 'Sunny Aggregator',
    symbol: 'SUNNY',
  },
  {
    id: 11613,
    name: 'SLINK LABS',
    symbol: 'SLAB',
  },
  {
    id: 11614,
    name: 'Theos',
    symbol: 'THEOS',
  },
  {
    id: 11615,
    name: 'SNAP!',
    symbol: 'SNAP',
  },
  {
    id: 11616,
    name: 'Score Token',
    symbol: 'SCO',
  },
  {
    id: 11617,
    name: 'WIVA',
    symbol: 'WIVA',
  },
  {
    id: 11618,
    name: 'New Chance',
    symbol: 'NCE',
  },
  {
    id: 11619,
    name: 'Deswap',
    symbol: 'DAW',
  },
  {
    id: 11620,
    name: 'IX Swap',
    symbol: 'IXS',
  },
  {
    id: 11621,
    name: 'Punk Vault (NFTX)',
    symbol: 'PUNK',
  },
  {
    id: 11622,
    name: 'GLYPH Vault (NFTX)',
    symbol: 'GLYPH',
  },
  {
    id: 11623,
    name: 'Based Gold',
    symbol: 'BGLD',
  },
  {
    id: 11625,
    name: 'CityStates: Medieval',
    symbol: 'CSM',
  },
  {
    id: 11626,
    name: 'Hermes Defi',
    symbol: 'IRIS',
  },
  {
    id: 11628,
    name: 'Rezerve',
    symbol: 'RZRV',
  },
  {
    id: 11631,
    name: 'DEFFECT',
    symbol: 'DEF',
  },
  {
    id: 11632,
    name: 'BAE',
    symbol: 'BAE',
  },
  {
    id: 11633,
    name: 'XRoad Initiative',
    symbol: 'XRI',
  },
  {
    id: 11634,
    name: 'Rewards Bunny',
    symbol: 'RBUNNY',
  },
  {
    id: 11635,
    name: 'Able Finance',
    symbol: 'ABLE',
  },
  {
    id: 11639,
    name: 'Clientelecoin',
    symbol: 'CLT',
  },
  {
    id: 11641,
    name: 'KONG Land',
    symbol: '$CITIZEN',
  },
  {
    id: 11642,
    name: 'Safe Shield',
    symbol: 'SFSHLD',
  },
  {
    id: 11643,
    name: 'EcoFi',
    symbol: 'ECO',
  },
  {
    id: 11646,
    name: 'Regen Network',
    symbol: 'REGEN',
  },
  {
    id: 11647,
    name: 'ShibaRocket',
    symbol: 'SHIBAROCKET',
  },
  {
    id: 11652,
    name: 'iTrust.Finance',
    symbol: 'ITG',
  },
  {
    id: 11653,
    name: 'Bond Appetite USD',
    symbol: 'USDAP',
  },
  {
    id: 11654,
    name: 'VelasPad',
    symbol: 'VLXPAD',
  },
  {
    id: 11655,
    name: 'Storm Token',
    symbol: 'STORM',
  },
  {
    id: 11660,
    name: 'MCFinance',
    symbol: 'MCF',
  },
  {
    id: 11661,
    name: 'Dexit Finance',
    symbol: 'DXT',
  },
  {
    id: 11663,
    name: 'Elemon',
    symbol: 'ELMON',
  },
  {
    id: 11664,
    name: 'YAY Games',
    symbol: 'YAY',
  },
  {
    id: 11665,
    name: 'Baitcoin',
    symbol: 'BAIT',
  },
  {
    id: 11666,
    name: 'Bobo Cash',
    symbol: 'BOBO',
  },
  {
    id: 11668,
    name: 'Zcon Protocol',
    symbol: 'ZCON',
  },
  {
    id: 11669,
    name: 'Footie Plus',
    symbol: 'FOOTIE',
  },
  {
    id: 11670,
    name: 'DeFi Warrior (FIWA)',
    symbol: 'FIWA',
  },
  {
    id: 11672,
    name: 'Pocoland',
    symbol: 'POCO',
  },
  {
    id: 11675,
    name: 'Dope Wars Paper',
    symbol: 'PAPER',
  },
  {
    id: 11676,
    name: 'Varen',
    symbol: 'VRN',
  },
  {
    id: 11677,
    name: 'Phoenixchain',
    symbol: 'PCN',
  },
  {
    id: 11678,
    name: 'Lumenswap',
    symbol: 'LSP',
  },
  {
    id: 11679,
    name: 'InfinityCake',
    symbol: 'INCAKE',
  },
  {
    id: 11680,
    name: 'Zabu Finance',
    symbol: 'ZABU',
  },
  {
    id: 11682,
    name: 'DeathRoad',
    symbol: 'DRACE',
  },
  {
    id: 11684,
    name: 'Totem Finance',
    symbol: 'TOTEM',
  },
  {
    id: 11685,
    name: 'BetU',
    symbol: 'BETU',
  },
  {
    id: 11688,
    name: 'HoneyMoon Finance',
    symbol: 'MOON',
  },
  {
    id: 11689,
    name: 'SheBollETH Commerce',
    symbol: 'SBECOM',
  },
  {
    id: 11690,
    name: 'Magic beasties',
    symbol: 'BSTS',
  },
  {
    id: 11692,
    name: 'Syfin',
    symbol: 'SYF',
  },
  {
    id: 11693,
    name: 'Quantum Assets',
    symbol: 'QA',
  },
  {
    id: 11694,
    name: 'Intelligent Mining',
    symbol: 'IM',
  },
  {
    id: 11695,
    name: 'ChronoBase',
    symbol: 'TIK',
  },
  {
    id: 11696,
    name: 'Wrapped One',
    symbol: 'WONE',
  },
  {
    id: 11697,
    name: 'Phantom Protocol',
    symbol: 'PHM',
  },
  {
    id: 11698,
    name: 'Club Donkey',
    symbol: 'CDONK',
  },
  {
    id: 11699,
    name: 'Golden Roots',
    symbol: 'GDR',
  },
  {
    id: 11700,
    name: 'Life Crypto',
    symbol: 'LIFE',
  },
  {
    id: 11701,
    name: 'Copycat Finance',
    symbol: 'COPYCAT',
  },
  {
    id: 11702,
    name: 'Sentiment Token',
    symbol: 'SENT',
  },
  {
    id: 11705,
    name: 'Overlord',
    symbol: 'LORD',
  },
  {
    id: 11706,
    name: 'Acet',
    symbol: 'ACT',
  },
  {
    id: 11707,
    name: 'Sona Network',
    symbol: 'SONA',
  },
  {
    id: 11708,
    name: 'Antex',
    symbol: 'ANTEX',
  },
  {
    id: 11713,
    name: 'Shambala',
    symbol: 'BALA',
  },
  {
    id: 11714,
    name: 'Brazil National Fan Token',
    symbol: 'BFT',
  },
  {
    id: 11715,
    name: 'Snook',
    symbol: 'SNK',
  },
  {
    id: 11716,
    name: 'WhaleStreet $hrimp Token',
    symbol: '$HRIMP',
  },
  {
    id: 11717,
    name: 'Mu Continent',
    symbol: 'MU',
  },
  {
    id: 11721,
    name: 'Zasset zUSD',
    symbol: 'ZUSD',
  },
  {
    id: 11724,
    name: 'The Red Order',
    symbol: 'ORDR',
  },
  {
    id: 11726,
    name: 'SideShift Token',
    symbol: 'XAI',
  },
  {
    id: 11727,
    name: 'Phoenix Token',
    symbol: 'PHX',
  },
  {
    id: 11728,
    name: 'Attrace',
    symbol: 'ATTR',
  },
  {
    id: 11732,
    name: 'MemeKiller',
    symbol: 'KILL',
  },
  {
    id: 11734,
    name: 'Ledgity',
    symbol: 'LTY',
  },
  {
    id: 11736,
    name: 'CryptoMines',
    symbol: 'ETERNAL',
  },
  {
    id: 11738,
    name: 'Adora Token',
    symbol: 'ARA',
  },
  {
    id: 11739,
    name: 'Blox Token',
    symbol: 'BLOX',
  },
  {
    id: 11740,
    name: 'DeFIL',
    symbol: 'DFL',
  },
  {
    id: 11741,
    name: 'Simba Empire',
    symbol: 'SIM',
  },
  {
    id: 11742,
    name: 'PolyQuity',
    symbol: 'PYQ',
  },
  {
    id: 11743,
    name: 'Hesh.Fi',
    symbol: 'HESH',
  },
  {
    id: 11744,
    name: 'IVOGEL',
    symbol: 'IVG',
  },
  {
    id: 11746,
    name: 'Megatech',
    symbol: 'MGT',
  },
  {
    id: 11747,
    name: 'Kranz Token',
    symbol: 'KRZ',
  },
  {
    id: 11748,
    name: 'tEXO',
    symbol: 'TEXO',
  },
  {
    id: 11750,
    name: 'Buying.com',
    symbol: 'BUY',
  },
  {
    id: 11751,
    name: 'StaySAFU',
    symbol: 'SAFU',
  },
  {
    id: 11752,
    name: 'XP NETWORK',
    symbol: 'XPNET',
  },
  {
    id: 11753,
    name: 'Cycle Finance',
    symbol: 'CYCLE',
  },
  {
    id: 11757,
    name: 'Pearl',
    symbol: 'PEARL',
  },
  {
    id: 11759,
    name: 'IFOSwap Token',
    symbol: 'H2O',
  },
  {
    id: 11762,
    name: 'E-leven',
    symbol: 'ELV',
  },
  {
    id: 11763,
    name: 'The Luxury',
    symbol: 'TLX',
  },
  {
    id: 11764,
    name: 'BabyBoo',
    symbol: 'BABYBOO',
  },
  {
    id: 11765,
    name: 'BigShortBets',
    symbol: 'BIGSB',
  },
  {
    id: 11766,
    name: 'ZeroHybrid Network',
    symbol: 'ZHT',
  },
  {
    id: 11770,
    name: 'EverETH',
    symbol: 'EVERETH',
  },
  {
    id: 11772,
    name: 'DeMon Token',
    symbol: 'DMZ',
  },
  {
    id: 11774,
    name: 'Steak Token',
    symbol: 'STEAK',
  },
  {
    id: 11775,
    name: 'Hoopoe',
    symbol: 'HOOP',
  },
  {
    id: 11777,
    name: 'Block Monsters',
    symbol: 'MNSTRS',
  },
  {
    id: 11779,
    name: 'Dreams Quest',
    symbol: 'DREAMS',
  },
  {
    id: 11780,
    name: 'MaskDoge',
    symbol: 'MASKDOGE',
  },
  {
    id: 11781,
    name: 'Pacific DeFi',
    symbol: 'PACIFIC',
  },
  {
    id: 11783,
    name: 'GameFi',
    symbol: 'GAFI',
  },
  {
    id: 11784,
    name: 'Scientix',
    symbol: 'SCIX',
  },
  {
    id: 11785,
    name: 'AvaXlauncher',
    symbol: 'AVXL',
  },
  {
    id: 11786,
    name: 'DAO.vc',
    symbol: 'DAOVC',
  },
  {
    id: 11787,
    name: 'Fantom Doge',
    symbol: 'RIP',
  },
  {
    id: 11789,
    name: 'Ethereum Wrapped Filecoin',
    symbol: 'EFIL',
  },
  {
    id: 11790,
    name: 'Ape In',
    symbol: 'APEIN',
  },
  {
    id: 11792,
    name: 'TSA NFT',
    symbol: 'TSA',
  },
  {
    id: 11794,
    name: 'handleFOREX',
    symbol: 'FOREX',
  },
  {
    id: 11795,
    name: 'Twindex',
    symbol: 'TWX',
  },
  {
    id: 11796,
    name: 'Inter Milan Fan Token',
    symbol: 'INTER',
  },
  {
    id: 11797,
    name: 'Cricket Foundation',
    symbol: 'CRIC',
  },
  {
    id: 11800,
    name: 'Griffin Art',
    symbol: 'GART',
  },
  {
    id: 11801,
    name: 'Daily COP',
    symbol: 'DLYCOP',
  },
  {
    id: 11802,
    name: 'Project X',
    symbol: 'XIL',
  },
  {
    id: 11804,
    name: 'Crypto Gladiator Shards',
    symbol: 'CGS',
  },
  {
    id: 11805,
    name: 'Structure finance',
    symbol: 'STF',
  },
  {
    id: 11806,
    name: 'Eternal Oasis',
    symbol: 'ETOS',
  },
  {
    id: 11807,
    name: 'Kaiju Worlds',
    symbol: 'KAIJU',
  },
  {
    id: 11809,
    name: 'Ref Finance',
    symbol: 'REF',
  },
  {
    id: 11810,
    name: 'Pirate Coin Games',
    symbol: 'PirateCoin☠',
  },
  {
    id: 11811,
    name: 'PASV',
    symbol: 'PASV',
  },
  {
    id: 11812,
    name: 'The Rare Antiquities Token',
    symbol: 'RAT',
  },
  {
    id: 11813,
    name: 'Afreum',
    symbol: 'AFR',
  },
  {
    id: 11814,
    name: 'Potato',
    symbol: 'POTATO',
  },
  {
    id: 11818,
    name: 'Waggle Network',
    symbol: 'WAG',
  },
  {
    id: 11819,
    name: 'Royal Protocol',
    symbol: 'ROY',
  },
  {
    id: 11820,
    name: 'TORG',
    symbol: 'TORG',
  },
  {
    id: 11821,
    name: 'Swarm Markets',
    symbol: 'SMT',
  },
  {
    id: 11822,
    name: 'Good Bridging',
    symbol: 'GB',
  },
  {
    id: 11827,
    name: 'Infinity Token',
    symbol: 'IT',
  },
  {
    id: 11832,
    name: 'Corgiswap',
    symbol: 'CORIS',
  },
  {
    id: 11833,
    name: 'Gain Protocol',
    symbol: 'GAIN',
  },
  {
    id: 11834,
    name: 'Magic Power',
    symbol: 'MGP',
  },
  {
    id: 11835,
    name: 'Monsters Clan',
    symbol: 'MONS',
  },
  {
    id: 11836,
    name: 'Citadel.one',
    symbol: 'XCT',
  },
  {
    id: 11838,
    name: 'MilkshakeSwap',
    symbol: 'Milk',
  },
  {
    id: 11839,
    name: 'Ape-X',
    symbol: 'APE-X',
  },
  {
    id: 11842,
    name: 'PolkaFantasy',
    symbol: 'XP',
  },
  {
    id: 11844,
    name: 'Pinecone Finance',
    symbol: 'PCT',
  },
  {
    id: 11846,
    name: 'Dragon X',
    symbol: 'DAX',
  },
  {
    id: 11848,
    name: 'Strips Finance',
    symbol: 'STRP',
  },
  {
    id: 11849,
    name: 'MarX',
    symbol: 'MARX',
  },
  {
    id: 11851,
    name: 'Crosschain IOTX',
    symbol: 'CIOTX',
  },
  {
    id: 11854,
    name: 'ArbiNYAN',
    symbol: 'NYAN',
  },
  {
    id: 11855,
    name: 'Arbys Token',
    symbol: 'ARBYS',
  },
  {
    id: 11856,
    name: 'LUFFY',
    symbol: 'LUFFY',
  },
  {
    id: 11857,
    name: 'GMX',
    symbol: 'GMX',
  },
  {
    id: 11858,
    name: 'WAIV Care',
    symbol: 'WAIV',
  },
  {
    id: 11861,
    name: 'PlanetWatch',
    symbol: 'PLANETS',
  },
  {
    id: 11862,
    name: 'Arix',
    symbol: 'ARIX',
  },
  {
    id: 11864,
    name: 'Meme Lordz',
    symbol: '$LORDZ',
  },
  {
    id: 11865,
    name: 'Bone ShibaSwap',
    symbol: 'BONE',
  },
  {
    id: 11866,
    name: 'Moonbet',
    symbol: 'MBET',
  },
  {
    id: 11868,
    name: 'Ulti Arena',
    symbol: 'ULTI',
  },
  {
    id: 11869,
    name: 'Realm',
    symbol: 'REALM',
  },
  {
    id: 11871,
    name: 'GameZone',
    symbol: 'GZONE',
  },
  {
    id: 11872,
    name: 'Carbon Finance',
    symbol: 'CARBON',
  },
  {
    id: 11873,
    name: 'Arbucks',
    symbol: 'BUCK',
  },
  {
    id: 11874,
    name: 'Demeter',
    symbol: 'DMT',
  },
  {
    id: 11878,
    name: 'Arbidoge',
    symbol: 'ADOGE',
  },
  {
    id: 11879,
    name: 'Arctic Finance',
    symbol: 'AURORA',
  },
  {
    id: 11880,
    name: 'EpicHero 3D NFT',
    symbol: 'EPICHERO',
  },
  {
    id: 11882,
    name: 'Bitcashpay (new)',
    symbol: 'BCP',
  },
  {
    id: 11885,
    name: 'HurricaneSwap Token',
    symbol: 'HCT',
  },
  {
    id: 11886,
    name: 'Okex Fly',
    symbol: 'OKFLY',
  },
  {
    id: 11887,
    name: 'Mission Helios',
    symbol: 'HELIOS',
  },
  {
    id: 11888,
    name: 'Matrixswap',
    symbol: 'MATRIX',
  },
  {
    id: 11889,
    name: 'Solminter',
    symbol: 'SMRT',
  },
  {
    id: 11890,
    name: 'Chihuahuax',
    symbol: 'CHIHUA',
  },
  {
    id: 11893,
    name: 'Teddy Cash',
    symbol: 'TEDDY',
  },
  {
    id: 11894,
    name: 'Ecochaintoken',
    symbol: 'ECT',
  },
  {
    id: 11895,
    name: 'Fungie DAO',
    symbol: 'FNG',
  },
  {
    id: 11896,
    name: 'Morpheus Token',
    symbol: 'MORPH',
  },
  {
    id: 11897,
    name: 'Dreamr',
    symbol: 'DMR',
  },
  {
    id: 11898,
    name: 'Gods and Legends',
    symbol: 'GNLR',
  },
  {
    id: 11899,
    name: 'PlentyCoin',
    symbol: 'PLENTYCOIN',
  },
  {
    id: 11900,
    name: 'SaunaFinance Token',
    symbol: 'SAUNA',
  },
  {
    id: 11902,
    name: 'Polly DeFi nest',
    symbol: 'NDEFI',
  },
  {
    id: 11903,
    name: 'Sheesh',
    symbol: 'SHEESH',
  },
  {
    id: 11904,
    name: 'ANS Coin',
    symbol: 'ANS',
  },
  {
    id: 11905,
    name: 'PURR Vault (NFTX)',
    symbol: 'PURR',
  },
  {
    id: 11906,
    name: 'Avakus',
    symbol: 'AVAK',
  },
  {
    id: 11907,
    name: 'Fantom Oasis',
    symbol: 'FTMO',
  },
  {
    id: 11908,
    name: 'HiFi Gaming Society',
    symbol: 'HIFI',
  },
  {
    id: 11910,
    name: 'SokuSwap',
    symbol: 'SOKU',
  },
  {
    id: 11911,
    name: 'Larix',
    symbol: 'LARIX',
  },
  {
    id: 11912,
    name: 'Round Dollar',
    symbol: 'RD',
  },
  {
    id: 11913,
    name: 'AcknoLedger',
    symbol: 'ACK',
  },
  {
    id: 11914,
    name: 'Phat Doge Givings',
    symbol: 'GIVING',
  },
  {
    id: 11916,
    name: 'Minerva Wallet',
    symbol: 'MIVA',
  },
  {
    id: 11918,
    name: 'GIBX Swap',
    symbol: 'X',
  },
  {
    id: 11921,
    name: 'Nether NFT',
    symbol: 'NTR',
  },
  {
    id: 11922,
    name: 'KRYZA Network',
    symbol: 'KRN',
  },
  {
    id: 11923,
    name: 'Elpis Battle',
    symbol: 'EBA',
  },
  {
    id: 11924,
    name: 'Amasa',
    symbol: 'AMAS',
  },
  {
    id: 11925,
    name: 'Monsta Infinite',
    symbol: 'MONI',
  },
  {
    id: 11926,
    name: 'Thetan Arena',
    symbol: 'THG',
  },
  {
    id: 11927,
    name: 'Solyard Finance',
    symbol: 'YARD',
  },
  {
    id: 11929,
    name: 'Around Network',
    symbol: 'ART',
  },
  {
    id: 11930,
    name: 'HALO network',
    symbol: 'HO',
  },
  {
    id: 11931,
    name: 'Traders coin',
    symbol: 'TRDC',
  },
  {
    id: 11932,
    name: 'Subme',
    symbol: 'SUB',
  },
  {
    id: 11933,
    name: 'HalfPizza',
    symbol: 'PIZA',
  },
  {
    id: 11935,
    name: 'Parrot Protocol',
    symbol: 'PRT',
  },
  {
    id: 11937,
    name: 'ArbiFarm',
    symbol: 'AFARM',
  },
  {
    id: 11938,
    name: 'Doge Universe',
    symbol: 'SPACEXDOGE',
  },
  {
    id: 11939,
    name: 'Heroes & Empires',
    symbol: 'HE',
  },
  {
    id: 11941,
    name: 'Xfinite Entertainment Token',
    symbol: 'XET',
  },
  {
    id: 11942,
    name: 'GameFi Protocol',
    symbol: 'GFI',
  },
  {
    id: 11943,
    name: 'Promodio',
    symbol: 'PMD',
  },
  {
    id: 11945,
    name: 'My Master War',
    symbol: 'MAT',
  },
  {
    id: 11947,
    name: 'HeroVerse',
    symbol: 'HER',
  },
  {
    id: 11948,
    name: 'Radix',
    symbol: 'XRD',
  },
  {
    id: 11949,
    name: 'NFT Gallery',
    symbol: 'NFG',
  },
  {
    id: 11950,
    name: 'Memenopoly',
    symbol: 'MNOP',
  },
  {
    id: 11952,
    name: 'Wrapped Moonriver',
    symbol: 'WMOVR',
  },
  {
    id: 11953,
    name: 'Crypto Island',
    symbol: 'CISLA',
  },
  {
    id: 11955,
    name: 'Lucky1Token',
    symbol: 'L1T',
  },
  {
    id: 11956,
    name: '1INCHUP',
    symbol: '1INCHUP',
  },
  {
    id: 11957,
    name: '1INCHDOWN',
    symbol: '1INCHDOWN',
  },
  {
    id: 11958,
    name: 'Knight War - The Holy Trio',
    symbol: 'KWS',
  },
  {
    id: 11961,
    name: 'Vee Finance',
    symbol: 'VEE',
  },
  {
    id: 11962,
    name: 'Bright Token',
    symbol: 'BRIGHT',
  },
  {
    id: 11964,
    name: 'FreeRiver',
    symbol: 'FREE',
  },
  {
    id: 11965,
    name: 'Step Hero Soul',
    symbol: 'STEP',
  },
  {
    id: 11966,
    name: 'Blizzard Network',
    symbol: 'BLIZZ',
  },
  {
    id: 11967,
    name: 'Hero Arena',
    symbol: 'HERA',
  },
  {
    id: 11968,
    name: 'CAGE',
    symbol: 'C4G3',
  },
  {
    id: 11969,
    name: 'SolDate Token',
    symbol: 'DATE',
  },
  {
    id: 11970,
    name: 'SeaChain',
    symbol: 'SEACHAIN',
  },
  {
    id: 11971,
    name: 'Answerly',
    symbol: 'ANSR',
  },
  {
    id: 11972,
    name: 'BladeWarrior',
    symbol: 'BLADE',
  },
  {
    id: 11973,
    name: 'Thales',
    symbol: 'THALES',
  },
  {
    id: 11974,
    name: 'Alkemi Network DAO Token',
    symbol: 'ALK',
  },
  {
    id: 11977,
    name: 'Infinity PAD',
    symbol: 'IPAD',
  },
  {
    id: 11978,
    name: 'Revolve Games',
    symbol: 'RPG',
  },
  {
    id: 11979,
    name: 'Green Energy Coin',
    symbol: 'GEC',
  },
  {
    id: 11981,
    name: 'Lucky Unicorn Token',
    symbol: 'L99',
  },
  {
    id: 11983,
    name: 'Hudi',
    symbol: 'HUDI',
  },
  {
    id: 11985,
    name: 'Deku Inu',
    symbol: 'DEKU',
  },
  {
    id: 11988,
    name: 'bUKHI',
    symbol: 'BUKH',
  },
  {
    id: 11990,
    name: 'Medacoin',
    symbol: 'MEDA',
  },
  {
    id: 11991,
    name: 'MUD Guild Game',
    symbol: 'MGG',
  },
  {
    id: 11992,
    name: 'EL RUNE - Rune.Game',
    symbol: 'EL',
  },
  {
    id: 11993,
    name: 'HappyFans',
    symbol: 'HAPPY',
  },
  {
    id: 11994,
    name: 'Death Token',
    symbol: 'DEATH',
  },
  {
    id: 11995,
    name: 'TIR RUNE - Rune.Game',
    symbol: 'TIR',
  },
  {
    id: 11996,
    name: 'NEF RUNE - Rune.Game',
    symbol: 'NEF',
  },
  {
    id: 11997,
    name: 'ITH RUNE - Rune.Game',
    symbol: 'ITH',
  },
  {
    id: 11998,
    name: 'TAL RUNE - Rune.Game',
    symbol: 'TAL',
  },
  {
    id: 11999,
    name: 'RAL RUNE - Rune.Game',
    symbol: 'RAL',
  },
  {
    id: 12000,
    name: 'ORT RUNE - Rune.Game',
    symbol: 'ORT',
  },
  {
    id: 12001,
    name: 'THUL RUNE - Rune.Game',
    symbol: 'THUL',
  },
  {
    id: 12002,
    name: 'AMN RUNE - Rune.Game',
    symbol: 'AMN',
  },
  {
    id: 12003,
    name: 'SOL RUNE - Rune.Game',
    symbol: 'SOL',
  },
  {
    id: 12004,
    name: 'SHAEL RUNE - Rune.Game',
    symbol: 'SHAEL',
  },
  {
    id: 12005,
    name: 'DOL RUNE - Rune.Game',
    symbol: 'DOL',
  },
  {
    id: 12006,
    name: 'HEL RUNE - Rune.Game',
    symbol: 'HEL',
  },
  {
    id: 12007,
    name: 'IO RUNE - Rune.Game',
    symbol: 'IO',
  },
  {
    id: 12008,
    name: 'LUM RUNE - Rune.Game',
    symbol: 'LUM',
  },
  {
    id: 12009,
    name: 'KO RUNE - Rune.Game',
    symbol: 'KO',
  },
  {
    id: 12010,
    name: 'FAL RUNE - Rune.Game',
    symbol: 'FAL',
  },
  {
    id: 12012,
    name: 'LO RUNE - Rune.Game',
    symbol: 'LO',
  },
  {
    id: 12013,
    name: 'ZOD RUNE - Rune.Game',
    symbol: 'ZOD',
  },
  {
    id: 12014,
    name: 'HakunaMatata (new)',
    symbol: 'HKUN',
  },
  {
    id: 12016,
    name: 'Communifty',
    symbol: 'CNFT',
  },
  {
    id: 12018,
    name: 'BUSTA',
    symbol: 'BUST',
  },
  {
    id: 12023,
    name: 'JEDSTAR',
    symbol: 'JED',
  },
  {
    id: 12024,
    name: 'BankerDoge',
    symbol: 'BANKER',
  },
  {
    id: 12026,
    name: 'CarbonEco',
    symbol: 'C0',
  },
  {
    id: 12027,
    name: 'Kickstarter',
    symbol: 'KSR',
  },
  {
    id: 12029,
    name: 'EPRO TOKEN',
    symbol: 'EPRO',
  },
  {
    id: 12030,
    name: 'ELD RUNE - Rune.Game',
    symbol: 'ELD',
  },
  {
    id: 12032,
    name: 'Scan DeFi',
    symbol: 'SCAN',
  },
  {
    id: 12033,
    name: 'Moontography',
    symbol: 'MTGY',
  },
  {
    id: 12034,
    name: 'Theoscoin',
    symbol: 'THS',
  },
  {
    id: 12035,
    name: 'Data Economy Index',
    symbol: 'DATA',
  },
  {
    id: 12038,
    name: 'Voltage',
    symbol: 'VOLT',
  },
  {
    id: 12040,
    name: 'Buff Doge Coin',
    symbol: 'DOGECOIN',
  },
  {
    id: 12041,
    name: 'Dimitra Token',
    symbol: 'DMTR',
  },
  {
    id: 12042,
    name: 'Sypool',
    symbol: 'SYP',
  },
  {
    id: 12043,
    name: 'Octopus Network',
    symbol: 'OCT',
  },
  {
    id: 12044,
    name: 'Vera',
    symbol: 'VERA',
  },
  {
    id: 12045,
    name: 'Moonpoly',
    symbol: 'CMP',
  },
  {
    id: 12046,
    name: 'Idexo Token',
    symbol: 'IDO',
  },
  {
    id: 12047,
    name: 'Agrinoble',
    symbol: 'AGN',
  },
  {
    id: 12048,
    name: 'Loud Market',
    symbol: 'LOUD',
  },
  {
    id: 12049,
    name: 'Green Beli',
    symbol: 'GRBE',
  },
  {
    id: 12050,
    name: 'Symmetric',
    symbol: 'SYMM',
  },
  {
    id: 12051,
    name: 'Cryptopolis',
    symbol: 'CPO',
  },
  {
    id: 12053,
    name: 'Meta Spatial',
    symbol: 'SPAT',
  },
  {
    id: 12054,
    name: 'MatrixETF',
    symbol: 'MDF',
  },
  {
    id: 12057,
    name: 'Dopex Rebate Token',
    symbol: 'RDPX',
  },
  {
    id: 12058,
    name: 'Light DeFi',
    symbol: 'LIGHT',
  },
  {
    id: 12059,
    name: 'ShibaNova',
    symbol: 'NOVA',
  },
  {
    id: 12060,
    name: 'XTblock',
    symbol: 'XTT-B20',
  },
  {
    id: 12061,
    name: 'FEICHANG NIU',
    symbol: 'FCN',
  },
  {
    id: 12062,
    name: 'BNBPay',
    symbol: 'BPAY',
  },
  {
    id: 12063,
    name: 'MintySwap',
    symbol: 'MINTYS',
  },
  {
    id: 12064,
    name: 'Cratos',
    symbol: 'CRTS',
  },
  {
    id: 12065,
    name: 'Meeb Master',
    symbol: 'MEEB',
  },
  {
    id: 12066,
    name: 'Shirtum',
    symbol: 'SHI',
  },
  {
    id: 12068,
    name: 'Bullish AF',
    symbol: 'BULLAF',
  },
  {
    id: 12070,
    name: 'QUIDD',
    symbol: 'QUIDD',
  },
  {
    id: 12071,
    name: 'XcelDefi',
    symbol: 'XLD',
  },
  {
    id: 12073,
    name: 'Silver Stonks',
    symbol: 'SSTX',
  },
  {
    id: 12074,
    name: 'Gem Guardian',
    symbol: 'GEMG',
  },
  {
    id: 12078,
    name: 'DogeSwap',
    symbol: 'DOG',
  },
  {
    id: 12079,
    name: 'Amy Finance',
    symbol: 'AMY',
  },
  {
    id: 12080,
    name: 'Kingdom Coin',
    symbol: 'KDC',
  },
  {
    id: 12082,
    name: 'CyberDragon Gold',
    symbol: 'GOLD',
  },
  {
    id: 12084,
    name: 'Billion',
    symbol: 'BILL',
  },
  {
    id: 12085,
    name: 'Rose Finance',
    symbol: 'ROF',
  },
  {
    id: 12090,
    name: 'YoCoin',
    symbol: 'YOCO',
  },
  {
    id: 12093,
    name: 'Instinct',
    symbol: 'INSTINCT',
  },
  {
    id: 12094,
    name: 'DNFT Protocol',
    symbol: 'DNF',
  },
  {
    id: 12096,
    name: 'CRIR MSH',
    symbol: 'MSH',
  },
  {
    id: 12098,
    name: 'SHIBAVAX',
    symbol: 'SHIBX',
  },
  {
    id: 12100,
    name: 'Crystl Finance',
    symbol: 'CRYSTL',
  },
  {
    id: 12102,
    name: 'LPI DAO',
    symbol: 'LPI',
  },
  {
    id: 12103,
    name: 'TOMI',
    symbol: 'TOMI',
  },
  {
    id: 12105,
    name: 'MiniYAK',
    symbol: 'MYAK',
  },
  {
    id: 12108,
    name: 'Safe Trip Finance',
    symbol: 'STF',
  },
  {
    id: 12111,
    name: 'CARROT STABLE COIN',
    symbol: 'CARROT',
  },
  {
    id: 12113,
    name: 'AstroFarms Finance',
    symbol: 'LEO',
  },
  {
    id: 12115,
    name: 'Orion Money',
    symbol: 'ORION',
  },
  {
    id: 12116,
    name: 'Diamond Boyz Coin',
    symbol: 'DBZ',
  },
  {
    id: 12117,
    name: 'Ecosystem Coin Network',
    symbol: 'ECN',
  },
  {
    id: 12118,
    name: 'Celestial',
    symbol: 'CELT',
  },
  {
    id: 12119,
    name: 'Planet Sandbox',
    symbol: 'PSB',
  },
  {
    id: 12120,
    name: 'AstroSwap',
    symbol: 'ASTRO',
  },
  {
    id: 12121,
    name: 'Electric Vehicle Direct Currency',
    symbol: 'EVDC',
  },
  {
    id: 12122,
    name: 'BuffaloSwap',
    symbol: 'BUFF',
  },
  {
    id: 12124,
    name: 'Defi Connect',
    symbol: 'DFC',
  },
  {
    id: 12125,
    name: 'SolRazr',
    symbol: 'SOLR',
  },
  {
    id: 12130,
    name: 'Decentralized data crypto system',
    symbol: 'DCS',
  },
  {
    id: 12131,
    name: 'Fruits',
    symbol: 'FRTS',
  },
  {
    id: 12132,
    name: 'Toll Free Swap',
    symbol: 'TOLL',
  },
  {
    id: 12133,
    name: 'X Protocol',
    symbol: 'POT',
  },
  {
    id: 12134,
    name: 'FlyPaper',
    symbol: 'STICKY',
  },
  {
    id: 12135,
    name: 'SafeMoon-AVAX',
    symbol: 'SAFEMOONA',
  },
  {
    id: 12136,
    name: 'IjasCoin',
    symbol: 'IJC',
  },
  {
    id: 12137,
    name: 'NFTrade',
    symbol: 'NFTD',
  },
  {
    id: 12139,
    name: 'Moonkafe Finance',
    symbol: 'KAFE',
  },
  {
    id: 12140,
    name: 'RMRK',
    symbol: 'RMRK',
  },
  {
    id: 12145,
    name: 'BabySafeMoon',
    symbol: 'BSFM',
  },
  {
    id: 12146,
    name: 'Block Farm',
    symbol: 'BFC',
  },
  {
    id: 12147,
    name: 'Synapse',
    symbol: 'SYN',
  },
  {
    id: 12148,
    name: 'Swash',
    symbol: 'SWASH',
  },
  {
    id: 12150,
    name: 'Little Angry Bunny v2',
    symbol: 'LAB v2',
  },
  {
    id: 12153,
    name: 'Kurobi',
    symbol: 'KURO',
  },
  {
    id: 12154,
    name: 'Everest Token',
    symbol: 'EVRT',
  },
  {
    id: 12156,
    name: 'Asia Coin',
    symbol: 'ASIA',
  },
  {
    id: 12157,
    name: 'OEC FIL',
    symbol: 'FILK',
  },
  {
    id: 12158,
    name: 'OEC UNI',
    symbol: 'UNIK',
  },
  {
    id: 12159,
    name: 'OEC SHIB',
    symbol: 'SHIBK',
  },
  {
    id: 12160,
    name: 'Arata',
    symbol: 'ARATA',
  },
  {
    id: 12161,
    name: 'REVIVAL',
    symbol: 'RVL',
  },
  {
    id: 12163,
    name: 'Daopolis Token (DAOS)',
    symbol: 'DAOS',
  },
  {
    id: 12166,
    name: 'Starpunk',
    symbol: 'SRP',
  },
  {
    id: 12167,
    name: 'CoinxPad',
    symbol: 'CXPAD',
  },
  {
    id: 12168,
    name: 'MoneydefiSwap',
    symbol: 'MSD',
  },
  {
    id: 12170,
    name: 'The Employment Commons Work Token',
    symbol: 'WORK',
  },
  {
    id: 12171,
    name: 'PolkaEx',
    symbol: 'PKEX',
  },
  {
    id: 12172,
    name: 'Moniwar',
    symbol: 'MOWA',
  },
  {
    id: 12176,
    name: 'Hummingbird Egg Token',
    symbol: 'HEGG',
  },
  {
    id: 12178,
    name: 'Sombra Network',
    symbol: 'SMBR',
  },
  {
    id: 12179,
    name: 'PolyAlpha Finance',
    symbol: 'ALPHA',
  },
  {
    id: 12180,
    name: 'Rainbow Token',
    symbol: 'RAINBOW',
  },
  {
    id: 12182,
    name: 'Blocto Token',
    symbol: 'BLT',
  },
  {
    id: 12183,
    name: 'Loki Variants Fan',
    symbol: 'VARIANTS',
  },
  {
    id: 12186,
    name: 'Songbird',
    symbol: 'SGB',
  },
  {
    id: 12187,
    name: 'GranX Chain',
    symbol: 'GRANX',
  },
  {
    id: 12191,
    name: 'DogeBack',
    symbol: 'DOGEBACK',
  },
  {
    id: 12192,
    name: 'RugZombie',
    symbol: 'ZMBE',
  },
  {
    id: 12193,
    name: 'AquaGoat.Finance',
    symbol: 'AQUAGOAT',
  },
  {
    id: 12194,
    name: 'Baby Floki (BSC)',
    symbol: 'BABYFLOKI',
  },
  {
    id: 12195,
    name: 'Mooncake Token',
    symbol: 'MOON',
  },
  {
    id: 12196,
    name: 'Kollect',
    symbol: 'KOL',
  },
  {
    id: 12198,
    name: 'Boss Token',
    symbol: 'BOSS',
  },
  {
    id: 12199,
    name: 'FUFU',
    symbol: 'FUFU',
  },
  {
    id: 12200,
    name: 'Digital Swiss Franc',
    symbol: 'DSFR',
  },
  {
    id: 12201,
    name: 'Portify',
    symbol: 'PFY',
  },
  {
    id: 12203,
    name: 'Defina Finance',
    symbol: 'FINA',
  },
  {
    id: 12204,
    name: 'KRoot',
    symbol: 'KROOT',
  },
  {
    id: 12205,
    name: 'Real Trump Token V2',
    symbol: 'RTTV2',
  },
  {
    id: 12207,
    name: 'Ronin Gamez',
    symbol: 'RONINGMZ',
  },
  {
    id: 12208,
    name: 'Taxa Token',
    symbol: 'TXT',
  },
  {
    id: 12211,
    name: 'BattleRoyaleToken',
    symbol: 'BRTK',
  },
  {
    id: 12212,
    name: 'Allbridge',
    symbol: 'ABR',
  },
  {
    id: 12214,
    name: 'Shibaverse',
    symbol: 'VERSE',
  },
  {
    id: 12215,
    name: 'Falcon 9',
    symbol: 'F9',
  },
  {
    id: 12218,
    name: 'Continuum World',
    symbol: 'UM',
  },
  {
    id: 12220,
    name: 'Osmosis',
    symbol: 'OSMO',
  },
  {
    id: 12221,
    name: 'Rangers Protocol',
    symbol: 'RPG',
  },
  {
    id: 12223,
    name: 'Bulldogswap',
    symbol: 'BUDG',
  },
  {
    id: 12224,
    name: 'Firebird Finance',
    symbol: 'HOPE',
  },
  {
    id: 12227,
    name: 'DareNFT',
    symbol: 'DNFT',
  },
  {
    id: 12228,
    name: 'EnterDAO',
    symbol: 'ENTR',
  },
  {
    id: 12229,
    name: 'DogeGF',
    symbol: 'DOGEGF',
  },
  {
    id: 12230,
    name: 'Revest Finance',
    symbol: 'RVST',
  },
  {
    id: 12231,
    name: 'AquaFi',
    symbol: 'AQUA',
  },
  {
    id: 12232,
    name: 'iNFT Platform',
    symbol: 'INFT',
  },
  {
    id: 12233,
    name: 'Lucky Lion',
    symbol: 'LUCKY',
  },
  {
    id: 12234,
    name: 'Torii Finance',
    symbol: 'TORII',
  },
  {
    id: 12235,
    name: 'Bingus Network',
    symbol: 'BINGUS',
  },
  {
    id: 12236,
    name: 'Jet Protocol',
    symbol: 'JET',
  },
  {
    id: 12237,
    name: 'Dragon Egg',
    symbol: 'DREGG',
  },
  {
    id: 12239,
    name: 'Zeropay Finance',
    symbol: 'ZEROPAY',
  },
  {
    id: 12240,
    name: 'MARS4',
    symbol: 'MARS4',
  },
  {
    id: 12241,
    name: 'Crypto Cars World',
    symbol: 'CARS',
  },
  {
    id: 12242,
    name: 'Grape Network',
    symbol: 'GRAPE',
  },
  {
    id: 12245,
    name: 'GINCOIN (Global  Interest  Rate)',
    symbol: 'GIN',
  },
  {
    id: 12247,
    name: 'S-ONE Finance',
    symbol: 'SONE',
  },
  {
    id: 12248,
    name: 'Solcubator',
    symbol: 'SOLC',
  },
  {
    id: 12249,
    name: 'Health Potion',
    symbol: 'HEP',
  },
  {
    id: 12251,
    name: 'Parabolic',
    symbol: 'PARA',
  },
  {
    id: 12252,
    name: 'Bombcrypto',
    symbol: 'BCOIN',
  },
  {
    id: 12253,
    name: 'WOOF',
    symbol: 'WOOF',
  },
  {
    id: 12254,
    name: 'Gro DAO Token',
    symbol: 'GRO',
  },
  {
    id: 12255,
    name: 'BitOrbit',
    symbol: 'BITORB',
  },
  {
    id: 12257,
    name: 'XTRA Token',
    symbol: 'XTRA',
  },
  {
    id: 12258,
    name: 'StrongNode Edge',
    symbol: 'SNE',
  },
  {
    id: 12259,
    name: 'DaddyUSDT',
    symbol: 'DADDYUSDT',
  },
  {
    id: 12261,
    name: 'CryptoLion',
    symbol: 'CLION',
  },
  {
    id: 12263,
    name: 'SEED',
    symbol: 'SEED',
  },
  {
    id: 12264,
    name: 'XMINE',
    symbol: 'XMN',
  },
  {
    id: 12265,
    name: 'Investin',
    symbol: 'IVN',
  },
  {
    id: 12266,
    name: 'Uzumaki Inu',
    symbol: 'UZUMAKI',
  },
  {
    id: 12268,
    name: 'Inferno Pay',
    symbol: 'IFO',
  },
  {
    id: 12269,
    name: 'WELD',
    symbol: 'WELD',
  },
  {
    id: 12270,
    name: 'Kodi',
    symbol: 'KODI',
  },
  {
    id: 12271,
    name: 'CryptoBlades Kingdoms',
    symbol: 'KING',
  },
  {
    id: 12272,
    name: 'Boo Finance',
    symbol: 'BOOFI',
  },
  {
    id: 12273,
    name: 'SPACE SIP',
    symbol: 'SIP',
  },
  {
    id: 12275,
    name: 'Dynamix',
    symbol: 'DYNA',
  },
  {
    id: 12276,
    name: 'Flokinomics',
    symbol: 'FLOKIN',
  },
  {
    id: 12277,
    name: 'Egoras (New)',
    symbol: 'EGR',
  },
  {
    id: 12279,
    name: 'PixelVerse',
    symbol: 'PIXEL',
  },
  {
    id: 12280,
    name: 'Bholdus',
    symbol: 'BHO',
  },
  {
    id: 12281,
    name: 'Lofi Defi',
    symbol: 'LOFI',
  },
  {
    id: 12285,
    name: 'Plenty DeFi',
    symbol: 'PLENTY',
  },
  {
    id: 12286,
    name: 'AUREO',
    symbol: 'AUR',
  },
  {
    id: 12287,
    name: 'Bankless BED Index',
    symbol: 'BED',
  },
  {
    id: 12293,
    name: 'Beyond Protocol',
    symbol: 'BP',
  },
  {
    id: 12296,
    name: 'Picipo',
    symbol: 'PICIPO',
  },
  {
    id: 12297,
    name: 'Lido for Solana',
    symbol: 'STSOL',
  },
  {
    id: 12298,
    name: 'DFBTC',
    symbol: 'AOM',
  },
  {
    id: 12300,
    name: 'FOMO BABY',
    symbol: 'FOMOBABY',
  },
  {
    id: 12301,
    name: 'Retreeb',
    symbol: 'TREEB',
  },
  {
    id: 12302,
    name: 'Tokenplace',
    symbol: 'TOK',
  },
  {
    id: 12303,
    name: 'Thinkium',
    symbol: 'TKM',
  },
  {
    id: 12306,
    name: 'Raptoreum',
    symbol: 'RTM',
  },
  {
    id: 12307,
    name: 'Warena',
    symbol: 'RENA',
  },
  {
    id: 12311,
    name: 'Black Lemon',
    symbol: 'BOM',
  },
  {
    id: 12312,
    name: 'NASDEX',
    symbol: 'NSDX',
  },
  {
    id: 12313,
    name: 'Kawaii Islands',
    symbol: 'KWT',
  },
  {
    id: 12314,
    name: 'WonderHero',
    symbol: 'WND',
  },
  {
    id: 12315,
    name: 'DOSE',
    symbol: 'DOSE',
  },
  {
    id: 12316,
    name: 'MVP Coin',
    symbol: 'MVP',
  },
  {
    id: 12317,
    name: 'Doren',
    symbol: 'DRE',
  },
  {
    id: 12318,
    name: 'Community Doge Coin',
    symbol: 'CCDOGE',
  },
  {
    id: 12321,
    name: 'Maison Capital',
    symbol: 'MSN',
  },
  {
    id: 12324,
    name: 'LatteSwap',
    symbol: 'LATTE',
  },
  {
    id: 12325,
    name: 'MarsRise',
    symbol: 'MARSRISE',
  },
  {
    id: 12327,
    name: 'T1 Racing',
    symbol: 'T1',
  },
  {
    id: 12328,
    name: 'Welnance finance',
    symbol: 'WEL',
  },
  {
    id: 12329,
    name: 'DBX Digital Ecosystem',
    symbol: 'DBX',
  },
  {
    id: 12330,
    name: 'Envelop',
    symbol: 'NIFTSY',
  },
  {
    id: 12331,
    name: 'Rocket Launchpad',
    symbol: 'RCKT',
  },
  {
    id: 12332,
    name: 'Space Hamster',
    symbol: 'HAMS',
  },
  {
    id: 12333,
    name: 'DAO Invest',
    symbol: 'VEST',
  },
  {
    id: 12334,
    name: 'United Farmers Finance',
    symbol: 'UFF',
  },
  {
    id: 12336,
    name: 'SOLA Token',
    symbol: 'SOLA',
  },
  {
    id: 12338,
    name: 'ShibaCorgi',
    symbol: 'SHICO',
  },
  {
    id: 12340,
    name: 'Dogmoon',
    symbol: 'DOGMOON',
  },
  {
    id: 12341,
    name: 'Tracer DAO',
    symbol: 'TCR',
  },
  {
    id: 12342,
    name: 'SAVE CARDANO',
    symbol: 'SADA',
  },
  {
    id: 12343,
    name: 'PremiumBlock',
    symbol: 'PRB',
  },
  {
    id: 12344,
    name: 'Affinity',
    symbol: 'AFFINITY',
  },
  {
    id: 12345,
    name: 'Steam Exchange',
    symbol: 'STEAMX',
  },
  {
    id: 12346,
    name: 'GOKU INU',
    symbol: 'GOKU',
  },
  {
    id: 12347,
    name: 'Dough',
    symbol: 'DOUGH',
  },
  {
    id: 12348,
    name: 'Doxxed',
    symbol: 'DOX',
  },
  {
    id: 12349,
    name: 'Swanlana',
    symbol: 'SWAN',
  },
  {
    id: 12350,
    name: 'Triall',
    symbol: 'TRL',
  },
  {
    id: 12351,
    name: 'GreenZoneX',
    symbol: 'GZX',
  },
  {
    id: 12353,
    name: 'FlokiFrunkPuppy',
    symbol: 'FloFru',
  },
  {
    id: 12354,
    name: 'Galaxy Heroes Coin',
    symbol: 'GHC',
  },
  {
    id: 12355,
    name: 'Baby Floki Billionaire',
    symbol: 'BabyFB',
  },
  {
    id: 12357,
    name: 'DefiXBet',
    symbol: 'DXB',
  },
  {
    id: 12359,
    name: 'Wojak Finance',
    symbol: 'WOJ',
  },
  {
    id: 12360,
    name: 'CoinAlpha',
    symbol: 'ALP',
  },
  {
    id: 12361,
    name: 'Space Vikings',
    symbol: 'SVT',
  },
  {
    id: 12362,
    name: 'AetherV2',
    symbol: 'ATH',
  },
  {
    id: 12364,
    name: 'Youclout',
    symbol: 'YCT',
  },
  {
    id: 12365,
    name: 'Lovely Inu',
    symbol: 'LOVELY',
  },
  {
    id: 12366,
    name: 'Demeter',
    symbol: 'DUSD',
  },
  {
    id: 12367,
    name: 'Avaxtars Token',
    symbol: 'AVXT',
  },
  {
    id: 12369,
    name: 'FarmersOnly',
    symbol: 'CORN',
  },
  {
    id: 12370,
    name: 'AvaNyan',
    symbol: 'ANYAN',
  },
  {
    id: 12373,
    name: 'ArchAngel Token',
    symbol: 'ARCHA',
  },
  {
    id: 12375,
    name: 'ECHO TECH COIN',
    symbol: 'ECOT',
  },
  {
    id: 12377,
    name: 'SOLBERRY',
    symbol: 'SOLBERRY',
  },
  {
    id: 12380,
    name: 'PolyDragon',
    symbol: 'DGOLD',
  },
  {
    id: 12381,
    name: 'Smile Coin',
    symbol: 'SMILE',
  },
  {
    id: 12382,
    name: 'Zamio',
    symbol: 'ZAM',
  },
  {
    id: 12384,
    name: 'Game1Network',
    symbol: 'GAME1',
  },
  {
    id: 12385,
    name: 'Solster Finance',
    symbol: 'STR',
  },
  {
    id: 12387,
    name: 'Ribbon Finance',
    symbol: 'RBN',
  },
  {
    id: 12388,
    name: 'Wrapped DucatusX',
    symbol: 'WDUCX',
  },
  {
    id: 12389,
    name: 'TrustKeys Network',
    symbol: 'TRUSTK',
  },
  {
    id: 12390,
    name: 'Octane Finance',
    symbol: 'OCTANE',
  },
  {
    id: 12391,
    name: 'Pokmonsters',
    symbol: 'POK',
  },
  {
    id: 12392,
    name: 'Centurion Inu',
    symbol: 'CENT',
  },
  {
    id: 12393,
    name: 'Lightcoin',
    symbol: 'LHC',
  },
  {
    id: 12394,
    name: 'MOR',
    symbol: 'MOR',
  },
  {
    id: 12395,
    name: 'Merchant Token',
    symbol: 'MTO',
  },
  {
    id: 12397,
    name: 'MoonBeans',
    symbol: 'BEANS',
  },
  {
    id: 12398,
    name: 'Spain National Fan Token',
    symbol: 'SNFT',
  },
  {
    id: 12400,
    name: 'Decimal',
    symbol: 'DEL',
  },
  {
    id: 12403,
    name: 'Pink Panther',
    symbol: 'PINK',
  },
  {
    id: 12407,
    name: 'Nezuko Inu',
    symbol: 'NEZUKO',
  },
  {
    id: 12408,
    name: 'Chopper Inu',
    symbol: 'CHOPPER',
  },
  {
    id: 12409,
    name: 'Lido wstETH',
    symbol: 'WSTETH',
  },
  {
    id: 12410,
    name: 'WHACKD',
    symbol: 'WHACKD',
  },
  {
    id: 12411,
    name: 'Balkari',
    symbol: 'BKR',
  },
  {
    id: 12413,
    name: 'Shiba Fantom',
    symbol: 'SHIBA',
  },
  {
    id: 12415,
    name: 'TWO TWO',
    symbol: 'X22',
  },
  {
    id: 12416,
    name: 'PulsePad',
    symbol: 'PLSPAD',
  },
  {
    id: 12418,
    name: 'Jax.Network',
    symbol: 'WJXN',
  },
  {
    id: 12419,
    name: 'Adadex Tools',
    symbol: 'ADAT',
  },
  {
    id: 12420,
    name: 'LuckyPig',
    symbol: 'LuckyPig',
  },
  {
    id: 12421,
    name: 'Coin Discovery',
    symbol: 'CODI',
  },
  {
    id: 12422,
    name: 'Frosted Cake',
    symbol: 'FROSTEDCAKE',
  },
  {
    id: 12423,
    name: 'Litherium',
    symbol: 'LITH',
  },
  {
    id: 12424,
    name: 'Mainston',
    symbol: 'STON',
  },
  {
    id: 12426,
    name: 'DOOiT Token',
    symbol: 'DOO',
  },
  {
    id: 12428,
    name: 'Bagus Wallet',
    symbol: 'BG',
  },
  {
    id: 12430,
    name: 'Rogue West',
    symbol: 'ROGUE',
  },
  {
    id: 12433,
    name: 'DogeDrinks',
    symbol: 'DOGEDRINKS',
  },
  {
    id: 12435,
    name: 'Battle Hero',
    symbol: 'BATH',
  },
  {
    id: 12436,
    name: 'Timeleap Finance',
    symbol: 'TIME',
  },
  {
    id: 12437,
    name: 'Gooreo',
    symbol: 'GOOREO',
  },
  {
    id: 12438,
    name: 'zkTube Protocol',
    symbol: 'ZKT',
  },
  {
    id: 12439,
    name: 'BRCP TOKEN',
    symbol: 'BRCP',
  },
  {
    id: 12440,
    name: 'Buffer Finance',
    symbol: 'IBFR',
  },
  {
    id: 12447,
    name: 'Silvertoken',
    symbol: 'SLVT',
  },
  {
    id: 12448,
    name: 'EverGrow Coin',
    symbol: 'EGC',
  },
  {
    id: 12449,
    name: 'GameFi Shiba',
    symbol: 'GAMEFI',
  },
  {
    id: 12450,
    name: 'Influencer',
    symbol: 'IMI',
  },
  {
    id: 12451,
    name: 'Mondo Community Coin',
    symbol: 'MNDCC',
  },
  {
    id: 12452,
    name: 'TETU',
    symbol: 'TETU',
  },
  {
    id: 12453,
    name: 'Baby Floki Coin',
    symbol: 'BABYFLOKICOIN',
  },
  {
    id: 12455,
    name: 'Magic Token',
    symbol: 'MAGIC',
  },
  {
    id: 12456,
    name: 'ROBINOS',
    symbol: 'RBN',
  },
  {
    id: 12457,
    name: 'ZEDXION',
    symbol: 'ZEDXION',
  },
  {
    id: 12458,
    name: 'KSM Starter',
    symbol: 'KST',
  },
  {
    id: 12459,
    name: 'Holdex Finance',
    symbol: 'HOLDEX',
  },
  {
    id: 12460,
    name: 'UNITED EMIRATE DECENTRALIZED COIN.',
    symbol: 'UEDC',
  },
  {
    id: 12463,
    name: 'Timechain Swap Token',
    symbol: 'TCS',
  },
  {
    id: 12464,
    name: 'Lox Network',
    symbol: 'LOX',
  },
  {
    id: 12465,
    name: 'Ridotto',
    symbol: 'RDT',
  },
  {
    id: 12466,
    name: 'MMACOIN',
    symbol: 'MMA',
  },
  {
    id: 12467,
    name: 'RISQ Protocol',
    symbol: 'RISQ',
  },
  {
    id: 12468,
    name: 'Equilibrium Games',
    symbol: 'EQ',
  },
  {
    id: 12469,
    name: 'Momento',
    symbol: 'MOMENTO',
  },
  {
    id: 12473,
    name: 'OrcaDAO',
    symbol: 'ORCA',
  },
  {
    id: 12474,
    name: 'MoonX',
    symbol: 'MoonX',
  },
  {
    id: 12476,
    name: 'Miners Defi',
    symbol: 'MINERS',
  },
  {
    id: 12477,
    name: 'Sewer Rat Social Club CHIZ Token',
    symbol: 'CHIZ',
  },
  {
    id: 12478,
    name: 'Electric Arena',
    symbol: 'EARENA',
  },
  {
    id: 12484,
    name: 'Velox',
    symbol: 'VLX',
  },
  {
    id: 12487,
    name: 'Dark Frontiers',
    symbol: 'DARK',
  },
  {
    id: 12488,
    name: 'Dogira',
    symbol: 'DOGIRA',
  },
  {
    id: 12489,
    name: 'GUARDIAN',
    symbol: 'GUARD',
  },
  {
    id: 12490,
    name: 'Baddest Alpha Ape Bundle',
    symbol: 'APED',
  },
  {
    id: 12491,
    name: 'BabyYorkie',
    symbol: 'BBY',
  },
  {
    id: 12492,
    name: 'CoviCoin',
    symbol: 'CVC',
  },
  {
    id: 12494,
    name: 'Melo Token',
    symbol: 'MELO',
  },
  {
    id: 12495,
    name: 'XGOLD COIN',
    symbol: 'XGOLD',
  },
  {
    id: 12500,
    name: 'Orca AVAI',
    symbol: 'AVAI',
  },
  {
    id: 12501,
    name: 'Qrkita Token',
    symbol: 'QRT',
  },
  {
    id: 12503,
    name: 'Beanstalk',
    symbol: 'BEAN',
  },
  {
    id: 12504,
    name: 'SpacePort Universe',
    symbol: 'SPU',
  },
  {
    id: 12506,
    name: 'NFTY Network',
    symbol: 'NFTY',
  },
  {
    id: 12508,
    name: 'Vero Farm',
    symbol: 'VERO',
  },
  {
    id: 12510,
    name: 'DeFido',
    symbol: 'DEFIDO',
  },
  {
    id: 12511,
    name: 'Wrapped NewYorkCoin',
    symbol: 'WNYC',
  },
  {
    id: 12513,
    name: 'Dino',
    symbol: 'DINO',
  },
  {
    id: 12515,
    name: 'Colawork',
    symbol: 'COLA',
  },
  {
    id: 12516,
    name: 'Dog Collar',
    symbol: 'COLLAR',
  },
  {
    id: 12517,
    name: 'DEI',
    symbol: 'DEI',
  },
  {
    id: 12518,
    name: 'Morphie Network',
    symbol: 'MRFI',
  },
  {
    id: 12521,
    name: 'Financial Intelligence Group',
    symbol: 'ATBFIG',
  },
  {
    id: 12522,
    name: 'WFAIR',
    symbol: 'WFAIR',
  },
  {
    id: 12523,
    name: 'BurningMoon',
    symbol: 'BM',
  },
  {
    id: 12525,
    name: 'eBlockStock',
    symbol: 'EBSO',
  },
  {
    id: 12526,
    name: 'USD Open Dollar',
    symbol: 'USDO',
  },
  {
    id: 12528,
    name: 'RugSeekers',
    symbol: 'SEEK',
  },
  {
    id: 12529,
    name: 'IceSlush Finance',
    symbol: 'SLUSH',
  },
  {
    id: 12530,
    name: 'Project DogeX',
    symbol: '$DOGEX',
  },
  {
    id: 12531,
    name: 'Game X Change',
    symbol: 'EXP',
  },
  {
    id: 12532,
    name: 'TTcoin',
    symbol: 'TC',
  },
  {
    id: 12533,
    name: 'ESWAP.TUBE',
    symbol: 'TUBE2',
  },
  {
    id: 12535,
    name: 'InfinitUp',
    symbol: 'IUP',
  },
  {
    id: 12536,
    name: 'Decentralized Community Investment Protocol',
    symbol: 'DCIP',
  },
  {
    id: 12537,
    name: 'PolyBeta Finance',
    symbol: 'BETA',
  },
  {
    id: 12540,
    name: 'ACCESSLAUNCHER',
    symbol: 'ACX',
  },
  {
    id: 12542,
    name: 'CheeseFry',
    symbol: 'CHEESE',
  },
  {
    id: 12543,
    name: 'Valkyrio',
    symbol: 'VALK',
  },
  {
    id: 12545,
    name: 'URG University',
    symbol: 'URG-U',
  },
  {
    id: 12546,
    name: 'Liquidus',
    symbol: 'LIQ',
  },
  {
    id: 12549,
    name: 'Dinosaureggs',
    symbol: 'DSG',
  },
  {
    id: 12550,
    name: 'BNB Cash',
    symbol: 'BNBCH',
  },
  {
    id: 12552,
    name: 'BeatBind',
    symbol: 'BBND',
  },
  {
    id: 12553,
    name: 'Cure Token',
    symbol: 'CURE',
  },
  {
    id: 12556,
    name: 'Oculus Vision',
    symbol: 'OCV',
  },
  {
    id: 12557,
    name: 'Beach Token',
    symbol: 'BEACH',
  },
  {
    id: 12558,
    name: 'Xbullion',
    symbol: 'GOLD',
  },
  {
    id: 12559,
    name: 'Aquarius Protocol',
    symbol: 'AQU',
  },
  {
    id: 12560,
    name: 'Reverse Climate Change',
    symbol: 'RVRS',
  },
  {
    id: 12562,
    name: 'Mononoke Inu',
    symbol: 'Mononoke-Inu',
  },
  {
    id: 12563,
    name: 'Nami Inu',
    symbol: 'NAMI',
  },
  {
    id: 12566,
    name: 'PinkSale',
    symbol: 'PINKSALE',
  },
  {
    id: 12568,
    name: 'EverestCoin',
    symbol: 'EVCOIN',
  },
  {
    id: 12570,
    name: 'Crystal',
    symbol: 'CRYSTAL',
  },
  {
    id: 12571,
    name: 'Daikokuten Sama',
    symbol: 'DKKS',
  },
  {
    id: 12572,
    name: 'Waterfall DeFi',
    symbol: 'WTF',
  },
  {
    id: 12573,
    name: 'Clearpool',
    symbol: 'CPOOL',
  },
  {
    id: 12574,
    name: 'World of Cryptia',
    symbol: 'CRYPT',
  },
  {
    id: 12576,
    name: 'Geist Finance',
    symbol: 'GEIST',
  },
  {
    id: 12577,
    name: 'PL^Gnet',
    symbol: 'PLUG',
  },
  {
    id: 12578,
    name: 'AnchorSwap',
    symbol: 'ANCHOR',
  },
  {
    id: 12580,
    name: 'SUPERLAUNCH',
    symbol: 'SLA',
  },
  {
    id: 12581,
    name: 'CZFarm',
    symbol: 'CZF',
  },
  {
    id: 12582,
    name: 'PokerFI.Finance',
    symbol: 'POKERFI',
  },
  {
    id: 12584,
    name: 'Yarloo',
    symbol: 'YARL',
  },
  {
    id: 12585,
    name: 'Demole',
    symbol: 'DMLG',
  },
  {
    id: 12586,
    name: 'ShibX',
    symbol: '$ShibX',
  },
  {
    id: 12587,
    name: '2gather',
    symbol: 'TWO',
  },
  {
    id: 12588,
    name: 'ProjectOasis',
    symbol: 'OASIS',
  },
  {
    id: 12590,
    name: 'AutoShark DEX',
    symbol: 'FINS',
  },
  {
    id: 12591,
    name: 'LunaChow',
    symbol: 'LUCHOW',
  },
  {
    id: 12592,
    name: 'DFSocial Gaming',
    symbol: 'DFSG',
  },
  {
    id: 12595,
    name: 'Filecoin Standard Hashrate Token',
    symbol: 'FILST',
  },
  {
    id: 12596,
    name: 'Token TKX',
    symbol: 'TKX',
  },
  {
    id: 12597,
    name: 'Doge Superbowl',
    symbol: 'DSBOWL',
  },
  {
    id: 12599,
    name: 'ASPO World',
    symbol: 'ASPO',
  },
  {
    id: 12600,
    name: 'Stable FIL',
    symbol: 'ONEFIL',
  },
  {
    id: 12603,
    name: '867',
    symbol: '867',
  },
  {
    id: 12604,
    name: 'FRAKT Token',
    symbol: 'FRKT',
  },
  {
    id: 12605,
    name: 'HarmonyPad',
    symbol: 'HPAD',
  },
  {
    id: 12606,
    name: 'DeCredit',
    symbol: 'CDTC',
  },
  {
    id: 12607,
    name: 'Solberg',
    symbol: 'SLB',
  },
  {
    id: 12608,
    name: 'Artwork NFT',
    symbol: 'ANFT',
  },
  {
    id: 12609,
    name: 'Sway Social Protocol',
    symbol: 'SWAY',
  },
  {
    id: 12614,
    name: 'Dragon Kart',
    symbol: 'KART',
  },
  {
    id: 12618,
    name: 'Polly Finance',
    symbol: 'POLLY',
  },
  {
    id: 12619,
    name: 'Genie Protocol',
    symbol: 'GNP',
  },
  {
    id: 12620,
    name: 'Xeta Reality',
    symbol: 'XETA',
  },
  {
    id: 12622,
    name: 'FOMO Chronicles Manga',
    symbol: 'OTAKU',
  },
  {
    id: 12624,
    name: 'Women Empowerment Token',
    symbol: 'WEMP',
  },
  {
    id: 12625,
    name: 'DogeBull',
    symbol: 'DOGEBULL',
  },
  {
    id: 12630,
    name: 'SIMP Token',
    symbol: 'SIMP',
  },
  {
    id: 12633,
    name: 'Bitsol Finance',
    symbol: 'BTSL',
  },
  {
    id: 12634,
    name: 'Wiggly Finance',
    symbol: 'WGL',
  },
  {
    id: 12636,
    name: 'HIKOBABA',
    symbol: 'HIKO',
  },
  {
    id: 12640,
    name: 'KICK.IO',
    symbol: 'KICK',
  },
  {
    id: 12641,
    name: 'OBRok Token',
    symbol: 'OBROK',
  },
  {
    id: 12642,
    name: 'Polysage',
    symbol: 'SAGE',
  },
  {
    id: 12644,
    name: 'The Three Kingdoms',
    symbol: 'TTK',
  },
  {
    id: 12646,
    name: 'Verse',
    symbol: 'VERSE',
  },
  {
    id: 12648,
    name: 'Wrapped Curio Ferrari F12tdf',
    symbol: 'WCT1',
  },
  {
    id: 12649,
    name: 'Alanyaspor Fan Token',
    symbol: 'ALA',
  },
  {
    id: 12650,
    name: 'GAIA Everworld',
    symbol: 'GAIA',
  },
  {
    id: 12652,
    name: 'Hanu Yokia',
    symbol: 'HANU',
  },
  {
    id: 12653,
    name: 'ROCO FINANCE',
    symbol: 'ROCO',
  },
  {
    id: 12655,
    name: 'MemeFlate',
    symbol: '$MFLATE',
  },
  {
    id: 12656,
    name: 'xYSL',
    symbol: 'XYSL',
  },
  {
    id: 12657,
    name: 'Instaraise',
    symbol: 'INSTA',
  },
  {
    id: 12658,
    name: 'Swift Finance',
    symbol: 'SWIFT',
  },
  {
    id: 12659,
    name: 'Next Token',
    symbol: 'NXT',
  },
  {
    id: 12661,
    name: 'HashBit BlockChain',
    symbol: 'HBIT',
  },
  {
    id: 12662,
    name: 'Mini Kishu',
    symbol: 'MINIKISHU',
  },
  {
    id: 12663,
    name: 'Libre DeFi',
    symbol: 'LIBRE',
  },
  {
    id: 12664,
    name: 'Scallop',
    symbol: 'SCLP',
  },
  {
    id: 12669,
    name: 'PetWorld',
    symbol: 'PW',
  },
  {
    id: 12670,
    name: 'Surge Inu',
    symbol: 'SURGE',
  },
  {
    id: 12671,
    name: 'FANG Token',
    symbol: 'FANG',
  },
  {
    id: 12673,
    name: 'Buffaloswap RED',
    symbol: 'REDBUFF',
  },
  {
    id: 12675,
    name: 'Dark Matter DeFi',
    symbol: 'DMD',
  },
  {
    id: 12676,
    name: 'Moonbird',
    symbol: 'MBIRD',
  },
  {
    id: 12677,
    name: 'Londex',
    symbol: 'LDX',
  },
  {
    id: 12678,
    name: 'FireStarter',
    symbol: 'FLAME',
  },
  {
    id: 12680,
    name: 'RedBuff Token',
    symbol: 'REDBUFF',
  },
  {
    id: 12681,
    name: 'UniCandy',
    symbol: 'UCD',
  },
  {
    id: 12682,
    name: 'DecentraWeb',
    symbol: 'DWEB',
  },
  {
    id: 12684,
    name: 'AlvareNet',
    symbol: 'ALVN',
  },
  {
    id: 12685,
    name: 'BABY DOGE MONEY MAKER',
    symbol: 'BABYDOGEMM',
  },
  {
    id: 12687,
    name: 'Lazio Fan Token',
    symbol: 'LAZIO',
  },
  {
    id: 12690,
    name: 'Wrapped PKT',
    symbol: 'WPKT',
  },
  {
    id: 12692,
    name: 'Poken',
    symbol: 'PKN',
  },
  {
    id: 12693,
    name: 'blocsport.one',
    symbol: 'BLS',
  },
  {
    id: 12694,
    name: 'MANAGER PRO',
    symbol: 'MPRO',
  },
  {
    id: 12695,
    name: 'PolyPup Finance',
    symbol: 'COLLAR',
  },
  {
    id: 12696,
    name: 'INU Token',
    symbol: 'INU',
  },
  {
    id: 12697,
    name: "Elon's Marvin",
    symbol: 'MARVIN',
  },
  {
    id: 12698,
    name: 'Ninja Protocol',
    symbol: 'NINJA',
  },
  {
    id: 12699,
    name: 'Quid Ika',
    symbol: 'QUID',
  },
  {
    id: 12700,
    name: 'Sasuke Inu',
    symbol: 'SINU',
  },
  {
    id: 12702,
    name: 'TAPME Token',
    symbol: 'TAP',
  },
  {
    id: 12703,
    name: 'Gyro',
    symbol: 'GYRO',
  },
  {
    id: 12705,
    name: 'Pollchain',
    symbol: 'POLL',
  },
  {
    id: 12706,
    name: 'PowerADA',
    symbol: 'POW',
  },
  {
    id: 12707,
    name: 'Xenon Play',
    symbol: 'XPLAY',
  },
  {
    id: 12708,
    name: 'MarvinInu',
    symbol: 'MARVIN',
  },
  {
    id: 12709,
    name: 'HZM Coin',
    symbol: 'HZM',
  },
  {
    id: 12710,
    name: 'Shakita Inu',
    symbol: 'SHAK',
  },
  {
    id: 12712,
    name: 'Genesis Mana',
    symbol: 'MANA',
  },
  {
    id: 12713,
    name: 'Rijent Coin',
    symbol: 'RTC',
  },
  {
    id: 12714,
    name: 'Bitcoin SB',
    symbol: 'BSB',
  },
  {
    id: 12720,
    name: 'Cuex',
    symbol: 'CUEX',
  },
  {
    id: 12722,
    name: 'Cryowar',
    symbol: 'CWAR',
  },
  {
    id: 12723,
    name: 'Astronaut (Polygon)',
    symbol: 'pNAUT',
  },
  {
    id: 12724,
    name: 'Soakmont',
    symbol: 'SOAK',
  },
  {
    id: 12725,
    name: 'Page',
    symbol: 'PAGE',
  },
  {
    id: 12726,
    name: 'Aegis Launchpad',
    symbol: 'AGSPAD',
  },
  {
    id: 12727,
    name: 'Doge Dash',
    symbol: 'DOGEDASH',
  },
  {
    id: 12728,
    name: 'Pulse Predictions Market',
    symbol: 'PULSE',
  },
  {
    id: 12729,
    name: 'Caash',
    symbol: 'CASH',
  },
  {
    id: 12730,
    name: 'ForceCowBoy',
    symbol: 'FCB',
  },
  {
    id: 12731,
    name: 'Ideanet Token',
    symbol: 'INET',
  },
  {
    id: 12732,
    name: 'Koinomo',
    symbol: 'KMO',
  },
  {
    id: 12733,
    name: 'RewardsCoin',
    symbol: 'RWSC',
  },
  {
    id: 12735,
    name: 'Piggy Finance',
    symbol: 'PIGGY',
  },
  {
    id: 12736,
    name: 'CRB Coin',
    symbol: 'CRB',
  },
  {
    id: 12737,
    name: 'Umi Digital',
    symbol: 'UMI',
  },
  {
    id: 12739,
    name: 'Revolotto',
    symbol: 'RVL',
  },
  {
    id: 12742,
    name: 'MagicDOGE',
    symbol: 'MAGICDOGE',
  },
  {
    id: 12743,
    name: 'ORE Network',
    symbol: 'ORE',
  },
  {
    id: 12744,
    name: 'XTime',
    symbol: 'XTM',
  },
  {
    id: 12746,
    name: 'Transaction Service fee',
    symbol: 'TSF',
  },
  {
    id: 12747,
    name: 'Reptilian Coin',
    symbol: 'RPTC',
  },
  {
    id: 12748,
    name: 'Fishy Tank Token',
    symbol: 'FTE',
  },
  {
    id: 12749,
    name: 'Nakamoto Games',
    symbol: 'NAKA',
  },
  {
    id: 12751,
    name: 'Blockchain Monster Hunt',
    symbol: 'BCMC',
  },
  {
    id: 12752,
    name: 'ORE Token',
    symbol: 'ORE',
  },
  {
    id: 12753,
    name: 'Solum',
    symbol: 'SOLUM',
  },
  {
    id: 12754,
    name: 'Revault Network',
    symbol: 'REVA',
  },
  {
    id: 12757,
    name: 'Worthwhile',
    symbol: 'WHE',
  },
  {
    id: 12758,
    name: 'Transient',
    symbol: 'TSCT',
  },
  {
    id: 12759,
    name: 'RetroCade',
    symbol: 'RC',
  },
  {
    id: 12760,
    name: 'Socean Staked Sol',
    symbol: 'SCNSOL',
  },
  {
    id: 12761,
    name: 'Angle',
    symbol: 'ANGLE',
  },
  {
    id: 12762,
    name: 'Crypto Soccer',
    symbol: 'CSC',
  },
  {
    id: 12763,
    name: 'BitANT',
    symbol: 'BITANT',
  },
  {
    id: 12764,
    name: 'KAINET',
    symbol: 'KAINET',
  },
  {
    id: 12765,
    name: 'Coffin Finance',
    symbol: 'COFFIN',
  },
  {
    id: 12766,
    name: 'Coffin Dollar',
    symbol: 'COUSD',
  },
  {
    id: 12767,
    name: 'FODL Finance',
    symbol: 'FODL',
  },
  {
    id: 12770,
    name: 'Floki Pup',
    symbol: 'FLOKIPUP',
  },
  {
    id: 12772,
    name: 'Derived',
    symbol: 'DVDX',
  },
  {
    id: 12773,
    name: 'DfiStarter',
    symbol: 'DFI',
  },
  {
    id: 12774,
    name: 'JetSwap pWings',
    symbol: 'pWINGS',
  },
  {
    id: 12775,
    name: 'Waste Digital Coin',
    symbol: 'WACO',
  },
  {
    id: 12776,
    name: 'TrGold',
    symbol: 'TRGO',
  },
  {
    id: 12778,
    name: 'Ojamu',
    symbol: 'OJA',
  },
  {
    id: 12780,
    name: 'French Connection Finance',
    symbol: 'FCF',
  },
  {
    id: 12784,
    name: 'Red Floki',
    symbol: 'REDFLOKI',
  },
  {
    id: 12788,
    name: 'DeathRoad',
    symbol: 'xDRACE',
  },
  {
    id: 12789,
    name: 'Tails',
    symbol: 'TAILS',
  },
  {
    id: 12790,
    name: 'Ethos Project',
    symbol: 'ETHOS',
  },
  {
    id: 12791,
    name: 'PocMon',
    symbol: 'MON',
  },
  {
    id: 12792,
    name: 'Nexus Crypto Services',
    symbol: '$NEXUS',
  },
  {
    id: 12796,
    name: 'ADA BOY',
    symbol: 'ADABOY',
  },
  {
    id: 12797,
    name: 'ShoeFy',
    symbol: 'SHOE',
  },
  {
    id: 12798,
    name: 'Duelist King',
    symbol: 'DKT',
  },
  {
    id: 12799,
    name: 'Internet of Energy Network',
    symbol: 'IOEN',
  },
  {
    id: 12800,
    name: 'Dogs Of Elon',
    symbol: 'DOE',
  },
  {
    id: 12802,
    name: 'Futura Finance',
    symbol: 'FFT',
  },
  {
    id: 12804,
    name: 'PokeDX',
    symbol: 'PDX',
  },
  {
    id: 12806,
    name: 'Metafish',
    symbol: 'FISH',
  },
  {
    id: 12807,
    name: 'DAOSquare',
    symbol: 'RICE',
  },
  {
    id: 12808,
    name: 'GameStar',
    symbol: 'GMS',
  },
  {
    id: 12812,
    name: 'Mind Music',
    symbol: 'MND',
  },
  {
    id: 12813,
    name: 'Sin City Metaverse',
    symbol: 'SIN',
  },
  {
    id: 12814,
    name: 'Dexsport',
    symbol: 'DESU',
  },
  {
    id: 12815,
    name: 'CryptoPlanes',
    symbol: 'CPAN',
  },
  {
    id: 12816,
    name: 'ownix',
    symbol: 'ONX',
  },
  {
    id: 12817,
    name: 'BabyHarmony',
    symbol: 'BABYHARMONY',
  },
  {
    id: 12818,
    name: 'gotEM',
    symbol: 'GOTEM',
  },
  {
    id: 12819,
    name: 'Squid Game Protocol',
    symbol: 'SGPRO',
  },
  {
    id: 12820,
    name: 'Treat DAO [new]',
    symbol: 'TREAT',
  },
  {
    id: 12821,
    name: 'DenDomains',
    symbol: 'DDN',
  },
  {
    id: 12824,
    name: 'Eutaria',
    symbol: 'EUT',
  },
  {
    id: 12825,
    name: 'Spinada.cash',
    symbol: 'SPIN',
  },
  {
    id: 12827,
    name: 'ScareCrow',
    symbol: 'SCARE',
  },
  {
    id: 12829,
    name: 'Binance8',
    symbol: 'B8',
  },
  {
    id: 12833,
    name: 'Mech Master',
    symbol: 'MECH',
  },
  {
    id: 12834,
    name: 'ENVOY',
    symbol: 'ENV',
  },
  {
    id: 12835,
    name: 'Falcon Swaps',
    symbol: 'FLNS',
  },
  {
    id: 12836,
    name: 'AutoCrypto',
    symbol: 'AU',
  },
  {
    id: 12838,
    name: 'Zeptacoin',
    symbol: 'ZPTC',
  },
  {
    id: 12839,
    name: 'Kintaman',
    symbol: 'KINTA',
  },
  {
    id: 12841,
    name: 'UpCake',
    symbol: 'UPC',
  },
  {
    id: 12843,
    name: 'Graphene',
    symbol: 'GFN',
  },
  {
    id: 12844,
    name: 'The Flash Currency',
    symbol: 'TFC',
  },
  {
    id: 12850,
    name: 'Coin To Fish',
    symbol: 'CTFT',
  },
  {
    id: 12851,
    name: 'BODA Token',
    symbol: 'BODAV2',
  },
  {
    id: 12852,
    name: 'BSC MemePad',
    symbol: 'BSCM',
  },
  {
    id: 12853,
    name: 'Protector Roge',
    symbol: 'PROGE',
  },
  {
    id: 12856,
    name: 'Spooky Inu',
    symbol: 'SPOOK',
  },
  {
    id: 12857,
    name: 'Baby DeFido',
    symbol: 'BabyDeFido',
  },
  {
    id: 12858,
    name: 'TIPINU',
    symbol: 'TIPINU',
  },
  {
    id: 12859,
    name: 'Dogebonk',
    symbol: 'DOBO',
  },
  {
    id: 12863,
    name: 'MY Ceremonial Event',
    symbol: 'MYCE',
  },
  {
    id: 12868,
    name: 'Pikachu Inu',
    symbol: 'PIKACHU',
  },
  {
    id: 12870,
    name: 'CocktailBar',
    symbol: 'COC',
  },
  {
    id: 12872,
    name: 'Kishimoto Inu',
    symbol: 'KISHIMOTO',
  },
  {
    id: 12873,
    name: 'Klima DAO',
    symbol: 'KLIMA',
  },
  {
    id: 12874,
    name: 'Almond',
    symbol: 'ALM',
  },
  {
    id: 12875,
    name: 'CrypterToken',
    symbol: 'CRYPT',
  },
  {
    id: 12876,
    name: 'Pitch Finance',
    symbol: 'PFT',
  },
  {
    id: 12877,
    name: 'Vault',
    symbol: 'VAULT',
  },
  {
    id: 12879,
    name: 'Clam Island',
    symbol: 'GEM',
  },
  {
    id: 12880,
    name: 'ELONBALLS',
    symbol: 'ELONBALLS',
  },
  {
    id: 12883,
    name: 'Chellitcoin',
    symbol: 'CHLT',
  },
  {
    id: 12886,
    name: 'bloXmove Token',
    symbol: 'BLXM',
  },
  {
    id: 12888,
    name: 'DoraemonInu',
    symbol: 'DORAEMONINU',
  },
  {
    id: 12889,
    name: 'Hundred Finance',
    symbol: 'HND',
  },
  {
    id: 12892,
    name: 'Legend of Fantasy War',
    symbol: 'LFW',
  },
  {
    id: 12893,
    name: 'The Monopolist',
    symbol: 'MONO',
  },
  {
    id: 12895,
    name: 'Lil Floki',
    symbol: 'LILFLOKI',
  },
  {
    id: 12896,
    name: 'Fit&Beat',
    symbol: 'FTB',
  },
  {
    id: 12897,
    name: 'Chimeras',
    symbol: 'CHIM',
  },
  {
    id: 12898,
    name: 'GooseFX',
    symbol: 'GOFX',
  },
  {
    id: 12899,
    name: 'InfinitX',
    symbol: 'INX',
  },
  {
    id: 12901,
    name: 'King Shiba',
    symbol: 'KINGSHIB',
  },
  {
    id: 12902,
    name: 'Persistence Staked XPRT',
    symbol: 'STKXPRT',
  },
  {
    id: 12903,
    name: 'Staked Olympus',
    symbol: 'SOHM',
  },
  {
    id: 12904,
    name: 'Wrapped Staked Olympus',
    symbol: 'WSOHM',
  },
  {
    id: 12906,
    name: 'KlayGames',
    symbol: 'KLAYG',
  },
  {
    id: 12907,
    name: 'Vires Finance',
    symbol: 'VIRES',
  },
  {
    id: 12909,
    name: 'Moby Dick',
    symbol: 'WOT',
  },
  {
    id: 12910,
    name: 'Virgo',
    symbol: 'VGO',
  },
  {
    id: 12911,
    name: 'LimeOdysseyM with ITAM',
    symbol: 'LOM',
  },
  {
    id: 12912,
    name: 'Digital Bank of Africa',
    symbol: 'DBA',
  },
  {
    id: 12913,
    name: 'DivineDAO',
    symbol: 'DIVINE',
  },
  {
    id: 12914,
    name: 'BEAVISANDBUTTHEAD',
    symbol: 'BBH',
  },
  {
    id: 12916,
    name: 'Underground Warriors',
    symbol: 'WP',
  },
  {
    id: 12917,
    name: 'SmartCoin (SMRT)',
    symbol: 'SMRT',
  },
  {
    id: 12918,
    name: 'pQBERT',
    symbol: 'PQBERT',
  },
  {
    id: 12919,
    name: 'Universal Basic Income',
    symbol: 'UBI',
  },
  {
    id: 12920,
    name: 'Nifty League',
    symbol: 'NFTL',
  },
  {
    id: 12924,
    name: 'XDoge Network',
    symbol: 'XDOGE',
  },
  {
    id: 12925,
    name: 'DesireNFT',
    symbol: 'DESIRE',
  },
  {
    id: 12926,
    name: 'Merkle Network',
    symbol: 'MERKLE',
  },
  {
    id: 12928,
    name: 'Pangolin Swap',
    symbol: 'PANGOLIN',
  },
  {
    id: 12929,
    name: 'ArtWallet',
    symbol: '1ART',
  },
  {
    id: 12932,
    name: 'Little Bunny Rocket',
    symbol: 'LBR',
  },
  {
    id: 12934,
    name: 'MosterIsland',
    symbol: 'MI',
  },
  {
    id: 12936,
    name: 'Gatsby Inu',
    symbol: 'GATSBYINU',
  },
  {
    id: 12937,
    name: 'CryptoPunt',
    symbol: 'PUN',
  },
  {
    id: 12938,
    name: 'CORE MultiChain',
    symbol: 'CMCX',
  },
  {
    id: 12940,
    name: 'RickMortyDoxx',
    symbol: 'RICKMORTYDOXX',
  },
  {
    id: 12941,
    name: 'Gogeta Inu',
    symbol: 'GOGETA',
  },
  {
    id: 12942,
    name: 'THORSwap',
    symbol: 'THOR',
  },
  {
    id: 12943,
    name: 'Naxar',
    symbol: 'NAXAR',
  },
  {
    id: 12944,
    name: 'ShibaWallet',
    symbol: 'SHWA',
  },
  {
    id: 12945,
    name: 'FesBNB',
    symbol: 'FESBNB',
  },
  {
    id: 12946,
    name: 'Eagle Vision',
    symbol: 'EVI',
  },
  {
    id: 12947,
    name: '8Bit Doge',
    symbol: 'BITD',
  },
  {
    id: 12949,
    name: 'Toucan Protocol: Base Carbon Tonne',
    symbol: 'BCT',
  },
  {
    id: 12950,
    name: 'OBToken',
    symbol: 'OBT',
  },
  {
    id: 12951,
    name: 'Riot Racers',
    symbol: 'RIOT',
  },
  {
    id: 12952,
    name: 'MetaverseX',
    symbol: 'METAX',
  },
  {
    id: 12953,
    name: 'MOVE Network',
    symbol: 'MOVD',
  },
  {
    id: 12954,
    name: 'Vetter Token',
    symbol: 'VETTER',
  },
  {
    id: 12955,
    name: 'BunnyRocket',
    symbol: 'BUNNYROCKET',
  },
  {
    id: 12956,
    name: 'Wanda Exchange',
    symbol: 'WE',
  },
  {
    id: 12957,
    name: 'Galactic Arena: The NFTverse',
    symbol: 'GAN',
  },
  {
    id: 12958,
    name: 'Nasa Doge',
    symbol: 'NASADOGE',
  },
  {
    id: 12959,
    name: 'Pontoon',
    symbol: 'TOON',
  },
  {
    id: 12960,
    name: 'Helkin',
    symbol: 'HK',
  },
  {
    id: 12961,
    name: 'BullionFx',
    symbol: 'BULL',
  },
  {
    id: 12962,
    name: 'Decentra-Lotto',
    symbol: 'DELO',
  },
  {
    id: 12963,
    name: 'FuruKuru',
    symbol: 'FUKU',
  },
  {
    id: 12964,
    name: 'Arbis Finance',
    symbol: 'ARBIS',
  },
  {
    id: 12965,
    name: 'Good Games Guild',
    symbol: 'GGG',
  },
  {
    id: 12966,
    name: 'BITGATTI',
    symbol: 'BITGATTI',
  },
  {
    id: 12967,
    name: 'GoldMiner',
    symbol: 'GM',
  },
  {
    id: 12970,
    name: 'AutoBitco Token',
    symbol: 'ABCO',
  },
  {
    id: 12971,
    name: 'Lunr Token',
    symbol: 'LUNR',
  },
  {
    id: 12972,
    name: 'DEUS Finance',
    symbol: 'DEUS',
  },
  {
    id: 12973,
    name: 'MicroPets',
    symbol: 'PETS',
  },
  {
    id: 12975,
    name: 'Centralex',
    symbol: 'CENX',
  },
  {
    id: 12977,
    name: 'Misty Inu',
    symbol: 'MISTY',
  },
  {
    id: 12978,
    name: 'Valkyrie Protocol',
    symbol: 'VKR',
  },
  {
    id: 12981,
    name: 'BHAX Token',
    symbol: 'BHAX',
  },
  {
    id: 12982,
    name: 'ByteDex',
    symbol: 'BEXT',
  },
  {
    id: 12983,
    name: 'Pawthereum',
    symbol: 'PAWTH',
  },
  {
    id: 12985,
    name: 'Money Tree',
    symbol: 'MONEY',
  },
  {
    id: 12986,
    name: 'Billion Token',
    symbol: 'BLL',
  },
  {
    id: 12987,
    name: 'SatoshiStreetBets Token',
    symbol: 'SSB',
  },
  {
    id: 12990,
    name: 'Cosmic Music',
    symbol: 'CSMC',
  },
  {
    id: 12991,
    name: 'MagnetGold',
    symbol: 'MTG',
  },
  {
    id: 12993,
    name: 'Kuro Shiba',
    symbol: 'KURO',
  },
  {
    id: 12996,
    name: 'FastSwap (BSC)',
    symbol: 'FAST',
  },
  {
    id: 12997,
    name: 'Fuma Finance',
    symbol: 'FUMA',
  },
  {
    id: 12998,
    name: 'Trade Fighter',
    symbol: 'TDF',
  },
  {
    id: 12999,
    name: 'SSV Network',
    symbol: 'SSV',
  },
  {
    id: 13000,
    name: 'Chain',
    symbol: 'CHN',
  },
  {
    id: 13002,
    name: 'Metaseer',
    symbol: 'METAS',
  },
  {
    id: 13005,
    name: 'BNPL Pay',
    symbol: 'BNPL',
  },
  {
    id: 13006,
    name: 'BitAU',
    symbol: 'BAU',
  },
  {
    id: 13009,
    name: 'ITSMYNE',
    symbol: 'MYNE',
  },
  {
    id: 13014,
    name: 'DotOracle',
    symbol: 'DTO',
  },
  {
    id: 13015,
    name: 'Kawakami',
    symbol: 'XKAWA',
  },
  {
    id: 13019,
    name: 'Kitty',
    symbol: 'KIT',
  },
  {
    id: 13020,
    name: 'Flare Token',
    symbol: '1FLR',
  },
  {
    id: 13021,
    name: 'Moola Market',
    symbol: 'MOO',
  },
  {
    id: 13022,
    name: 'Squidanomics',
    symbol: 'SQUID',
  },
  {
    id: 13025,
    name: 'zilSurvey',
    symbol: 'SRV',
  },
  {
    id: 13026,
    name: 'FOHO Coin',
    symbol: 'FOHO',
  },
  {
    id: 13027,
    name: 'Crypto Tankz',
    symbol: 'TANKZ',
  },
  {
    id: 13030,
    name: 'Pegaxy',
    symbol: 'PGX',
  },
  {
    id: 13031,
    name: 'Blastoise Inu',
    symbol: 'BLAST',
  },
  {
    id: 13032,
    name: 'Axienomics',
    symbol: 'AXIN',
  },
  {
    id: 13033,
    name: 'Nucleus',
    symbol: 'NUCLEUS',
  },
  {
    id: 13034,
    name: 'DogemonGo Solana',
    symbol: 'DOGO',
  },
  {
    id: 13035,
    name: 'HyperBoost',
    symbol: 'HYPERBOOST',
  },
  {
    id: 13036,
    name: 'Etherrock#72',
    symbol: 'PEBBLE',
  },
  {
    id: 13037,
    name: 'Magic',
    symbol: 'MAGIC',
  },
  {
    id: 13038,
    name: 'StarLaunch',
    symbol: 'STARS',
  },
  {
    id: 13040,
    name: 'Dopple Finance',
    symbol: 'DOPX',
  },
  {
    id: 13041,
    name: 'Solarbeam',
    symbol: 'SOLAR',
  },
  {
    id: 13045,
    name: 'Heron Asia',
    symbol: 'HERON',
  },
  {
    id: 13046,
    name: 'Gallant',
    symbol: 'GAL',
  },
  {
    id: 13047,
    name: 'Piccolo Inu',
    symbol: 'PINU',
  },
  {
    id: 13048,
    name: 'The Troller Coin',
    symbol: 'TROLLER',
  },
  {
    id: 13051,
    name: 'DEPO',
    symbol: 'DEPO',
  },
  {
    id: 13064,
    name: 'CorgiNFTGame',
    symbol: 'COR',
  },
  {
    id: 13068,
    name: 'COGIVERSE',
    symbol: 'COGI',
  },
  {
    id: 13069,
    name: 'Rush DeFi',
    symbol: 'RUSH',
  },
  {
    id: 13071,
    name: 'SquidGameToken',
    symbol: 'SGT',
  },
  {
    id: 13074,
    name: 'Baby Moon Floki',
    symbol: 'FLOKI',
  },
  {
    id: 13075,
    name: 'Smartpayment',
    symbol: 'SPAY',
  },
  {
    id: 13076,
    name: 'Saja',
    symbol: 'SAJA',
  },
  {
    id: 13077,
    name: 'Somax',
    symbol: 'SMX',
  },
  {
    id: 13078,
    name: 'DogeZilla',
    symbol: 'DOGEZILLA',
  },
  {
    id: 13079,
    name: 'Shibanomics',
    symbol: 'SHIBIN',
  },
  {
    id: 13080,
    name: 'Token dForce USD',
    symbol: 'USX',
  },
  {
    id: 13105,
    name: 'MetaWars',
    symbol: 'WARS',
  },
  {
    id: 13106,
    name: 'Cougar',
    symbol: 'CGS',
  },
  {
    id: 13111,
    name: 'HoneyBee',
    symbol: 'BEE',
  },
  {
    id: 13118,
    name: 'Yoshi.exchange',
    symbol: 'YOSHI',
  },
  {
    id: 13119,
    name: 'Wolf Safe Poor People (Polygon)',
    symbol: 'WSPP',
  },
  {
    id: 13121,
    name: 'Atlantis Loans',
    symbol: 'ATL',
  },
  {
    id: 13123,
    name: 'Summit Defi',
    symbol: 'SUMMIT',
  },
  {
    id: 13124,
    name: 'FREEMOON',
    symbol: 'FREEMOON',
  },
  {
    id: 13126,
    name: 'Shillit App',
    symbol: 'SHILL',
  },
  {
    id: 13127,
    name: 'Safechaintoken',
    symbol: 'SCT',
  },
  {
    id: 13133,
    name: 'Decentral Games ICE',
    symbol: 'ICE',
  },
  {
    id: 13134,
    name: 'FlavorsBSC',
    symbol: 'FLVR',
  },
  {
    id: 13135,
    name: 'Ariadne',
    symbol: 'ARDN',
  },
  {
    id: 13136,
    name: 'Kitty Inu',
    symbol: 'KITTY',
  },
  {
    id: 13137,
    name: 'Genshin Impact Token',
    symbol: 'GenIm',
  },
  {
    id: 13142,
    name: 'BTRIPS',
    symbol: 'BTR',
  },
  {
    id: 13143,
    name: 'Oh! Finance',
    symbol: 'OH',
  },
  {
    id: 13157,
    name: 'PolkaPets',
    symbol: 'PETS',
  },
  {
    id: 13163,
    name: 'Pluton Chain',
    symbol: 'PLC',
  },
  {
    id: 13164,
    name: 'HeroFi (ROFI)',
    symbol: 'ROFI',
  },
  {
    id: 13167,
    name: 'Mimir Token',
    symbol: 'MIMIR',
  },
  {
    id: 13175,
    name: 'pSTAKE Staked ATOM',
    symbol: 'STKATOM',
  },
  {
    id: 13177,
    name: 'KOKA INU',
    symbol: 'INU',
  },
  {
    id: 13182,
    name: 'miniSHIB',
    symbol: 'MINISHIB',
  },
  {
    id: 13187,
    name: 'InfinityPad',
    symbol: 'INFP',
  },
  {
    id: 13190,
    name: 'MiniFlokiADA',
    symbol: 'MFLOKIADA',
  },
  {
    id: 13191,
    name: 'BabyBanana',
    symbol: 'BBNANA',
  },
  {
    id: 13194,
    name: 'Gold Sonic',
    symbol: 'GSONIC',
  },
  {
    id: 13197,
    name: 'KnoxEdge',
    symbol: 'KNX',
  },
  {
    id: 13202,
    name: 'Zodiacs',
    symbol: 'ZDC',
  },
  {
    id: 13204,
    name: 'Wraith Protocol',
    symbol: 'WRAITH',
  },
  {
    id: 13205,
    name: 'Ashera',
    symbol: 'ASH',
  },
  {
    id: 13206,
    name: 'CryptoWar xBlade',
    symbol: 'XBLADE',
  },
  {
    id: 13207,
    name: 'BITCOIN INTERNATIONAL',
    symbol: 'BTCI',
  },
  {
    id: 13211,
    name: 'Algebra',
    symbol: 'ALGB',
  },
  {
    id: 13212,
    name: 'Ethera',
    symbol: 'ETA',
  },
  {
    id: 13213,
    name: 'Horny Doge',
    symbol: 'HORNY',
  },
  {
    id: 13214,
    name: 'Earnable v2',
    symbol: 'EARN',
  },
  {
    id: 13215,
    name: 'AutoMatic Network',
    symbol: 'AUMI',
  },
  {
    id: 13216,
    name: 'Ninneko',
    symbol: 'NINO',
  },
  {
    id: 13217,
    name: 'ONE PIECE',
    symbol: 'ONEPIECE',
  },
  {
    id: 13229,
    name: 'PaintSwap',
    symbol: 'BRUSH',
  },
  {
    id: 13230,
    name: 'JERITEX',
    symbol: 'JRIT',
  },
  {
    id: 13231,
    name: 'Charizard Inu',
    symbol: 'CHARIZARD',
  },
  {
    id: 13233,
    name: 'Nausicaa-Inu',
    symbol: 'NAUSICAA',
  },
  {
    id: 13235,
    name: 'Greed',
    symbol: 'GREED',
  },
  {
    id: 13237,
    name: 'FantomStarter',
    symbol: 'FS',
  },
  {
    id: 13239,
    name: 'PEANUTS',
    symbol: 'PEANUTS',
  },
  {
    id: 13241,
    name: 'Tsuzuki Inu',
    symbol: 'TZKI',
  },
  {
    id: 13243,
    name: 'FoxGirl',
    symbol: 'FOXGIRL',
  },
  {
    id: 13244,
    name: 'Beethoven X',
    symbol: 'BEETS',
  },
  {
    id: 13245,
    name: 'Yukon',
    symbol: '$YUKON',
  },
  {
    id: 13246,
    name: 'Liquid Driver',
    symbol: 'LQDR',
  },
  {
    id: 13247,
    name: 'JustYours',
    symbol: 'JUST',
  },
  {
    id: 13249,
    name: 'Plug Chain',
    symbol: 'PLUGCN',
  },
  {
    id: 13250,
    name: 'Velhalla',
    symbol: 'SCAR',
  },
  {
    id: 13251,
    name: 'CryptoXpress',
    symbol: 'XPRESS',
  },
  {
    id: 13252,
    name: 'WOLVERINU',
    symbol: 'WOLVERINU',
  },
  {
    id: 13254,
    name: 'DefiSportsCoin',
    symbol: 'DSC',
  },
  {
    id: 13255,
    name: 'Defactor',
    symbol: 'FACTR',
  },
  {
    id: 13256,
    name: 'Flokimooni',
    symbol: 'FLOKIM',
  },
  {
    id: 13265,
    name: 'Fidira',
    symbol: 'FID',
  },
  {
    id: 13267,
    name: 'No one',
    symbol: 'NOONE',
  },
  {
    id: 13269,
    name: 'Dexigas',
    symbol: 'DXG',
  },
  {
    id: 13270,
    name: 'Chiva Token',
    symbol: 'CHIV',
  },
  {
    id: 13271,
    name: 'Quartz',
    symbol: 'QUARTZ',
  },
  {
    id: 13273,
    name: 'OKTPlay',
    symbol: 'OKTP',
  },
  {
    id: 13274,
    name: 'Gamebox',
    symbol: 'GAMEBOX',
  },
  {
    id: 13276,
    name: 'Squid Game',
    symbol: 'SQUID',
  },
  {
    id: 13277,
    name: 'UNIFEES',
    symbol: 'FEES',
  },
  {
    id: 13280,
    name: 'FatCake',
    symbol: 'FATCAKE',
  },
  {
    id: 13281,
    name: 'ZilStream',
    symbol: 'STREAM',
  },
  {
    id: 13283,
    name: 'Verify Token',
    symbol: 'VFY',
  },
  {
    id: 13286,
    name: 'CorgiCoin',
    symbol: 'CORGI',
  },
  {
    id: 13308,
    name: 'Carbon',
    symbol: 'CARB',
  },
  {
    id: 13313,
    name: 'Shiboki',
    symbol: 'SHIBOKI',
  },
  {
    id: 13319,
    name: 'Flamengo Fan Token',
    symbol: 'MENGO',
  },
  {
    id: 13320,
    name: 'ZilWall Paint',
    symbol: 'ZPAINT',
  },
  {
    id: 13322,
    name: 'DuckDuck',
    symbol: 'DUCK',
  },
  {
    id: 13325,
    name: 'ZilWall',
    symbol: 'ZWALL',
  },
  {
    id: 13326,
    name: 'RBX',
    symbol: 'RBX',
  },
  {
    id: 13327,
    name: 'Nevada',
    symbol: 'NEVADA',
  },
  {
    id: 13328,
    name: 'Sparda Wallet',
    symbol: 'SPW',
  },
  {
    id: 13329,
    name: 'PELE Network',
    symbol: 'PELE',
  },
  {
    id: 13330,
    name: 'Beach Token BSC',
    symbol: 'BEACH',
  },
  {
    id: 13331,
    name: 'FantomMoon',
    symbol: 'FMF',
  },
  {
    id: 13332,
    name: 'COFFE Multichain',
    symbol: 'CFF',
  },
  {
    id: 13333,
    name: 'NFT Global',
    symbol: 'NFTG',
  },
  {
    id: 13334,
    name: 'SaitamaX',
    symbol: 'SAITAX',
  },
  {
    id: 13336,
    name: 'Newsolution2.0',
    symbol: 'NSTE',
  },
  {
    id: 13337,
    name: 'MMScash',
    symbol: 'MCASH',
  },
  {
    id: 13340,
    name: 'SoldiersLand',
    symbol: 'SLD',
  },
  {
    id: 13341,
    name: 'NIFTY DeFi Protocol',
    symbol: 'NFTY',
  },
  {
    id: 13343,
    name: 'LandOrc',
    symbol: 'LORC',
  },
  {
    id: 13351,
    name: 'ADACash',
    symbol: 'ADACASH',
  },
  {
    id: 13352,
    name: 'Dinger Token',
    symbol: 'DINGER',
  },
  {
    id: 13355,
    name: 'EvoCardano',
    symbol: 'EVOC',
  },
  {
    id: 13356,
    name: 'WiseAvax',
    symbol: 'WISE',
  },
  {
    id: 13357,
    name: 'COBAN',
    symbol: 'COBAN',
  },
  {
    id: 13358,
    name: 'Kalamint',
    symbol: 'KALAM',
  },
  {
    id: 13359,
    name: 'Monster Grand Prix Token',
    symbol: 'MGPX',
  },
  {
    id: 13361,
    name: 'Sulgecoin',
    symbol: 'SUG',
  },
  {
    id: 13362,
    name: 'Elonomics',
    symbol: '$ELONOM',
  },
  {
    id: 13367,
    name: 'Ultimate Nft',
    symbol: 'UNFT',
  },
  {
    id: 13368,
    name: 'PicArtNFT',
    symbol: 'PANFT',
  },
  {
    id: 13369,
    name: 'Mason Token',
    symbol: 'MASON',
  },
  {
    id: 13370,
    name: 'Salem Finance',
    symbol: 'SALEM',
  },
  {
    id: 13371,
    name: 'IceCubes Finance',
    symbol: 'ICUBE',
  },
  {
    id: 13372,
    name: 'Damn Token',
    symbol: 'DAMN',
  },
  {
    id: 13373,
    name: 'Hoodler',
    symbol: 'HOOD',
  },
  {
    id: 13374,
    name: 'MOONGAME',
    symbol: 'MGT',
  },
  {
    id: 13375,
    name: 'ROTTSCHILD',
    symbol: 'ROTTS',
  },
  {
    id: 13376,
    name: 'Coinracer',
    symbol: 'CRACE',
  },
  {
    id: 13382,
    name: 'Zombie Inu',
    symbol: 'ZINU',
  },
  {
    id: 13383,
    name: 'CropBytes',
    symbol: 'CBX',
  },
  {
    id: 13384,
    name: 'Sakata Inu',
    symbol: 'SAKATA',
  },
  {
    id: 13385,
    name: 'Rekt',
    symbol: 'RKT',
  },
  {
    id: 13386,
    name: 'Akamaru Inu',
    symbol: 'AKAMARU',
  },
  {
    id: 13392,
    name: 'Nerdy Inu',
    symbol: 'NERDY',
  },
  {
    id: 13395,
    name: 'Island Inu',
    symbol: 'ISLAINU',
  },
  {
    id: 13399,
    name: 'BrandPad Finance',
    symbol: 'BRAND',
  },
  {
    id: 13403,
    name: 'Howl City',
    symbol: 'HWL',
  },
  {
    id: 13407,
    name: 'Soltato FRIES',
    symbol: 'FRIES',
  },
  {
    id: 13409,
    name: 'Teto Inu',
    symbol: 'TETOINU',
  },
  {
    id: 13410,
    name: 'KuramaInu',
    symbol: 'KUNU',
  },
  {
    id: 13411,
    name: 'Titan Hunters',
    symbol: 'TITA',
  },
  {
    id: 13412,
    name: 'GreenMoonZilla',
    symbol: 'GRMZilla',
  },
  {
    id: 13414,
    name: 'JoJo Inu',
    symbol: 'JOJO',
  },
  {
    id: 13415,
    name: 'Gummy Bull Token',
    symbol: 'GUMMY',
  },
  {
    id: 13416,
    name: 'Eco DeFi',
    symbol: 'ECOP',
  },
  {
    id: 13418,
    name: 'Doge Army Token',
    symbol: 'DGAT',
  },
  {
    id: 13419,
    name: 'Pizza Pug Coin',
    symbol: 'PPUG',
  },
  {
    id: 13420,
    name: 'PlaceWar',
    symbol: 'PLACE',
  },
  {
    id: 13423,
    name: 'Baby Floki Doge',
    symbol: 'BABYFD',
  },
  {
    id: 13424,
    name: 'Eiichiro Oda Inu',
    symbol: 'ODA',
  },
  {
    id: 13425,
    name: 'NFT Champions',
    symbol: 'CHAMP',
  },
  {
    id: 13426,
    name: 'Pixl Coin',
    symbol: 'PXLC',
  },
  {
    id: 13427,
    name: 'CoinMooner',
    symbol: 'MOONER',
  },
  {
    id: 13428,
    name: 'MetaDubai',
    symbol: 'MDB',
  },
  {
    id: 13429,
    name: 'Doge Floki Coin',
    symbol: 'DOFI',
  },
  {
    id: 13430,
    name: 'Metti Inu',
    symbol: 'METTI',
  },
  {
    id: 13431,
    name: 'Agricoin',
    symbol: 'AGX',
  },
  {
    id: 13432,
    name: 'DRIVENx',
    symbol: 'DVX',
  },
  {
    id: 13433,
    name: 'LovePot Token',
    symbol: 'LOVE',
  },
  {
    id: 13434,
    name: 'Solex Finance',
    symbol: 'SLX',
  },
  {
    id: 13435,
    name: 'Nfans',
    symbol: 'NFS',
  },
  {
    id: 13436,
    name: 'Elite 1337',
    symbol: 'ELITE',
  },
  {
    id: 13437,
    name: 'Kiba Inu',
    symbol: 'KIBA',
  },
  {
    id: 13439,
    name: 'CashCow',
    symbol: 'COW',
  },
  {
    id: 13446,
    name: 'Idle Cyber',
    symbol: 'AFK',
  },
  {
    id: 13449,
    name: 'GameStation',
    symbol: 'GAMER',
  },
  {
    id: 13451,
    name: 'DarkMagick',
    symbol: 'DMGK',
  },
  {
    id: 13453,
    name: 'Waifer',
    symbol: 'WAIFER',
  },
  {
    id: 13465,
    name: 'Altbase',
    symbol: 'ALTB',
  },
  {
    id: 13466,
    name: 'The Seed Farm',
    symbol: 'SEED',
  },
  {
    id: 13467,
    name: 'PancakePoll',
    symbol: 'PPOLL',
  },
  {
    id: 13470,
    name: 'Ghostface Shiba',
    symbol: 'GFSHIB',
  },
  {
    id: 13471,
    name: 'Omni Consumer Protocols',
    symbol: 'OCP',
  },
  {
    id: 13472,
    name: 'XDEFI Wallet',
    symbol: 'XDEFI',
  },
  {
    id: 13473,
    name: 'Apricot Finance',
    symbol: 'APT',
  },
  {
    id: 13474,
    name: 'Floki Elon',
    symbol: 'FLOKIELON',
  },
  {
    id: 13477,
    name: 'Mewtwo Inu',
    symbol: 'MEWTWO',
  },
  {
    id: 13478,
    name: 'Jpaw Inu',
    symbol: 'JPAW',
  },
  {
    id: 13480,
    name: 'Polaris',
    symbol: 'POLARIS',
  },
  {
    id: 13485,
    name: 'Smarty Pay',
    symbol: 'SPY',
  },
  {
    id: 13493,
    name: 'Wanaka Farm WAIRERE Token',
    symbol: 'WAI',
  },
  {
    id: 13494,
    name: 'PolyGamma Finance',
    symbol: 'GAMMA',
  },
  {
    id: 13497,
    name: 'Navigator',
    symbol: 'NTTC',
  },
  {
    id: 13503,
    name: 'Town Star',
    symbol: 'TOWN',
  },
  {
    id: 13505,
    name: 'Pigeonsol',
    symbol: 'PGNT',
  },
  {
    id: 13507,
    name: 'Degen Arts',
    symbol: 'DAC',
  },
  {
    id: 13508,
    name: 'Bishu Finance',
    symbol: 'BISHUFI',
  },
  {
    id: 13509,
    name: 'Mytheria',
    symbol: 'MYRA',
  },
  {
    id: 13510,
    name: 'KakashiInuV2',
    symbol: 'KKI',
  },
  {
    id: 13513,
    name: 'GOLDMONEY',
    symbol: 'GDM',
  },
  {
    id: 13514,
    name: 'Only Hype Token',
    symbol: 'OHT',
  },
  {
    id: 13516,
    name: 'Rocket Raccoon',
    symbol: 'RON',
  },
  {
    id: 13518,
    name: 'Ethereans',
    symbol: 'OS',
  },
  {
    id: 13519,
    name: 'HELLMOON',
    symbol: 'HMOON',
  },
  {
    id: 13521,
    name: 'Numbers Protocol',
    symbol: 'NUM',
  },
  {
    id: 13522,
    name: 'Bouje Token',
    symbol: 'BOUJE',
  },
  {
    id: 13523,
    name: 'Merit Circle',
    symbol: 'MC',
  },
  {
    id: 13524,
    name: 'Solend',
    symbol: 'SLND',
  },
  {
    id: 13528,
    name: 'Idle Mystic',
    symbol: 'MST',
  },
  {
    id: 13529,
    name: 'Zenith Token',
    symbol: 'ZENX',
  },
  {
    id: 13531,
    name: 'Keeps Coin',
    symbol: 'KPC',
  },
  {
    id: 13532,
    name: 'xDollar',
    symbol: 'XDO',
  },
  {
    id: 13534,
    name: 'xDollar Stablecoin',
    symbol: 'XUSD',
  },
  {
    id: 13536,
    name: 'ShibaZilla',
    symbol: 'SHIBZ',
  },
  {
    id: 13538,
    name: 'Shibboo Inu',
    symbol: 'SHIBBOO',
  },
  {
    id: 13540,
    name: 'Tsukiverse:Galactic Adventures',
    symbol: 'TSUGA',
  },
  {
    id: 13541,
    name: 'Seadog Metaverse',
    symbol: 'SEADOG',
  },
  {
    id: 13542,
    name: 'Stabledoc',
    symbol: 'SDT',
  },
  {
    id: 13543,
    name: 'Bamboo Coin',
    symbol: 'BMBO',
  },
  {
    id: 13546,
    name: 'BabyDogeZilla',
    symbol: 'BABYDOGEZILLA',
  },
  {
    id: 13550,
    name: 'TitsV2',
    symbol: 'TITS',
  },
  {
    id: 13559,
    name: 'Godzilla',
    symbol: 'GODZ',
  },
  {
    id: 13560,
    name: 'ShibaZilla',
    symbol: 'SHIBAZILLA',
  },
  {
    id: 13565,
    name: 'My Shiba Academia',
    symbol: 'MSA',
  },
  {
    id: 13566,
    name: 'Top Cat inu',
    symbol: 'TCAT',
  },
  {
    id: 13567,
    name: 'SmarterCoin (SMRTr)',
    symbol: 'SMRTR',
  },
  {
    id: 13570,
    name: 'blockWRK',
    symbol: 'WRK',
  },
  {
    id: 13574,
    name: 'Neos Credits',
    symbol: 'NCR',
  },
  {
    id: 13576,
    name: 'Kitty Coin',
    symbol: 'KITTY',
  },
  {
    id: 13577,
    name: 'Moar Finance',
    symbol: 'MOAR',
  },
  {
    id: 13578,
    name: 'Ponyo-Inu',
    symbol: 'PONYO',
  },
  {
    id: 13579,
    name: 'Shiba Watch',
    symbol: 'SHIBAW',
  },
  {
    id: 13580,
    name: 'MommyUSDT',
    symbol: 'MOMMYUSDT',
  },
  {
    id: 13581,
    name: 'GloryDoge',
    symbol: 'GLORYD',
  },
  {
    id: 13588,
    name: 'Zeno Inu',
    symbol: 'ZENO',
  },
  {
    id: 13593,
    name: 'Kiba',
    symbol: 'KIBA',
  },
  {
    id: 13597,
    name: 'MINI SAFEMOON INU',
    symbol: 'MSMI',
  },
  {
    id: 13598,
    name: 'CryptoBay',
    symbol: 'BAY',
  },
  {
    id: 13600,
    name: 'Decentralized Reit',
    symbol: 'DRT',
  },
  {
    id: 13602,
    name: 'YoHero',
    symbol: 'YO',
  },
  {
    id: 13605,
    name: 'MetaCat',
    symbol: 'METACAT',
  },
  {
    id: 13606,
    name: 'Great Bounty Dealer',
    symbol: 'GBD',
  },
  {
    id: 13609,
    name: 'Ghospers Game',
    symbol: 'GHSPR',
  },
  {
    id: 13610,
    name: 'DogeKongZilla',
    symbol: 'DOGEKONGZILLA',
  },
  {
    id: 13611,
    name: 'MetaPlay',
    symbol: 'MPLAY',
  },
  {
    id: 13614,
    name: 'EverFight',
    symbol: 'EF',
  },
  {
    id: 13615,
    name: 'Mystic Warrior',
    symbol: 'MYSTIC',
  },
  {
    id: 13618,
    name: 'Shiba Girlfriend',
    symbol: 'SHIBGF',
  },
  {
    id: 13619,
    name: 'Spooky Shiba',
    symbol: 'SPOOKYSHIBA',
  },
  {
    id: 13620,
    name: 'SquidDao',
    symbol: 'SQUID',
  },
  {
    id: 13623,
    name: 'PolyUnity Finance',
    symbol: 'UNITY',
  },
  {
    id: 13624,
    name: 'Tractor Joe',
    symbol: 'TRACTOR',
  },
  {
    id: 13626,
    name: 'ACA Token',
    symbol: 'ACA',
  },
  {
    id: 13627,
    name: 'PumpShibaX',
    symbol: 'PSHIBAX',
  },
  {
    id: 13629,
    name: 'Fantom Cake',
    symbol: 'FATCAKE',
  },
  {
    id: 13630,
    name: 'OOGI',
    symbol: 'OOGI',
  },
  {
    id: 13632,
    name: 'Genopets',
    symbol: 'GENE',
  },
  {
    id: 13633,
    name: 'Luna-Pad',
    symbol: 'LUNAPAD',
  },
  {
    id: 13634,
    name: 'SHIBORG INU',
    symbol: 'SHIBORG',
  },
  {
    id: 13635,
    name: 'AlgoPad',
    symbol: 'ALGOPAD',
  },
  {
    id: 13636,
    name: 'GMCoin',
    symbol: 'GMCOIN',
  },
  {
    id: 13637,
    name: 'XRdoge',
    symbol: 'XRDOGE',
  },
  {
    id: 13638,
    name: 'Flokimars',
    symbol: 'FLOM',
  },
  {
    id: 13639,
    name: 'MemeCoin Factory',
    symbol: 'FACTORY',
  },
  {
    id: 13640,
    name: 'Shibosu',
    symbol: 'SHIBOSU',
  },
  {
    id: 13641,
    name: 'PulseDoge',
    symbol: 'PULSEDOGE',
  },
  {
    id: 13642,
    name: 'Exodia',
    symbol: 'EXOD',
  },
  {
    id: 13643,
    name: 'ChilliSwap',
    symbol: 'CHLI',
  },
  {
    id: 13644,
    name: 'Arrb Token',
    symbol: 'ARRB',
  },
  {
    id: 13646,
    name: 'Booster',
    symbol: 'BOOST',
  },
  {
    id: 13649,
    name: 'Energy8',
    symbol: 'E8',
  },
  {
    id: 13651,
    name: 'BABY WHITE HAMSTER',
    symbol: 'BWH',
  },
  {
    id: 13652,
    name: 'NFT ROYAL TOKEN',
    symbol: 'NRT',
  },
  {
    id: 13654,
    name: 'Cats Claw',
    symbol: 'CLAW',
  },
  {
    id: 13655,
    name: 'Crabada',
    symbol: 'CRA',
  },
  {
    id: 13656,
    name: 'JACYWAYA',
    symbol: 'JACY',
  },
  {
    id: 13657,
    name: 'MemeWars',
    symbol: 'MWAR',
  },
  {
    id: 13659,
    name: 'Crypto Gaming United',
    symbol: 'CGU',
  },
  {
    id: 13661,
    name: 'Fozeus Coin',
    symbol: 'FZS',
  },
  {
    id: 13662,
    name: 'Mini Saitama',
    symbol: 'MINISAITAMA',
  },
  {
    id: 13663,
    name: 'Gains Network',
    symbol: 'GNS',
  },
  {
    id: 13664,
    name: 'MicroDexWallet',
    symbol: 'MICRO',
  },
  {
    id: 13667,
    name: 'POLYX',
    symbol: 'PXT',
  },
  {
    id: 13668,
    name: 'Ninja Fantasy Token',
    symbol: 'NFS',
  },
  {
    id: 13671,
    name: 'DogeMan',
    symbol: 'DGMAN',
  },
  {
    id: 13676,
    name: 'BLOCKS',
    symbol: 'BLOCKS',
  },
  {
    id: 13677,
    name: 'Shibanomi',
    symbol: 'SHIO',
  },
  {
    id: 13679,
    name: 'Egyptian Mau',
    symbol: 'MAU',
  },
  {
    id: 13684,
    name: 'Mirai',
    symbol: 'MIRAI',
  },
  {
    id: 13687,
    name: 'Saint Inu',
    symbol: 'SAINT',
  },
  {
    id: 13691,
    name: 'Artverse Token',
    symbol: 'AVT',
  },
  {
    id: 13696,
    name: 'MarsX',
    symbol: 'MX',
  },
  {
    id: 13702,
    name: 'STEMX',
    symbol: 'STEMX',
  },
  {
    id: 13704,
    name: 'Rocket Shib',
    symbol: 'ROCKETSHIB',
  },
  {
    id: 13707,
    name: 'Disco Burn Token',
    symbol: 'DBT',
  },
  {
    id: 13708,
    name: 'BFK Warzone',
    symbol: 'BFK',
  },
  {
    id: 13710,
    name: 'Hero Floki',
    symbol: 'HERO',
  },
  {
    id: 13711,
    name: 'IDM Token',
    symbol: 'IDM',
  },
  {
    id: 13713,
    name: 'Meta Floki',
    symbol: 'MFLOKI',
  },
  {
    id: 13714,
    name: 'UltraChad',
    symbol: 'UCHAD',
  },
  {
    id: 13716,
    name: 'Sea Token',
    symbol: 'SEA',
  },
  {
    id: 13717,
    name: 'miniKishimoto Inu',
    symbol: 'MINIKISHIMOTO',
  },
  {
    id: 13718,
    name: 'GAMINGDOGE',
    symbol: 'GAMINGDOGE',
  },
  {
    id: 13719,
    name: 'Otium Tech',
    symbol: 'OTIUM',
  },
  {
    id: 13720,
    name: 'Leafty',
    symbol: 'LEAFTY',
  },
  {
    id: 13721,
    name: 'NovaXSolar',
    symbol: 'XSLR',
  },
  {
    id: 13725,
    name: 'LlamaSwap',
    symbol: 'LAMA',
  },
  {
    id: 13726,
    name: 'ENNO Cash',
    symbol: 'ENNO',
  },
  {
    id: 13727,
    name: 'Shiryo-Inu',
    symbol: 'SHIRYO-INU',
  },
  {
    id: 13728,
    name: 'Sola Ninja',
    symbol: 'SNJ',
  },
  {
    id: 13729,
    name: 'Sadbaby',
    symbol: 'SDBY',
  },
  {
    id: 13730,
    name: 'Boom Shiba',
    symbol: 'BOOMSHIBA',
  },
  {
    id: 13732,
    name: 'Rugpull Prevention',
    symbol: 'RUGPULL',
  },
  {
    id: 13733,
    name: 'Meta Cat',
    symbol: 'MCAT',
  },
  {
    id: 13734,
    name: 'Olympus Inu Dao',
    symbol: 'OHMINU',
  },
  {
    id: 13735,
    name: 'SolDoge',
    symbol: 'SDOGE',
  },
  {
    id: 13736,
    name: 'Boorio',
    symbol: 'ORIO',
  },
  {
    id: 13739,
    name: 'Corsac',
    symbol: 'CSCT',
  },
  {
    id: 13742,
    name: 'Stabilize Token',
    symbol: 'SET',
  },
  {
    id: 13743,
    name: 'TaiChi',
    symbol: 'TAC',
  },
  {
    id: 13744,
    name: 'Stabilize USD',
    symbol: 'SUSD',
  },
  {
    id: 13746,
    name: 'FLOOF',
    symbol: 'FLOOF',
  },
  {
    id: 13747,
    name: 'Ryoshimoto',
    symbol: 'RYOSHIMOTO',
  },
  {
    id: 13748,
    name: 'Spartacus',
    symbol: 'SPA',
  },
  {
    id: 13749,
    name: 'BabyXape',
    symbol: 'BABYX',
  },
  {
    id: 13751,
    name: 'Liquid Collectibles',
    symbol: 'LICO',
  },
  {
    id: 13752,
    name: 'Baby Floki Up',
    symbol: 'BFU',
  },
  {
    id: 13753,
    name: 'Drachma',
    symbol: 'DRA',
  },
  {
    id: 13754,
    name: 'JUSTFARM',
    symbol: 'JFM',
  },
  {
    id: 13755,
    name: 'CardanoEvo',
    symbol: 'CEVO',
  },
  {
    id: 13757,
    name: 'Sakura Neko',
    symbol: 'NEKO',
  },
  {
    id: 13760,
    name: 'Shib Army',
    symbol: 'SHIBARMY',
  },
  {
    id: 13761,
    name: 'Nowlage Coin',
    symbol: 'NAC',
  },
  {
    id: 13762,
    name: 'Symbull',
    symbol: 'SYMBULL',
  },
  {
    id: 13763,
    name: 'ForeverBNB',
    symbol: 'FBNB',
  },
  {
    id: 13764,
    name: 'CryptoForSpeed',
    symbol: 'CFS',
  },
  {
    id: 13766,
    name: 'YoHero (YHC)',
    symbol: 'YHC',
  },
  {
    id: 13767,
    name: 'SatoShiba',
    symbol: 'SATO',
  },
  {
    id: 13768,
    name: 'ZeLoop Eco Reward',
    symbol: 'ERW',
  },
  {
    id: 13770,
    name: 'Little Tsuki Inu',
    symbol: 'LILTK',
  },
  {
    id: 13774,
    name: 'Rotten Floki',
    symbol: 'ROTTEN',
  },
  {
    id: 13775,
    name: 'Startama Go',
    symbol: 'STARTAMAGO',
  },
  {
    id: 13778,
    name: 'Leon Token',
    symbol: 'LEON',
  },
  {
    id: 13779,
    name: 'Oly Sport',
    symbol: 'OLY',
  },
  {
    id: 13780,
    name: 'Degen Dex',
    symbol: 'DEGN',
  },
  {
    id: 13781,
    name: 'Avaterra',
    symbol: 'TERRA',
  },
  {
    id: 13783,
    name: 'Afrostar',
    symbol: 'AFRO',
  },
  {
    id: 13784,
    name: 'Robin Inu',
    symbol: 'ROBIN',
  },
  {
    id: 13788,
    name: 'BuffedShiba',
    symbol: 'BSHIB',
  },
  {
    id: 13806,
    name: 'DICKcoin',
    symbol: 'DICK',
  },
  {
    id: 13810,
    name: 'MASTERCHEF2',
    symbol: 'MASTERCHEF2',
  },
  {
    id: 13811,
    name: 'BurgerBurn',
    symbol: 'BRGB',
  },
  {
    id: 13813,
    name: 'ENTERBUTTON',
    symbol: 'ENTC',
  },
  {
    id: 13815,
    name: 'Crazy Bunny Equity Token',
    symbol: 'CBUNNY',
  },
  {
    id: 13816,
    name: 'Zoo Labs',
    symbol: 'ZOO',
  },
  {
    id: 13817,
    name: 'FlokiLoki',
    symbol: 'FLOKILOKI',
  },
  {
    id: 13820,
    name: 'OJE Token',
    symbol: 'OJE',
  },
  {
    id: 13821,
    name: 'Solana CUM',
    symbol: 'SCUM',
  },
  {
    id: 13825,
    name: 'AxieZilla',
    symbol: 'AXZ',
  },
  {
    id: 13826,
    name: 'Financio',
    symbol: 'FIN',
  },
  {
    id: 13827,
    name: 'SavePlanetEarth',
    symbol: 'SPE',
  },
  {
    id: 13829,
    name: 'Infomatix',
    symbol: 'INFO',
  },
  {
    id: 13830,
    name: 'Luminos Mining Protocol',
    symbol: 'LUMI',
  },
  {
    id: 13831,
    name: 'Crypto Classic',
    symbol: 'CRC',
  },
  {
    id: 13833,
    name: 'Shibu Life',
    symbol: 'SHIBU',
  },
  {
    id: 13834,
    name: 'Mewn Inu',
    symbol: 'MEWN',
  },
  {
    id: 13835,
    name: 'Coin of Nature',
    symbol: 'CON',
  },
  {
    id: 13836,
    name: 'Wolverine',
    symbol: 'WLVR',
  },
  {
    id: 13838,
    name: 'Killua Inu',
    symbol: 'KILLUA',
  },
  {
    id: 13839,
    name: 'MetaShib Token',
    symbol: 'METASHIB',
  },
  {
    id: 13842,
    name: 'BUNSCAKE',
    symbol: 'BSCAKE',
  },
  {
    id: 13843,
    name: 'Ethernal Finance',
    symbol: 'ETHFIN',
  },
  {
    id: 13845,
    name: 'Beeuda',
    symbol: 'BDA',
  },
  {
    id: 13846,
    name: 'Prince Floki V2',
    symbol: 'PrinceFloki',
  },
  {
    id: 13848,
    name: 'Ibiza Token',
    symbol: 'IBZ',
  },
  {
    id: 13849,
    name: 'Secured Ship',
    symbol: 'SHIP',
  },
  {
    id: 13850,
    name: 'Santa Coin',
    symbol: 'SANTA',
  },
  {
    id: 13853,
    name: 'Blockchain Adventurers Guild',
    symbol: 'BAG',
  },
  {
    id: 13854,
    name: 'Mensa',
    symbol: 'MSA',
  },
  {
    id: 13855,
    name: 'Ethereum Name Service',
    symbol: 'ENS',
  },
  {
    id: 13858,
    name: 'Muslim Coins',
    symbol: 'MUSC',
  },
  {
    id: 13859,
    name: 'MAGA Coin',
    symbol: 'MAGA',
  },
  {
    id: 13860,
    name: 'DaddyBezos',
    symbol: 'DJBZ',
  },
  {
    id: 13861,
    name: 'Gorilla Inu',
    symbol: 'GORILLA INU',
  },
  {
    id: 13862,
    name: 'Flashloans.com',
    symbol: 'FLASH',
  },
  {
    id: 13864,
    name: 'Shiba Lite',
    symbol: 'SHIBLITE',
  },
  {
    id: 13866,
    name: 'RIFI United',
    symbol: 'RU',
  },
  {
    id: 13867,
    name: 'StarDust',
    symbol: 'SD',
  },
  {
    id: 13868,
    name: 'Baby Squid Game',
    symbol: 'BSG',
  },
  {
    id: 13869,
    name: 'The Three Kingdoms',
    symbol: 'CHI',
  },
  {
    id: 13870,
    name: 'Rune Shards',
    symbol: 'RXS',
  },
  {
    id: 13872,
    name: 'SpaceDawgs',
    symbol: 'DAWGS',
  },
  {
    id: 13873,
    name: 'Tanks For Playing',
    symbol: 'TANKS',
  },
  {
    id: 13874,
    name: 'GAMI World',
    symbol: 'GAMI',
  },
  {
    id: 13876,
    name: 'PulseFeg',
    symbol: 'PULSEFEG',
  },
  {
    id: 13878,
    name: 'Uniswap Finance',
    symbol: 'UNFI',
  },
  {
    id: 13881,
    name: 'Hector DAO',
    symbol: 'HEC',
  },
  {
    id: 13882,
    name: 'Treat',
    symbol: 'TREAT',
  },
  {
    id: 13883,
    name: 'SHKOOBY INU',
    symbol: 'SHKOOBY',
  },
  {
    id: 13884,
    name: 'SparkLab',
    symbol: 'Spark',
  },
  {
    id: 13885,
    name: 'Baby Schrodinger Coin',
    symbol: 'BABYDINGER',
  },
  {
    id: 13886,
    name: 'Terra World Token',
    symbol: 'TWD',
  },
  {
    id: 13887,
    name: 'P2P Solutions foundation',
    symbol: 'P2PS',
  },
  {
    id: 13888,
    name: 'Island Doges',
    symbol: 'ISLAND',
  },
  {
    id: 13889,
    name: 'ZUNA',
    symbol: 'ZUNA',
  },
  {
    id: 13890,
    name: 'Megacosm',
    symbol: 'MEGACOSM',
  },
  {
    id: 13893,
    name: 'Gamma',
    symbol: 'GAM',
  },
  {
    id: 13894,
    name: 'Evergreen token',
    symbol: 'EGT',
  },
  {
    id: 13896,
    name: 'HobbsNetworkToken',
    symbol: 'HNW',
  },
  {
    id: 13900,
    name: 'Lil Doge Floki',
    symbol: 'LDF',
  },
  {
    id: 13901,
    name: 'Bit2Me Token',
    symbol: 'B2M',
  },
  {
    id: 13902,
    name: 'Alpha Shiba Inu',
    symbol: 'ALPHASHIB',
  },
  {
    id: 13904,
    name: 'Shockwave Finance',
    symbol: 'WAVE',
  },
  {
    id: 13905,
    name: 'Cosmostarter',
    symbol: 'CSMS',
  },
  {
    id: 13906,
    name: 'Hedge Finance',
    symbol: 'HEDGE',
  },
  {
    id: 13907,
    name: 'Scorpion Finance',
    symbol: 'SCORPFIN',
  },
  {
    id: 13908,
    name: 'SurfMoon',
    symbol: 'SURFMOON',
  },
  {
    id: 13910,
    name: 'AutoMaticUp',
    symbol: 'ATMUP',
  },
  {
    id: 13911,
    name: 'GinSpirit',
    symbol: 'GINSPIRIT',
  },
  {
    id: 13913,
    name: 'Blockster',
    symbol: 'BXR',
  },
  {
    id: 13914,
    name: 'Oobit',
    symbol: 'OBT',
  },
  {
    id: 13916,
    name: 'Omax Token',
    symbol: 'OMAX',
  },
  {
    id: 13917,
    name: 'Profit Bank',
    symbol: 'PBK',
  },
  {
    id: 13918,
    name: 'Shibamon',
    symbol: 'SHIBAMON',
  },
  {
    id: 13919,
    name: 'DOGUS',
    symbol: 'DOGUS',
  },
  {
    id: 13921,
    name: 'Atmosphere CCG',
    symbol: 'ATMSSFT',
  },
  {
    id: 13922,
    name: 'Floki Adventure',
    symbol: 'FIAT',
  },
  {
    id: 13924,
    name: 'Urubit',
    symbol: 'URUB',
  },
  {
    id: 13926,
    name: 'Monster Slayer',
    symbol: 'MS',
  },
  {
    id: 13927,
    name: 'BabyQuick',
    symbol: 'BABYQUICK',
  },
  {
    id: 13929,
    name: 'Balisari',
    symbol: 'BST',
  },
  {
    id: 13930,
    name: 'BunnyGirl',
    symbol: 'BUNNYGIRL',
  },
  {
    id: 13931,
    name: 'Miyazaki Inu',
    symbol: 'MIYAZAKI',
  },
  {
    id: 13932,
    name: 'Genesis Worlds',
    symbol: 'GENESIS',
  },
  {
    id: 13934,
    name: 'Baby Squid Games',
    symbol: 'SQUIDS',
  },
  {
    id: 13935,
    name: 'Otter Clam',
    symbol: 'CLAM',
  },
  {
    id: 13936,
    name: 'Ari10',
    symbol: 'ARI10',
  },
  {
    id: 13937,
    name: 'Catena X',
    symbol: 'CEX',
  },
  {
    id: 13938,
    name: 'Game Coin',
    symbol: 'GMEX',
  },
  {
    id: 13939,
    name: 'Olympic Doge',
    symbol: 'OLYMPIC DOGE',
  },
  {
    id: 13940,
    name: 'NELO Metaverse',
    symbol: 'NELO',
  },
  {
    id: 13942,
    name: 'Wipe My ASS',
    symbol: 'WIPE',
  },
  {
    id: 13943,
    name: 'GINZA NETWORK',
    symbol: 'GINZA',
  },
  {
    id: 13944,
    name: 'Otter Finance',
    symbol: 'OTR',
  },
  {
    id: 13945,
    name: 'CABANA',
    symbol: 'CBA',
  },
  {
    id: 13946,
    name: 'Scoobi Doge',
    symbol: 'SCOOBI',
  },
  {
    id: 13948,
    name: 'Schrodinger',
    symbol: 'KITTY DINGER',
  },
  {
    id: 13950,
    name: 'Dentrocoin',
    symbol: 'DENTRO',
  },
  {
    id: 13952,
    name: 'LevelUp Gaming',
    symbol: 'LVLUP',
  },
  {
    id: 13953,
    name: 'Scotty Beam',
    symbol: 'SCOTTY',
  },
  {
    id: 13956,
    name: 'Squid God Finance',
    symbol: 'SGT',
  },
  {
    id: 13957,
    name: 'FlokiZap',
    symbol: 'FLOKIZ',
  },
  {
    id: 13958,
    name: 'ArcanineInu',
    symbol: 'ARCANINEINU',
  },
  {
    id: 13960,
    name: 'KOROMARU',
    symbol: 'KOROMARU',
  },
  {
    id: 13963,
    name: 'MetaFace',
    symbol: 'MFT',
  },
  {
    id: 13964,
    name: 'FarmerDoge',
    symbol: 'CROP',
  },
  {
    id: 13965,
    name: 'Ethernaal',
    symbol: 'NAAL',
  },
  {
    id: 13966,
    name: 'Snakes On A NFT Game',
    symbol: 'SNAKES',
  },
  {
    id: 13968,
    name: 'Gennix',
    symbol: 'GNNX',
  },
  {
    id: 13969,
    name: 'Phoenix Global (new)',
    symbol: 'PHB',
  },
  {
    id: 13971,
    name: 'BonusSquidGame',
    symbol: 'BonusSquid',
  },
  {
    id: 13973,
    name: 'nSights DeFi Trader',
    symbol: 'NSI',
  },
  {
    id: 13974,
    name: 'NFTStyle',
    symbol: 'NFTSTYLE',
  },
  {
    id: 13975,
    name: 'Shar Pei',
    symbol: 'SHARPEI',
  },
  {
    id: 13976,
    name: 'XEUS',
    symbol: 'XEUS',
  },
  {
    id: 13979,
    name: 'BNB Hyper Rise',
    symbol: 'HYPERRISE',
  },
  {
    id: 13982,
    name: 'FalconX',
    symbol: 'FALCX',
  },
  {
    id: 13983,
    name: 'Mega Shiba Inu',
    symbol: 'MEGASHIB',
  },
  {
    id: 13984,
    name: 'Berserk Inu',
    symbol: 'BERSERK',
  },
  {
    id: 13985,
    name: 'FootBallGo',
    symbol: 'FGSPORT',
  },
  {
    id: 13986,
    name: 'Riverboat',
    symbol: 'RIB',
  },
  {
    id: 13987,
    name: 'DYOR Token',
    symbol: 'DYOR',
  },
  {
    id: 13988,
    name: 'MIM',
    symbol: 'MIM',
  },
  {
    id: 13989,
    name: 'BabyFlokiZilla',
    symbol: 'BABYFLOKIZILLA',
  },
  {
    id: 13991,
    name: 'X AE A-12',
    symbol: 'XAEA12',
  },
  {
    id: 13992,
    name: 'Hero Essence',
    symbol: 'HES',
  },
  {
    id: 13993,
    name: 'Doge Rocket',
    symbol: 'DOGERKT',
  },
  {
    id: 13994,
    name: 'MetaDoge',
    symbol: 'METADOGE',
  },
  {
    id: 13995,
    name: 'Punch Gaming token',
    symbol: 'PUNCH',
  },
  {
    id: 13996,
    name: 'AVNRich Token',
    symbol: 'AVN',
  },
  {
    id: 13997,
    name: 'Hodl Finance',
    symbol: 'HFT',
  },
  {
    id: 13998,
    name: 'Yaan Launchpad',
    symbol: 'YAAN',
  },
  {
    id: 13999,
    name: 'Togashi Inu',
    symbol: 'TOGASHI',
  },
  {
    id: 14000,
    name: 'ChefCake',
    symbol: 'CHEFCAKE',
  },
  {
    id: 14001,
    name: 'RocketBUSD',
    symbol: 'RocketBUSD',
  },
  {
    id: 14002,
    name: 'NFTASCII',
    symbol: 'NFTASCII',
  },
  {
    id: 14006,
    name: 'Ironman',
    symbol: 'IRONMAN',
  },
  {
    id: 14008,
    name: 'NEET Finance',
    symbol: 'NEET',
  },
  {
    id: 14009,
    name: 'DeFi Launch',
    symbol: 'DLAUNCH',
  },
  {
    id: 14010,
    name: 'PomeRocket',
    symbol: 'POME',
  },
  {
    id: 14011,
    name: 'BIG ETH',
    symbol: 'BIGETH',
  },
  {
    id: 14012,
    name: 'Polygon Parrot Egg',
    symbol: 'PPEGG',
  },
  {
    id: 14013,
    name: 'GEMIT.app',
    symbol: 'GEMIT',
  },
  {
    id: 14014,
    name: 'Gilgamesh ETH',
    symbol: 'GIL',
  },
  {
    id: 14015,
    name: 'Cardanomics',
    symbol: 'ADX',
  },
  {
    id: 14016,
    name: 'HyFi Token',
    symbol: 'HYFI',
  },
  {
    id: 14018,
    name: 'SunShield',
    symbol: 'SSHLD',
  },
  {
    id: 14019,
    name: 'Lizard Token',
    symbol: 'LIZARD',
  },
  {
    id: 14021,
    name: 'Yokai Money',
    symbol: 'YOKAI',
  },
  {
    id: 14025,
    name: 'Tokenoid',
    symbol: 'NOID',
  },
  {
    id: 14026,
    name: 'GYM Token',
    symbol: 'GYM',
  },
  {
    id: 14027,
    name: 'Snowbank',
    symbol: 'SB',
  },
  {
    id: 14028,
    name: 'Dune Token',
    symbol: 'DUNE',
  },
  {
    id: 14029,
    name: 'FTM PUP Token',
    symbol: 'FPUP',
  },
  {
    id: 14030,
    name: 'Evagrow Coin',
    symbol: 'EVA',
  },
  {
    id: 14031,
    name: 'Bork',
    symbol: 'BORK',
  },
  {
    id: 14032,
    name: 'Idoscan',
    symbol: 'IDOSCAN',
  },
  {
    id: 14033,
    name: 'Gorgeous',
    symbol: 'GORGEOUS',
  },
  {
    id: 14035,
    name: 'Premio',
    symbol: 'PREMIO',
  },
  {
    id: 14036,
    name: 'Pirate Inu',
    symbol: 'PINU',
  },
  {
    id: 14037,
    name: 'Meta Shiba',
    symbol: 'MSHIBA',
  },
  {
    id: 14038,
    name: 'Doge Yellow Coin',
    symbol: 'DOGEY',
  },
  {
    id: 14039,
    name: 'Defiville',
    symbol: 'ISLA',
  },
  {
    id: 14041,
    name: 'Himalayan Cat Coin',
    symbol: 'HIMA',
  },
  {
    id: 14043,
    name: 'NOMY',
    symbol: 'NOMY',
  },
  {
    id: 14044,
    name: 'Doge unchained',
    symbol: 'DUC',
  },
  {
    id: 14045,
    name: 'LinkSync',
    symbol: 'SYNC',
  },
  {
    id: 14046,
    name: 'BlueSparrow Token',
    symbol: 'BLUESPARROW',
  },
  {
    id: 14047,
    name: 'Blubber Coin',
    symbol: 'BULB',
  },
  {
    id: 14049,
    name: 'MintSwap',
    symbol: 'MINT',
  },
  {
    id: 14052,
    name: 'FC Porto',
    symbol: 'PORTO',
  },
  {
    id: 14054,
    name: 'MyOwnItem',
    symbol: 'MOI',
  },
  {
    id: 14056,
    name: 'PUG COIN',
    symbol: 'PUG',
  },
  {
    id: 14058,
    name: 'Bali Social Integrated',
    symbol: 'BSI',
  },
  {
    id: 14061,
    name: 'Pawn My NFT',
    symbol: 'PNFT',
  },
  {
    id: 14063,
    name: 'FantOHM',
    symbol: 'FHM',
  },
  {
    id: 14064,
    name: 'The Philosophers Stone',
    symbol: 'TPOS',
  },
  {
    id: 14065,
    name: 'Pirate Boy',
    symbol: 'PIRATEBOY',
  },
  {
    id: 14066,
    name: 'GuitarSwap',
    symbol: 'GUT',
  },
  {
    id: 14067,
    name: 'Dickcoin',
    symbol: 'DICK',
  },
  {
    id: 14069,
    name: 'FIA Protocol',
    symbol: 'FIA',
  },
  {
    id: 14070,
    name: 'Hodler Heroes NFT',
    symbol: 'HHNFT',
  },
  {
    id: 14071,
    name: 'HIDEOUS',
    symbol: 'HIDEOUS',
  },
  {
    id: 14072,
    name: 'Doge King',
    symbol: 'DOGEK',
  },
  {
    id: 14074,
    name: 'Anji',
    symbol: 'ANJI',
  },
  {
    id: 14075,
    name: 'POOMOON',
    symbol: 'POO',
  },
  {
    id: 14076,
    name: 'Follow Token',
    symbol: 'FOLO',
  },
  {
    id: 14077,
    name: 'Kaiba Inu',
    symbol: 'KAIBA',
  },
  {
    id: 14078,
    name: 'PolkaInu',
    symbol: 'PINU',
  },
  {
    id: 14079,
    name: 'Shibalana',
    symbol: 'SHIBA',
  },
  {
    id: 14080,
    name: 'RO Slayers',
    symbol: 'SLYR',
  },
  {
    id: 14082,
    name: 'Frieza Inu',
    symbol: 'FRINU',
  },
  {
    id: 14083,
    name: 'Lorde Edge',
    symbol: 'EDGELON',
  },
  {
    id: 14084,
    name: 'The Mars Shiba',
    symbol: 'MARSSHIBA',
  },
  {
    id: 14085,
    name: 'Buff Shiba Inu',
    symbol: 'BUFFSHIBA',
  },
  {
    id: 14086,
    name: 'Binancedog',
    symbol: 'Bidog',
  },
  {
    id: 14088,
    name: 'LuxFi',
    symbol: 'LXF',
  },
  {
    id: 14089,
    name: 'Tempus',
    symbol: 'TEMP',
  },
  {
    id: 14091,
    name: 'Diamond DND',
    symbol: 'DND',
  },
  {
    id: 14092,
    name: 'BNB Shinobi',
    symbol: 'CHAKRA',
  },
  {
    id: 14093,
    name: 'Binosaurs',
    symbol: 'BINOSAURS',
  },
  {
    id: 14094,
    name: 'AlgoGems',
    symbol: 'GEMS',
  },
  {
    id: 14095,
    name: 'Omicron',
    symbol: 'OMIC',
  },
  {
    id: 14096,
    name: 'Blizz Finance',
    symbol: 'BLZZ',
  },
  {
    id: 14097,
    name: 'Koreadoge',
    symbol: 'KDOGE',
  },
  {
    id: 14098,
    name: 'METAVERSE',
    symbol: 'META',
  },
  {
    id: 14099,
    name: 'Mobius Money',
    symbol: 'MOBI',
  },
  {
    id: 14100,
    name: 'Angry Squid',
    symbol: 'AngrySquid',
  },
  {
    id: 14102,
    name: 'Floki Gold',
    symbol: 'FLOKIGOLD',
  },
  {
    id: 14103,
    name: 'DRACARYS',
    symbol: 'DRAC',
  },
  {
    id: 14105,
    name: 'Lemonn',
    symbol: 'LMN',
  },
  {
    id: 14106,
    name: 'Meta Inu',
    symbol: 'METAINU',
  },
  {
    id: 14109,
    name: 'Alien Shiba Inu',
    symbol: 'ASHIB',
  },
  {
    id: 14110,
    name: 'D-Skyscraper',
    symbol: 'DSG',
  },
  {
    id: 14111,
    name: 'Puppy Token',
    symbol: '$PUPPY',
  },
  {
    id: 14113,
    name: 'AstraPad',
    symbol: 'ASTRA',
  },
  {
    id: 14115,
    name: 'Shitzu Inu',
    symbol: 'SHITZUINU',
  },
  {
    id: 14116,
    name: 'Solcats',
    symbol: 'MEOW',
  },
  {
    id: 14117,
    name: 'Binom Protocol',
    symbol: 'BINOM',
  },
  {
    id: 14118,
    name: 'Adventure Inu',
    symbol: 'ADINU',
  },
  {
    id: 14119,
    name: 'Upper Swiss Franc',
    symbol: 'CHFU',
  },
  {
    id: 14120,
    name: 'Shibachu',
    symbol: 'SHIBCHU',
  },
  {
    id: 14121,
    name: 'Olympia',
    symbol: 'OLP',
  },
  {
    id: 14122,
    name: 'CryptoDrop',
    symbol: 'CDROP',
  },
  {
    id: 14123,
    name: "Let's Go Brandon",
    symbol: 'LGB',
  },
  {
    id: 14124,
    name: 'Metastar',
    symbol: 'METASTAR',
  },
  {
    id: 14127,
    name: 'SW DAO',
    symbol: 'SWD',
  },
  {
    id: 14128,
    name: 'Infinity ETH',
    symbol: 'IETH',
  },
  {
    id: 14129,
    name: 'MetaFinance',
    symbol: 'MFI',
  },
  {
    id: 14130,
    name: 'Easy Finance Token',
    symbol: 'EFT',
  },
  {
    id: 14131,
    name: 'LeagueDAO',
    symbol: 'LEAG',
  },
  {
    id: 14134,
    name: 'Buffed Kishu',
    symbol: 'BKISHU',
  },
  {
    id: 14137,
    name: 'Vikings Inu',
    symbol: 'VIKINGS',
  },
  {
    id: 14138,
    name: 'Pulsar Token',
    symbol: '$PULSAR',
  },
  {
    id: 14140,
    name: 'Dynasty Global Investments',
    symbol: 'DYN',
  },
  {
    id: 14141,
    name: 'Psyduck Inu',
    symbol: 'Psyduck',
  },
  {
    id: 14146,
    name: 'Optimus Cat',
    symbol: 'OPCAT',
  },
  {
    id: 14147,
    name: 'GainPool',
    symbol: 'GAIN',
  },
  {
    id: 14148,
    name: 'Meo.tools',
    symbol: 'MEO',
  },
  {
    id: 14149,
    name: 'Bunny Zilla',
    symbol: 'BUNNYZILLA',
  },
  {
    id: 14150,
    name: 'Wolf Girl',
    symbol: 'WOLFGIRL',
  },
  {
    id: 14151,
    name: 'Glasscoin',
    symbol: 'GLS',
  },
  {
    id: 14152,
    name: 'Slittlerabbit',
    symbol: 'SLTRBT',
  },
  {
    id: 14153,
    name: 'Euphoria',
    symbol: 'WAGMI',
  },
  {
    id: 14154,
    name: 'UNIREALCHAIN',
    symbol: 'UNR',
  },
  {
    id: 14156,
    name: 'DogeBNB.org',
    symbol: 'DOGEBNB',
  },
  {
    id: 14157,
    name: 'RedZilla',
    symbol: 'REDZILLA',
  },
  {
    id: 14159,
    name: 'United Doge Finance',
    symbol: 'UDOG',
  },
  {
    id: 14160,
    name: 'Matrix Protocol',
    symbol: 'MTX',
  },
  {
    id: 14161,
    name: '1NFT',
    symbol: '1NFT',
  },
  {
    id: 14162,
    name: 'Mashima Inu',
    symbol: 'MASHIMA',
  },
  {
    id: 14163,
    name: 'PIDAO',
    symbol: 'PID',
  },
  {
    id: 14164,
    name: 'Baby Santa Token',
    symbol: '$BST',
  },
  {
    id: 14165,
    name: 'Dappsy',
    symbol: 'APP',
  },
  {
    id: 14166,
    name: 'Kingfund Finance',
    symbol: 'KING',
  },
  {
    id: 14169,
    name: 'Spookeletons Token',
    symbol: 'SPKL',
  },
  {
    id: 14170,
    name: 'Safety',
    symbol: 'SFT',
  },
  {
    id: 14172,
    name: 'ADToken',
    symbol: 'AD',
  },
  {
    id: 14174,
    name: 'Contracto',
    symbol: 'LOCK',
  },
  {
    id: 14175,
    name: 'King of Shiba',
    symbol: 'KINGSHIBA',
  },
  {
    id: 14177,
    name: 'Inuyasha',
    symbol: 'INUYASHA',
  },
  {
    id: 14178,
    name: 'Shiba Maki',
    symbol: 'SHIBAMAKI',
  },
  {
    id: 14180,
    name: 'MartianDoge',
    symbol: 'MARTIANDOGE',
  },
  {
    id: 14181,
    name: 'MetaAxis',
    symbol: 'MTA',
  },
  {
    id: 14182,
    name: 'CollegeCoinNetwork',
    symbol: 'CCN',
  },
  {
    id: 14184,
    name: 'Succor Coin',
    symbol: 'SUCCOR',
  },
  {
    id: 14186,
    name: 'Perpetuum',
    symbol: 'PRP',
  },
  {
    id: 14187,
    name: 'Cate-Shiba',
    symbol: 'CHIBA',
  },
  {
    id: 14188,
    name: 'Plugin',
    symbol: 'PLI',
  },
  {
    id: 14189,
    name: 'K-9 INU',
    symbol: 'K9',
  },
  {
    id: 14190,
    name: 'HUSKYX',
    symbol: 'HUSKYX',
  },
  {
    id: 14191,
    name: 'MELONx',
    symbol: 'MLNX',
  },
  {
    id: 14192,
    name: 'iBNB (new)',
    symbol: 'IBNB',
  },
  {
    id: 14193,
    name: 'Bitoshi',
    symbol: 'BTI',
  },
  {
    id: 14194,
    name: 'Kurai Inu',
    symbol: 'KURAI',
  },
  {
    id: 14196,
    name: 'Cake Girl Token',
    symbol: 'CAKEGIRL',
  },
  {
    id: 14197,
    name: 'FlokiBonk',
    symbol: 'FLOBO',
  },
  {
    id: 14198,
    name: 'BabyEthereum',
    symbol: 'BBETH',
  },
  {
    id: 14200,
    name: 'Bozkurt Token',
    symbol: 'BT',
  },
  {
    id: 14203,
    name: 'N-Word Pass',
    symbol: 'NWORDPASS',
  },
  {
    id: 14204,
    name: 'eaglecoin',
    symbol: 'ELC',
  },
  {
    id: 14205,
    name: 'Wakanda Inu',
    symbol: 'WKD',
  },
  {
    id: 14207,
    name: 'The Spartans',
    symbol: 'TSP',
  },
  {
    id: 14208,
    name: 'Nickel Token',
    symbol: 'NICKEL',
  },
  {
    id: 14209,
    name: 'Sherlock Wallet',
    symbol: 'SHER',
  },
  {
    id: 14210,
    name: 'Stakeborg DAO',
    symbol: 'STANDARD',
  },
  {
    id: 14211,
    name: 'Spike Inu',
    symbol: 'SPKI',
  },
  {
    id: 14212,
    name: 'Batman',
    symbol: 'BATMAN',
  },
  {
    id: 14213,
    name: 'UpLink',
    symbol: 'UPLINK',
  },
  {
    id: 14218,
    name: 'Amun Polygon Ecosystem Index',
    symbol: 'PECO',
  },
  {
    id: 14220,
    name: 'Meta Floki Inu',
    symbol: 'METAFLOKINU',
  },
  {
    id: 14221,
    name: 'ShibFueL',
    symbol: 'SHIBFUEL',
  },
  {
    id: 14222,
    name: 'StrongHands Finance',
    symbol: 'ISHND',
  },
  {
    id: 14223,
    name: 'ixirswap',
    symbol: 'IXIR',
  },
  {
    id: 14224,
    name: 'Dogggo',
    symbol: 'DOGGGO',
  },
  {
    id: 14225,
    name: 'ROKKIT FUEL',
    symbol: '$ROKK',
  },
  {
    id: 14226,
    name: 'EarthChain',
    symbol: 'EARTH',
  },
  {
    id: 14227,
    name: 'Crypto Media Network',
    symbol: 'CMN',
  },
  {
    id: 14229,
    name: 'WealthSecrets',
    symbol: 'WSC',
  },
  {
    id: 14230,
    name: 'Nora Token',
    symbol: 'NRA',
  },
  {
    id: 14231,
    name: 'Shining Crystal Shard',
    symbol: 'SCS',
  },
  {
    id: 14232,
    name: 'Betswamp',
    symbol: 'BETS',
  },
  {
    id: 14233,
    name: 'Shibanaut Token',
    symbol: 'SHIBANAUT',
  },
  {
    id: 14234,
    name: 'Guccinu',
    symbol: 'GUCCINU',
  },
  {
    id: 14235,
    name: 'Shiba Interstellar',
    symbol: 'SHINT',
  },
  {
    id: 14236,
    name: 'BabelFish',
    symbol: 'BABEL',
  },
  {
    id: 14238,
    name: 'Cashio Token',
    symbol: 'CASHIO',
  },
  {
    id: 14239,
    name: 'Snake Token',
    symbol: 'SNK',
  },
  {
    id: 14243,
    name: 'Low Float Gem',
    symbol: 'LFG',
  },
  {
    id: 14246,
    name: 'Aidi Finance (BSC)',
    symbol: 'AIDI',
  },
  {
    id: 14247,
    name: 'Kala Finance',
    symbol: 'KALA',
  },
  {
    id: 14248,
    name: 'Trister  World',
    symbol: 'TWFI',
  },
  {
    id: 14251,
    name: "Let's Go Brandon!",
    symbol: 'FJB',
  },
  {
    id: 14252,
    name: 'BALLS',
    symbol: 'BALLS',
  },
  {
    id: 14253,
    name: 'Baby Samo Coin',
    symbol: 'BABY',
  },
  {
    id: 14254,
    name: 'Son of Shib',
    symbol: 'SON',
  },
  {
    id: 14257,
    name: 'WalletNow',
    symbol: 'WNOW',
  },
  {
    id: 14258,
    name: 'Profit Bls',
    symbol: 'PROFIT',
  },
  {
    id: 14259,
    name: 'KittyShiba',
    symbol: 'KSHIBA',
  },
  {
    id: 14261,
    name: 'Strip Finance',
    symbol: 'STRIP',
  },
  {
    id: 14262,
    name: 'Weenie Inu',
    symbol: 'WEENIE',
  },
  {
    id: 14263,
    name: 'Froggies',
    symbol: 'FROGGIES',
  },
  {
    id: 14264,
    name: 'BSC33DAO',
    symbol: 'BSC33',
  },
  {
    id: 14265,
    name: 'MetaDoge',
    symbol: 'METADOGE',
  },
  {
    id: 14267,
    name: 'Kimetsu Inu',
    symbol: 'KIMETSU',
  },
  {
    id: 14268,
    name: 'The Whive Protocol',
    symbol: 'WHIVE',
  },
  {
    id: 14270,
    name: 'Panda Inu',
    symbol: 'PANDA',
  },
  {
    id: 14271,
    name: 'GM Wagmi',
    symbol: 'GM',
  },
  {
    id: 14272,
    name: 'Spywolf',
    symbol: '$SPY',
  },
  {
    id: 14273,
    name: 'UniCat Token',
    symbol: 'UNICAT',
  },
  {
    id: 14274,
    name: 'BakedCake',
    symbol: 'BAKEDCAKE',
  },
  {
    id: 14278,
    name: 'Invictus',
    symbol: 'IN',
  },
  {
    id: 14284,
    name: 'DittoInu',
    symbol: 'DITTOINU',
  },
  {
    id: 14285,
    name: 'fantomGO',
    symbol: 'FTG',
  },
  {
    id: 14286,
    name: 'New Origin',
    symbol: 'NOC',
  },
  {
    id: 14287,
    name: 'La Casa De Papel',
    symbol: 'LCDP',
  },
  {
    id: 14288,
    name: 'ForeverBlast',
    symbol: 'FEB',
  },
  {
    id: 14289,
    name: 'Stone Age NFT Marketplace',
    symbol: 'GES',
  },
  {
    id: 14290,
    name: 'SuperDoge',
    symbol: 'SUPDOG',
  },
  {
    id: 14292,
    name: 'Coin of champions',
    symbol: 'COC',
  },
  {
    id: 14293,
    name: 'GM ETH',
    symbol: 'GM',
  },
  {
    id: 14297,
    name: 'Reward Cycle',
    symbol: 'RC',
  },
  {
    id: 14298,
    name: 'Flipper Token',
    symbol: 'FLIP',
  },
  {
    id: 14301,
    name: 'Atomic Floki',
    symbol: 'ATOMIC',
  },
  {
    id: 14302,
    name: 'Mishka Token',
    symbol: 'MISHKA',
  },
  {
    id: 14303,
    name: 'Samusky',
    symbol: 'SAMU',
  },
  {
    id: 14306,
    name: 'PoorDoge',
    symbol: 'POORDOGE',
  },
  {
    id: 14310,
    name: 'ETH ZILLA',
    symbol: 'ETHZILLA',
  },
  {
    id: 14312,
    name: 'Good Fire Token',
    symbol: 'GF',
  },
  {
    id: 14314,
    name: 'Warship Battles',
    symbol: '$OIL',
  },
  {
    id: 14315,
    name: 'Mochi Inu',
    symbol: 'MOCHI',
  },
  {
    id: 14316,
    name: 'Baby Mind',
    symbol: 'BMND',
  },
  {
    id: 14317,
    name: 'MagicBox',
    symbol: 'MBT',
  },
  {
    id: 14318,
    name: 'CAIETF.Finance',
    symbol: 'CAI',
  },
  {
    id: 14319,
    name: 'dHealth',
    symbol: 'DHP',
  },
  {
    id: 14320,
    name: 'i Money Crypto',
    symbol: 'IMC',
  },
  {
    id: 14321,
    name: 'NFTFundArt',
    symbol: 'NFA',
  },
  {
    id: 14322,
    name: 'UPFI Network',
    symbol: 'UPS',
  },
  {
    id: 14323,
    name: 'ITR.ETH Intercoin Investor',
    symbol: 'ITR',
  },
  {
    id: 14324,
    name: 'Shiba Inu Empire',
    symbol: 'SHIBEMP',
  },
  {
    id: 14325,
    name: 'SmartNFT',
    symbol: 'SMARTNFT',
  },
  {
    id: 14326,
    name: 'GOAL token',
    symbol: 'GOAL',
  },
  {
    id: 14327,
    name: 'SmartLOX',
    symbol: 'SMARTLOX',
  },
  {
    id: 14329,
    name: 'MetaZilla',
    symbol: 'MZ',
  },
  {
    id: 14330,
    name: 'Floki Kong',
    symbol: 'KONG',
  },
  {
    id: 14332,
    name: 'Flokitten',
    symbol: 'FLOKITTEN',
  },
  {
    id: 14333,
    name: 'Fertilizer',
    symbol: 'FRT',
  },
  {
    id: 14334,
    name: 'Saitama Kitty',
    symbol: 'SAIKITTY',
  },
  {
    id: 14335,
    name: 'Tetsu Inu',
    symbol: 'TETSU',
  },
  {
    id: 14338,
    name: 'PlayPad',
    symbol: 'PPAD',
  },
  {
    id: 14339,
    name: 'Cypherium',
    symbol: 'CPH',
  },
  {
    id: 14340,
    name: 'MELI Games',
    symbol: 'MELI',
  },
  {
    id: 14341,
    name: 'BitShiba',
    symbol: 'SHIBA',
  },
  {
    id: 14342,
    name: 'DKEY BANK',
    symbol: 'DKEY',
  },
  {
    id: 14345,
    name: 'Botto',
    symbol: 'BOTTO',
  },
  {
    id: 14346,
    name: 'UNIMOON',
    symbol: 'UNIMOON',
  },
  {
    id: 14348,
    name: '1BOX',
    symbol: '1BOX',
  },
  {
    id: 14349,
    name: 'Tutellus',
    symbol: 'TUT',
  },
  {
    id: 14350,
    name: 'ShinChan Token',
    symbol: 'SHINNOSUKE',
  },
  {
    id: 14352,
    name: 'Spidey Inu',
    symbol: 'SPIDEY INU',
  },
  {
    id: 14353,
    name: 'FegZilla',
    symbol: 'FEGZ',
  },
  {
    id: 14354,
    name: 'Husky Inu',
    symbol: 'HDOG',
  },
  {
    id: 14355,
    name: 'Gremlins Finance',
    symbol: 'GREM',
  },
  {
    id: 14356,
    name: 'Probably Nothing',
    symbol: 'PN',
  },
  {
    id: 14357,
    name: 'The Dynasty',
    symbol: 'DYT',
  },
  {
    id: 14358,
    name: 'Enhanced BTC',
    symbol: 'EBTC',
  },
  {
    id: 14360,
    name: 'FindShibby',
    symbol: 'FSHIBBY',
  },
  {
    id: 14361,
    name: 'KillSwitch',
    symbol: 'KSW',
  },
  {
    id: 14363,
    name: 'Pancake Games',
    symbol: 'GCAKE',
  },
  {
    id: 14364,
    name: 'Lustcoins',
    symbol: 'LUST',
  },
  {
    id: 14365,
    name: 'WINDOGE95',
    symbol: 'WNDG95',
  },
  {
    id: 14366,
    name: 'Farmageddon',
    symbol: 'FG',
  },
  {
    id: 14367,
    name: 'MEONG TOKEN',
    symbol: 'MEONG',
  },
  {
    id: 14368,
    name: 'Militia Games',
    symbol: 'MILIT',
  },
  {
    id: 14369,
    name: 'PRELAX SWAP',
    symbol: 'PEAX',
  },
  {
    id: 14371,
    name: 'Inflation Hedging Coin',
    symbol: 'IHC',
  },
  {
    id: 14373,
    name: 'Tipsy Santa',
    symbol: 'TIPSY',
  },
  {
    id: 14374,
    name: 'Green Ben',
    symbol: 'EBEN',
  },
  {
    id: 14375,
    name: 'BSCWIN Bulls',
    symbol: 'BSCWIN',
  },
  {
    id: 14376,
    name: 'BoxerDoge',
    symbol: 'BOXERDOGE',
  },
  {
    id: 14377,
    name: 'Tezilla',
    symbol: 'TEZILLA',
  },
  {
    id: 14378,
    name: 'META',
    symbol: 'META',
  },
  {
    id: 14379,
    name: 'Mars Inu',
    symbol: 'MARSINU',
  },
  {
    id: 14380,
    name: 'Floki Rocket',
    symbol: 'RLOKI',
  },
  {
    id: 14381,
    name: 'Crypto Fantasy League',
    symbol: 'CFL',
  },
  {
    id: 14382,
    name: 'Kitty Solana',
    symbol: 'KITTY',
  },
  {
    id: 14383,
    name: 'GolDInu',
    symbol: 'GINU',
  },
  {
    id: 14384,
    name: 'GN',
    symbol: 'GN',
  },
  {
    id: 14385,
    name: 'DodgeTheFloki',
    symbol: 'DTF',
  },
  {
    id: 14386,
    name: 'Shira inu',
    symbol: 'SHR',
  },
  {
    id: 14387,
    name: 'ArmzLegends',
    symbol: 'PROT',
  },
  {
    id: 14388,
    name: 'Bankwupt',
    symbol: 'BANKWUPT',
  },
  {
    id: 14389,
    name: 'Sator',
    symbol: 'SAO',
  },
  {
    id: 14390,
    name: 'MEMEKING.GAMES',
    symbol: 'MMK',
  },
  {
    id: 14391,
    name: 'Dali',
    symbol: 'DALI',
  },
  {
    id: 14392,
    name: 'Golden Ball',
    symbol: 'GLB',
  },
  {
    id: 14393,
    name: 'SuperMinesweeper',
    symbol: 'SM',
  },
  {
    id: 14394,
    name: 'LIQUIDCHAIN',
    symbol: 'XLC',
  },
  {
    id: 14396,
    name: 'Axial',
    symbol: 'AXIAL',
  },
  {
    id: 14397,
    name: 'Dragon Crypto Aurum',
    symbol: 'DCAU',
  },
  {
    id: 14398,
    name: 'Solana INU',
    symbol: 'INU',
  },
  {
    id: 14399,
    name: 'Cross-Chain Bridge Token',
    symbol: 'BRIDGE',
  },
  {
    id: 14400,
    name: 'UpStableToken',
    symbol: 'USTX',
  },
  {
    id: 14401,
    name: 'GM Inu',
    symbol: 'GMINU',
  },
  {
    id: 14402,
    name: 'HotZilla',
    symbol: 'HOTZILLA',
  },
  {
    id: 14403,
    name: 'LaunchWall',
    symbol: 'WALL',
  },
  {
    id: 14404,
    name: 'Etherconnect',
    symbol: 'ECC',
  },
  {
    id: 14405,
    name: 'Chika Inu',
    symbol: 'CHIKA',
  },
  {
    id: 14407,
    name: 'Dukecoin',
    symbol: 'DKC',
  },
  {
    id: 14408,
    name: 'ShibaDuff',
    symbol: 'SHIBADUFF',
  },
  {
    id: 14409,
    name: 'Orbit Token',
    symbol: 'ORBIT',
  },
  {
    id: 14410,
    name: 'Paycheck Defi',
    symbol: 'CHECK',
  },
  {
    id: 14413,
    name: 'BuyMainStreet',
    symbol: '$MAINST',
  },
  {
    id: 14414,
    name: 'IC DEFI',
    symbol: 'ICD',
  },
  {
    id: 14415,
    name: 'Skywalker',
    symbol: 'SKY',
  },
  {
    id: 14416,
    name: 'OneBit',
    symbol: '1BIT',
  },
  {
    id: 14418,
    name: 'Milky Token',
    symbol: 'MILKY',
  },
  {
    id: 14419,
    name: 'DogeCondoms',
    symbol: 'DOCO',
  },
  {
    id: 14423,
    name: 'G2 Crypto Gaming & Lottery',
    symbol: 'G2',
  },
  {
    id: 14425,
    name: 'DragonSea',
    symbol: 'DGE',
  },
  {
    id: 14426,
    name: 'Hunger Doge',
    symbol: 'HUNGRYDOGE',
  },
  {
    id: 14427,
    name: 'ZillaMatrix',
    symbol: 'ZMAX',
  },
  {
    id: 14428,
    name: 'Sound BSC',
    symbol: 'SOUND',
  },
  {
    id: 14429,
    name: 'TRIBE',
    symbol: 'TRIBEX',
  },
  {
    id: 14430,
    name: 'Kult of Kek',
    symbol: 'KOK',
  },
  {
    id: 14431,
    name: 'Mastiff Inu',
    symbol: 'MINU',
  },
  {
    id: 14432,
    name: 'SafeOHM',
    symbol: 'SOHM',
  },
  {
    id: 14433,
    name: 'Looks Rare',
    symbol: 'LR',
  },
  {
    id: 14434,
    name: 'FlokiBro',
    symbol: 'FBRO',
  },
  {
    id: 14435,
    name: 'Perfect World',
    symbol: 'PFW',
  },
  {
    id: 14436,
    name: 'Famous Five',
    symbol: 'FAFI',
  },
  {
    id: 14437,
    name: 'Totoro Inu',
    symbol: 'TOTORO',
  },
  {
    id: 14438,
    name: 'we love gm',
    symbol: 'GM',
  },
  {
    id: 14439,
    name: 'Jackpot Token',
    symbol: 'JPT',
  },
  {
    id: 14442,
    name: 'Avalanche HoneyBee',
    symbol: 'A.BEE',
  },
  {
    id: 14444,
    name: 'Royal Flush Coin',
    symbol: 'RFC',
  },
  {
    id: 14445,
    name: 'Degem',
    symbol: 'DGM',
  },
  {
    id: 14446,
    name: 'Laqira Protocol',
    symbol: 'LQR',
  },
  {
    id: 14447,
    name: 'Swole Doge',
    symbol: 'SWOLE',
  },
  {
    id: 14448,
    name: 'EcchiCoin',
    symbol: 'ECCHI',
  },
  {
    id: 14449,
    name: 'Jaiho Crypto',
    symbol: 'JAIHO',
  },
  {
    id: 14450,
    name: 'BANG Decentralized',
    symbol: 'BANG',
  },
  {
    id: 14452,
    name: 'Transhuman Coin',
    symbol: 'THC',
  },
  {
    id: 14453,
    name: 'Sponsee',
    symbol: 'SPON',
  },
  {
    id: 14454,
    name: 'Have Fun Staying Poor',
    symbol: 'HFSP',
  },
  {
    id: 14455,
    name: 'FanTerra',
    symbol: 'FTERRA',
  },
  {
    id: 14456,
    name: 'Squid Pet',
    symbol: 'SQUIDPET',
  },
  {
    id: 14457,
    name: 'Shiba Monk',
    symbol: 'SHIBAMONK',
  },
  {
    id: 14458,
    name: 'Kaby Gaming Token',
    symbol: 'KGT',
  },
  {
    id: 14459,
    name: 'BeGlobal Finance',
    symbol: 'GLB',
  },
  {
    id: 14460,
    name: 'HashRush',
    symbol: 'RUSH',
  },
  {
    id: 14461,
    name: 'Sphynx Token',
    symbol: 'SPHYNX',
  },
  {
    id: 14462,
    name: 'AngryBakery',
    symbol: 'ABAKE',
  },
  {
    id: 14464,
    name: 'PlayersOnly',
    symbol: 'PO',
  },
  {
    id: 14465,
    name: 'AnpanSwap',
    symbol: 'ANPAN',
  },
  {
    id: 14466,
    name: 'Takeda Shin',
    symbol: 'TAKEDA',
  },
  {
    id: 14468,
    name: 'Retire Token',
    symbol: 'RETIRE',
  },
  {
    id: 14469,
    name: 'Vibe Token',
    symbol: 'VIBE',
  },
  {
    id: 14470,
    name: 'TokenBook',
    symbol: 'TBK',
  },
  {
    id: 14471,
    name: 'Floki Meta',
    symbol: 'MFLOKI',
  },
  {
    id: 14472,
    name: 'Hunger Token',
    symbol: 'HUNGER',
  },
  {
    id: 14474,
    name: 'Flesh Token',
    symbol: 'FLESH',
  },
  {
    id: 14475,
    name: 'Coinversation',
    symbol: 'CTO',
  },
  {
    id: 14476,
    name: 'Fren',
    symbol: 'FREN',
  },
  {
    id: 14477,
    name: 'WGMI',
    symbol: 'WGMI',
  },
  {
    id: 14478,
    name: 'Shark Girl',
    symbol: 'SGIRL',
  },
  {
    id: 14479,
    name: 'CryptoBlast',
    symbol: 'CBT',
  },
  {
    id: 14480,
    name: 'FarmYield Token',
    symbol: 'FAMY',
  },
  {
    id: 14481,
    name: 'Garfield Token',
    symbol: 'GARFIELD',
  },
  {
    id: 14482,
    name: 'Christmas Elf',
    symbol: 'CELF',
  },
  {
    id: 14483,
    name: 'DoKEN',
    symbol: 'DOKEN',
  },
  {
    id: 14484,
    name: 'FlokiMon',
    symbol: 'FMON',
  },
  {
    id: 14485,
    name: 'FireRocket',
    symbol: 'FIREROCKET',
  },
  {
    id: 14486,
    name: 'Makk',
    symbol: 'MAKK',
  },
  {
    id: 14487,
    name: 'AxieDoge',
    symbol: 'AXSD',
  },
  {
    id: 14488,
    name: 'JK Coin',
    symbol: 'JK',
  },
  {
    id: 14489,
    name: 'CheckDot',
    symbol: 'CDT',
  },
  {
    id: 14491,
    name: 'Capitol',
    symbol: 'CPTL',
  },
  {
    id: 14492,
    name: 'Nemesis DAO',
    symbol: 'NMS',
  },
  {
    id: 14493,
    name: 'Undead Finance',
    symbol: 'UNDEAD',
  },
  {
    id: 14494,
    name: 'Cryptorun Network',
    symbol: 'CRN',
  },
  {
    id: 14496,
    name: 'Santa Shiba',
    symbol: 'SANTASHIB',
  },
  {
    id: 14497,
    name: 'TacoEnergy',
    symbol: 'TACOE',
  },
  {
    id: 14498,
    name: 'Green Life Energy',
    symbol: 'GNL',
  },
  {
    id: 14499,
    name: 'DeVolution',
    symbol: 'DEVO',
  },
  {
    id: 14500,
    name: 'Cryptogodz',
    symbol: 'GODZ',
  },
  {
    id: 14501,
    name: 'Baby Cat Girl',
    symbol: 'BBYCAT',
  },
  {
    id: 14504,
    name: 'Panda Girl',
    symbol: 'PGIRL',
  },
  {
    id: 14505,
    name: 'Matrix Samurai',
    symbol: 'MXS',
  },
  {
    id: 14506,
    name: 'Shiba Inu Billionaire',
    symbol: 'SHIBIB',
  },
  {
    id: 14507,
    name: 'Zoints',
    symbol: 'ZEE',
  },
  {
    id: 14508,
    name: 'CryptoMotorcycle',
    symbol: 'CMC',
  },
  {
    id: 14509,
    name: 'HeroCatGamefi',
    symbol: 'HCT',
  },
  {
    id: 14510,
    name: 'BNBeer',
    symbol: 'BNBEER',
  },
  {
    id: 14511,
    name: 'MissedEverything',
    symbol: 'ME',
  },
  {
    id: 14513,
    name: 'HodlBUSD',
    symbol: 'HBUSD',
  },
  {
    id: 14514,
    name: 'Sparrow Token',
    symbol: 'SPW',
  },
  {
    id: 14515,
    name: 'MMPRO Token',
    symbol: 'MMPRO',
  },
  {
    id: 14517,
    name: 'GnomeToken',
    symbol: 'GNOME',
  },
  {
    id: 14525,
    name: 'SafeShiba',
    symbol: 'SAFESHIB',
  },
  {
    id: 14526,
    name: 'Wallet Pay',
    symbol: 'XPAY',
  },
  {
    id: 14527,
    name: 'SHIBACK',
    symbol: 'SHIBACK',
  },
  {
    id: 14528,
    name: 'HunterDoge',
    symbol: '$HD',
  },
  {
    id: 14529,
    name: 'Nole NPC',
    symbol: 'NPC',
  },
  {
    id: 14530,
    name: 'LuckyToken',
    symbol: 'LKT',
  },
  {
    id: 14531,
    name: 'Falafel',
    symbol: 'FALAFEL',
  },
  {
    id: 14533,
    name: 'Fantom of the Opera Apes',
    symbol: 'FANTOMAPES',
  },
  {
    id: 14534,
    name: 'ParaSwap',
    symbol: 'PSP',
  },
  {
    id: 14535,
    name: 'NFTBomb',
    symbol: 'NBP',
  },
  {
    id: 14536,
    name: 'DogeGamer',
    symbol: 'DGA',
  },
  {
    id: 14537,
    name: 'CaashCow',
    symbol: 'COW',
  },
  {
    id: 14538,
    name: 'Pundi X PURSE',
    symbol: 'PURSE',
  },
  {
    id: 14539,
    name: 'Nemesis',
    symbol: 'NMS',
  },
  {
    id: 14542,
    name: 'AXIA Coin',
    symbol: 'AXC',
  },
  {
    id: 14543,
    name: 'Treasure Under Sea',
    symbol: 'TUS',
  },
  {
    id: 14544,
    name: 'Sleepy-Shib',
    symbol: 'SLEEPY-SHIB',
  },
  {
    id: 14545,
    name: 'MilkyWayEx',
    symbol: 'MILKY',
  },
  {
    id: 14546,
    name: 'Blue Floki Inu',
    symbol: 'BLUEFLOKI',
  },
  {
    id: 14548,
    name: 'FEED SYSTEM',
    symbol: 'FEEDTK',
  },
  {
    id: 14551,
    name: 'ok.lets.go.',
    symbol: 'OKLG',
  },
  {
    id: 14552,
    name: 'MILLIONSY',
    symbol: 'MILLI',
  },
  {
    id: 14553,
    name: 'Panda Coin',
    symbol: 'PANDA',
  },
  {
    id: 14554,
    name: 'MiniXRP',
    symbol: 'MXRP',
  },
  {
    id: 14555,
    name: 'GHOST SHIBA',
    symbol: 'GSHIBA',
  },
  {
    id: 14556,
    name: 'Boba Network',
    symbol: 'BOBA',
  },
  {
    id: 14557,
    name: 'Cindrum',
    symbol: 'CIND',
  },
  {
    id: 14558,
    name: 'Scientia',
    symbol: 'SCIE',
  },
  {
    id: 14559,
    name: 'Heliumx',
    symbol: 'HEX',
  },
  {
    id: 14560,
    name: 'RivrFloki',
    symbol: 'RIVRFLOKI',
  },
  {
    id: 14561,
    name: 'SwapTracker',
    symbol: 'SWPT',
  },
  {
    id: 14562,
    name: 'VIP Token',
    symbol: 'VIP',
  },
  {
    id: 14563,
    name: 'Star Ship Royal',
    symbol: 'SSR',
  },
  {
    id: 14564,
    name: 'HYPED',
    symbol: 'HYPED',
  },
  {
    id: 14565,
    name: 'Official Crypto Cowboy Token',
    symbol: 'OCCT',
  },
  {
    id: 14566,
    name: 'Fortune',
    symbol: 'FORTUNE',
  },
  {
    id: 14567,
    name: 'MetaCash',
    symbol: 'META',
  },
  {
    id: 14568,
    name: 'Baby CateCoin',
    symbol: 'BABYCATE',
  },
  {
    id: 14571,
    name: 'CatBoy',
    symbol: 'CTB',
  },
  {
    id: 14574,
    name: 'FlokipetWorld',
    symbol: 'FPET',
  },
  {
    id: 14575,
    name: 'Genshin NFT',
    symbol: 'GENSHIN',
  },
  {
    id: 14576,
    name: 'Squid Inu',
    symbol: 'SQUID',
  },
  {
    id: 14577,
    name: 'Catchy',
    symbol: 'CATCHY',
  },
  {
    id: 14578,
    name: 'Altera',
    symbol: 'AEN',
  },
  {
    id: 14579,
    name: 'Baby Shiba Dot',
    symbol: 'BSD',
  },
  {
    id: 14580,
    name: 'Greyhound',
    symbol: 'GREYHOUND',
  },
  {
    id: 14581,
    name: 'FluidFi',
    symbol: 'FLUID',
  },
  {
    id: 14583,
    name: 'GenshinShibInu',
    symbol: 'GSHIB',
  },
  {
    id: 14584,
    name: 'Kindness For Soul',
    symbol: '$KFS',
  },
  {
    id: 14585,
    name: 'EagonSwap Token',
    symbol: 'EAGON',
  },
  {
    id: 14586,
    name: 'ShibElon',
    symbol: 'SHIBELON',
  },
  {
    id: 14587,
    name: 'Crypto Cavemen Club',
    symbol: 'CAVE',
  },
  {
    id: 14589,
    name: 'DogeVillage',
    symbol: 'DOGEV',
  },
  {
    id: 14592,
    name: 'Panda Multiverse',
    symbol: 'PNDMLV',
  },
  {
    id: 14593,
    name: 'Buu Inu',
    symbol: 'BUU',
  },
  {
    id: 14594,
    name: 'Maximus',
    symbol: 'MAXI',
  },
  {
    id: 14596,
    name: 'Big Dog Coin',
    symbol: 'BDOG',
  },
  {
    id: 14597,
    name: 'ZombieCake',
    symbol: 'ZC',
  },
  {
    id: 14598,
    name: 'YearRise',
    symbol: 'YRT',
  },
  {
    id: 14599,
    name: 'PANDAINU',
    symbol: 'PWT',
  },
  {
    id: 14600,
    name: 'Rebellion Protocol',
    symbol: 'REBL',
  },
  {
    id: 14601,
    name: 'Sata Exchange',
    symbol: 'SATAX',
  },
  {
    id: 14602,
    name: 'Unity Network',
    symbol: 'UNT',
  },
  {
    id: 14603,
    name: 'Lunar',
    symbol: 'LNR',
  },
  {
    id: 14605,
    name: 'County Metaverse',
    symbol: 'COUNTY',
  },
  {
    id: 14606,
    name: 'Quid Token',
    symbol: 'QUID',
  },
  {
    id: 14607,
    name: 'PolyGod',
    symbol: 'GULL',
  },
  {
    id: 14608,
    name: 'Baby Lion',
    symbol: 'BLN',
  },
  {
    id: 14609,
    name: 'AxeDAO',
    symbol: 'AXE',
  },
  {
    id: 14614,
    name: 'Sabac Warrior',
    symbol: 'SW',
  },
  {
    id: 14615,
    name: 'Circlepod',
    symbol: 'CPX',
  },
  {
    id: 14617,
    name: 'PlanetVerse',
    symbol: 'PLANETVERSE',
  },
  {
    id: 14618,
    name: 'Hamdan Coin',
    symbol: 'HMC',
  },
  {
    id: 14619,
    name: 'Shelby TOKEN',
    symbol: 'SBY',
  },
  {
    id: 14620,
    name: 'Satoru Inu',
    symbol: 'SATO',
  },
  {
    id: 14621,
    name: 'Leonidas Token',
    symbol: 'LEONIDAS',
  },
  {
    id: 14622,
    name: 'Titania Token',
    symbol: 'TITANIA',
  },
  {
    id: 14623,
    name: 'TIMEXSPACE',
    symbol: 'TXS',
  },
  {
    id: 14628,
    name: 'PulseMoon',
    symbol: 'PULSEMOON',
  },
  {
    id: 14630,
    name: 'The Office NFT',
    symbol: 'OFFICE',
  },
  {
    id: 14631,
    name: 'Notional Finance',
    symbol: 'NOTE',
  },
  {
    id: 14636,
    name: 'DefiPlaza',
    symbol: 'DFP2',
  },
  {
    id: 14637,
    name: '2022MOON',
    symbol: '2022M',
  },
  {
    id: 14638,
    name: 'MiniHokk',
    symbol: 'MHOKK',
  },
  {
    id: 14641,
    name: 'InfinityDOT',
    symbol: 'IDOT',
  },
  {
    id: 14643,
    name: 'Baby o Baby',
    symbol: 'BOB',
  },
  {
    id: 14644,
    name: 'FLOKIFOMO',
    symbol: 'FLOKIFM',
  },
  {
    id: 14646,
    name: 'Crystal Kingdoms',
    symbol: 'CKG',
  },
  {
    id: 14647,
    name: 'Universal Floki Coin',
    symbol: 'UFLOKI',
  },
  {
    id: 14648,
    name: 'Baby Boxer',
    symbol: 'BBOXER',
  },
  {
    id: 14651,
    name: 'Weecoins',
    symbol: 'WCS',
  },
  {
    id: 14652,
    name: 'Zombie Skull Games',
    symbol: 'ZSKULL',
  },
  {
    id: 14656,
    name: 'MetaPortal',
    symbol: 'METAPORTAL',
  },
  {
    id: 14657,
    name: 'Thropic',
    symbol: 'THROPIC',
  },
  {
    id: 14659,
    name: 'Meta Inu Token',
    symbol: 'META',
  },
  {
    id: 14660,
    name: 'Reflecto',
    symbol: 'REFLECTO',
  },
  {
    id: 14662,
    name: 'AnonFloki',
    symbol: 'ANONFLOKI',
  },
  {
    id: 14663,
    name: 'Zuki',
    symbol: 'ZUKI',
  },
  {
    id: 14665,
    name: 'Centaurify',
    symbol: 'CENT',
  },
  {
    id: 14666,
    name: 'Rici Elon',
    symbol: 'RICI',
  },
  {
    id: 14667,
    name: 'Tanuki Token',
    symbol: 'TANUKI',
  },
  {
    id: 14668,
    name: 'Harmonized App',
    symbol: 'HMZ',
  },
  {
    id: 14669,
    name: 'Ridge',
    symbol: 'RIDGE',
  },
  {
    id: 14670,
    name: 'Unbanked',
    symbol: 'UNBNK',
  },
  {
    id: 14671,
    name: 'CoinTribe',
    symbol: 'CTRIBE',
  },
  {
    id: 14672,
    name: 'Wall Street Inu',
    symbol: 'WALLSTREETINU',
  },
  {
    id: 14673,
    name: 'Dulcet Garden',
    symbol: 'DLC',
  },
  {
    id: 14674,
    name: 'Refugees Token',
    symbol: 'RFG',
  },
  {
    id: 14678,
    name: 'Plateau Finance',
    symbol: 'PLT',
  },
  {
    id: 14679,
    name: 'Royal BET',
    symbol: 'RBET',
  },
  {
    id: 14681,
    name: 'Fabwelt',
    symbol: 'WELT',
  },
  {
    id: 14683,
    name: 'CertRise',
    symbol: 'CERT',
  },
  {
    id: 14684,
    name: 'x99Token',
    symbol: 'X99',
  },
  {
    id: 14685,
    name: 'Hero Inu',
    symbol: 'HEROS',
  },
  {
    id: 14686,
    name: 'DogeXmoon',
    symbol: 'DXM',
  },
  {
    id: 14687,
    name: 'Soccer Infinity',
    symbol: 'SOCIN',
  },
  {
    id: 14688,
    name: 'Naruto Inu',
    symbol: 'NARUTO',
  },
  {
    id: 14689,
    name: 'Island Boyz',
    symbol: '$ISLBYZ',
  },
  {
    id: 14690,
    name: 'Shiba Hex Pulse',
    symbol: 'SEXPLS',
  },
  {
    id: 14692,
    name: 'CoinSwap',
    symbol: 'COINS',
  },
  {
    id: 14693,
    name: 'flokidoge',
    symbol: '$FLOGE',
  },
  {
    id: 14694,
    name: 'Hydrogentoken',
    symbol: 'HGT',
  },
  {
    id: 14695,
    name: 'AOK',
    symbol: 'AOK',
  },
  {
    id: 14696,
    name: 'APIDAI',
    symbol: 'APIDAI',
  },
  {
    id: 14697,
    name: 'Royal Doge',
    symbol: 'RDOGE',
  },
  {
    id: 14699,
    name: 'RaceX',
    symbol: 'RACEX',
  },
  {
    id: 14700,
    name: 'Shiba Elon',
    symbol: 'ESHIB',
  },
  {
    id: 14701,
    name: 'MoonPaw',
    symbol: 'MOONPAW',
  },
  {
    id: 14702,
    name: 'ShibaBNB.org',
    symbol: 'SHIBABNB',
  },
  {
    id: 14703,
    name: 'SPLASH',
    symbol: 'SPL',
  },
  {
    id: 14705,
    name: 'MetaversePRO',
    symbol: 'META',
  },
  {
    id: 14706,
    name: 'MAD RABBIT',
    symbol: 'MADR',
  },
  {
    id: 14707,
    name: 'Yearn Cash',
    symbol: 'YFIC',
  },
  {
    id: 14709,
    name: 'srnArtGallery Tokenized Arts',
    symbol: 'SISTA',
  },
  {
    id: 14715,
    name: 'La Doge de Papel',
    symbol: 'LDDP',
  },
  {
    id: 14716,
    name: 'Bulldog Inu',
    symbol: 'BULLD',
  },
  {
    id: 14718,
    name: 'YetiCoin',
    symbol: 'YETIC',
  },
  {
    id: 14720,
    name: 'CryptoTwitter',
    symbol: 'CT',
  },
  {
    id: 14723,
    name: 'GenshinFlokiInu',
    symbol: 'GFloki',
  },
  {
    id: 14725,
    name: 'Phoneum Green',
    symbol: 'PHTG',
  },
  {
    id: 14726,
    name: 'Life Token V2',
    symbol: 'LTNV2',
  },
  {
    id: 14728,
    name: 'INTERSTELLAR DOMAIN ORDER',
    symbol: 'IDO',
  },
  {
    id: 14731,
    name: 'Carbon Coin',
    symbol: 'CXRBN',
  },
  {
    id: 14732,
    name: 'JokerManor Metaverse',
    symbol: 'JKT',
  },
  {
    id: 14733,
    name: 'Moon Sack',
    symbol: 'SACK',
  },
  {
    id: 14735,
    name: 'Meta Shiba',
    symbol: 'MESHI',
  },
  {
    id: 14736,
    name: 'Stadium Ape',
    symbol: 'SAPE',
  },
  {
    id: 14737,
    name: 'Elysium',
    symbol: 'LYS',
  },
  {
    id: 14739,
    name: 'Kepler452b',
    symbol: '452B',
  },
  {
    id: 14740,
    name: 'eShark Token',
    symbol: 'ESHK',
  },
  {
    id: 14741,
    name: 'Trusted Node',
    symbol: 'TNODE',
  },
  {
    id: 14742,
    name: 'Hat Swap City',
    symbol: 'HTC',
  },
  {
    id: 14743,
    name: 'Shibonics',
    symbol: 'SNIS',
  },
  {
    id: 14744,
    name: 'AdaKong',
    symbol: 'AKONG',
  },
  {
    id: 14745,
    name: 'Kromatika',
    symbol: 'KROM',
  },
  {
    id: 14746,
    name: 'Titano',
    symbol: 'TITANO',
  },
  {
    id: 14747,
    name: 'Salary',
    symbol: 'SLR',
  },
  {
    id: 14748,
    name: 'Snowdog',
    symbol: 'SDOG',
  },
  {
    id: 14749,
    name: 'Onyx',
    symbol: 'ONYX',
  },
  {
    id: 14750,
    name: 'Qubism',
    symbol: 'QUB',
  },
  {
    id: 14751,
    name: 'ZuFinance',
    symbol: 'ZUF',
  },
  {
    id: 14752,
    name: 'Original Gangsta Shiba',
    symbol: 'OGSHIB',
  },
  {
    id: 14753,
    name: 'BEM',
    symbol: 'BEMT',
  },
  {
    id: 14754,
    name: 'FarmPoly',
    symbol: 'POLY',
  },
  {
    id: 14755,
    name: 'SER',
    symbol: 'SER',
  },
  {
    id: 14756,
    name: 'Degen Ape Club',
    symbol: 'DAC',
  },
  {
    id: 14757,
    name: 'NFTPunk',
    symbol: 'NFTPUNK2.0',
  },
  {
    id: 14758,
    name: 'Ether Cards',
    symbol: 'DUST',
  },
  {
    id: 14759,
    name: 'LOL',
    symbol: 'LOL',
  },
  {
    id: 14760,
    name: 'ETHSNIPER',
    symbol: 'ETS',
  },
  {
    id: 14762,
    name: 'Motel Crypto',
    symbol: 'MOTEL',
  },
  {
    id: 14763,
    name: 'OptimusRise',
    symbol: 'ORE',
  },
  {
    id: 14764,
    name: 'Red Kishu',
    symbol: 'REDKISHU',
  },
  {
    id: 14765,
    name: 'Squid Moon',
    symbol: 'SQM',
  },
  {
    id: 14766,
    name: 'Doge Gay Son',
    symbol: 'GOGE',
  },
  {
    id: 14767,
    name: 'The Coop Network',
    symbol: 'GMD',
  },
  {
    id: 14768,
    name: 'HashLand',
    symbol: 'HC',
  },
  {
    id: 14769,
    name: 'Pool Token',
    symbol: 'POOL',
  },
  {
    id: 14771,
    name: 'Splash',
    symbol: 'SPLASH',
  },
  {
    id: 14772,
    name: 'No Face Inu',
    symbol: 'NOFACE',
  },
  {
    id: 14774,
    name: 'Shibnobi',
    symbol: 'SHINJA',
  },
  {
    id: 14775,
    name: 'Cowboy Bebop Corgi',
    symbol: 'WOOLONG',
  },
  {
    id: 14776,
    name: 'MetaBean',
    symbol: 'METABEAN',
  },
  {
    id: 14777,
    name: 'GiftBag',
    symbol: 'GBAG',
  },
  {
    id: 14778,
    name: 'Fans of Doge',
    symbol: 'DOGEFANS',
  },
  {
    id: 14779,
    name: 'MicroPee',
    symbol: 'PEE',
  },
  {
    id: 14780,
    name: 'PIggyBankDAO',
    symbol: 'PB',
  },
  {
    id: 14783,
    name: 'MAGIC',
    symbol: 'MAGIC',
  },
  {
    id: 14784,
    name: 'Squirt Game',
    symbol: 'SQUIRT',
  },
  {
    id: 14786,
    name: 'Girl Story',
    symbol: 'METAGIRL',
  },
  {
    id: 14789,
    name: 'Project: One Whale',
    symbol: 'POW',
  },
  {
    id: 14790,
    name: 'Baby Tiger King',
    symbol: 'BABYTK',
  },
  {
    id: 14792,
    name: 'Dog Club Token',
    symbol: 'DCLUB',
  },
  {
    id: 14793,
    name: 'MYRA AI',
    symbol: 'MYRA',
  },
  {
    id: 14795,
    name: 'SappChat',
    symbol: 'APP',
  },
  {
    id: 14796,
    name: 'Cultiplan(CTPL)',
    symbol: 'CTPL',
  },
  {
    id: 14797,
    name: 'ENHANCE',
    symbol: 'ENHANCE',
  },
  {
    id: 14799,
    name: 'Versus Farm',
    symbol: 'VERSUS',
  },
  {
    id: 14802,
    name: 'AVENGERSCOIN',
    symbol: 'AVC',
  },
  {
    id: 14803,
    name: 'Aurora',
    symbol: 'AURORA',
  },
  {
    id: 14804,
    name: 'Baby Trader Joe',
    symbol: 'BJOE',
  },
  {
    id: 14805,
    name: 'ThunderRacer',
    symbol: 'RACERR',
  },
  {
    id: 14806,
    name: 'ConstitutionDAO',
    symbol: 'PEOPLE',
  },
  {
    id: 14807,
    name: 'Cosmic Coin',
    symbol: 'COSMIC',
  },
  {
    id: 14808,
    name: 'PN Token',
    symbol: 'PN',
  },
  {
    id: 14809,
    name: 'Zada',
    symbol: 'ZADA',
  },
  {
    id: 14813,
    name: 'Trump Inu',
    symbol: 'TRUMP',
  },
  {
    id: 14814,
    name: 'BNB Hero Token',
    symbol: 'BNBH',
  },
  {
    id: 14815,
    name: 'BambiUSDT',
    symbol: 'BAMUSDT',
  },
  {
    id: 14816,
    name: 'Dry Doge Metaverse',
    symbol: 'DRYDOGE',
  },
  {
    id: 14819,
    name: 'MiniSatoshiBsc',
    symbol: 'SBSC',
  },
  {
    id: 14820,
    name: 'Infinity Rocket Token',
    symbol: 'IRT',
  },
  {
    id: 14821,
    name: 'FrogZilla',
    symbol: 'FZL',
  },
  {
    id: 14823,
    name: 'WAGMI',
    symbol: '$WAGMI',
  },
  {
    id: 14826,
    name: 'MetaZuckZilla',
    symbol: 'META',
  },
  {
    id: 14827,
    name: 'ALANO',
    symbol: 'ALANO',
  },
  {
    id: 14831,
    name: 'EverDot',
    symbol: 'EVERDOT',
  },
  {
    id: 14832,
    name: 'Mob Inu',
    symbol: 'MOB',
  },
  {
    id: 14833,
    name: 'SportForAll',
    symbol: 'SFA',
  },
  {
    id: 14835,
    name: 'Caketools',
    symbol: 'CKT',
  },
  {
    id: 14836,
    name: 'Day Of Defeat',
    symbol: 'DOD',
  },
  {
    id: 14837,
    name: 'Baby Meta',
    symbol: 'BABYMETA',
  },
  {
    id: 14838,
    name: 'Artificial Intelligence',
    symbol: 'AI',
  },
  {
    id: 14840,
    name: 'ClassicDoge',
    symbol: 'XDOGE',
  },
  {
    id: 14844,
    name: 'MetaGameHub DAO',
    symbol: 'MGH',
  },
  {
    id: 14845,
    name: 'Liquidity Accelerator Token',
    symbol: 'LAT',
  },
  {
    id: 14846,
    name: 'Santa Floki',
    symbol: 'HOHOHO',
  },
  {
    id: 14847,
    name: 'Articuno Inu',
    symbol: 'ARTICUNO',
  },
  {
    id: 14848,
    name: 'Banana Bucks',
    symbol: 'BAB',
  },
  {
    id: 14849,
    name: 'Centcex',
    symbol: 'CENX',
  },
  {
    id: 14850,
    name: 'Buff Samo',
    symbol: 'BSAMO',
  },
  {
    id: 14852,
    name: 'Pissing Cat',
    symbol: 'PEECAT',
  },
  {
    id: 14854,
    name: 'Kanpeki',
    symbol: 'KAE',
  },
  {
    id: 14855,
    name: 'Haven token',
    symbol: 'HAVEN',
  },
  {
    id: 14856,
    name: 'BLACK SHIBA INU',
    symbol: 'SHIBB',
  },
  {
    id: 14857,
    name: 'ShineDAO',
    symbol: 'SHN',
  },
  {
    id: 14858,
    name: 'Baby Yooshi',
    symbol: 'BABY YOOSHI',
  },
  {
    id: 14861,
    name: 'Fortress DAO',
    symbol: 'FORT',
  },
  {
    id: 14863,
    name: 'Tipsy',
    symbol: 'TIPSY',
  },
  {
    id: 14864,
    name: 'MUSKARDASHIAN',
    symbol: 'MUSKARDASHIAN',
  },
  {
    id: 14865,
    name: 'DOK Token',
    symbol: 'DOK',
  },
  {
    id: 14866,
    name: 'Meta Shiba',
    symbol: 'METASHIB',
  },
  {
    id: 14867,
    name: 'ETHER TERRESTRIAL',
    symbol: 'ET',
  },
  {
    id: 14868,
    name: 'xMooney',
    symbol: 'XM',
  },
  {
    id: 14869,
    name: 'The Moon Shiba',
    symbol: 'MOONSHIB',
  },
  {
    id: 14871,
    name: 'Windfall Token',
    symbol: 'WFT',
  },
  {
    id: 14872,
    name: 'HUGHUG Coin',
    symbol: 'HGHG',
  },
  {
    id: 14873,
    name: 'GoofyDoge',
    symbol: 'GoofyDoge',
  },
  {
    id: 14874,
    name: 'Mars Space X',
    symbol: 'MPX',
  },
  {
    id: 14875,
    name: 'Red Shiba Token',
    symbol: 'RST',
  },
  {
    id: 14879,
    name: 'META GROW',
    symbol: 'META',
  },
  {
    id: 14880,
    name: 'Simply',
    symbol: 'SIMPLY',
  },
  {
    id: 14885,
    name: 'Coinscope',
    symbol: 'COINSCOPE',
  },
  {
    id: 14889,
    name: 'SuperPoocoin',
    symbol: 'SUPERPOO',
  },
  {
    id: 14890,
    name: 'Astronos',
    symbol: 'ASTRO',
  },
  {
    id: 14893,
    name: 'EvilSquidGame',
    symbol: 'EVILSQUID',
  },
  {
    id: 14895,
    name: 'Santa Inu',
    symbol: 'SANINU',
  },
  {
    id: 14896,
    name: 'Tag Protocol',
    symbol: 'TAG',
  },
  {
    id: 14897,
    name: 'War of Tribes',
    symbol: 'WOTG',
  },
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = crypto_list.length;
  displayList: any[] = [];

  constructor(private httpClient: HttpClient) {}

  getHistory() {
    from(crypto_list)
      .pipe(
        // take(20),
        // tap((item) => console.log(`coin ${item.name} has come`)),
        concatMap((item) => {
          return this.httpClient
            .get(
              `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical?id=${item.id}&convertId=2781&timeStart=1635292800&timeEnd=1635379200`
            )
            .pipe(
              catchError((err) =>
                of({ data: { name: '', id: '', symbol: '', quotes: [] } })
              ),
              map((item: any) => {
                return {
                  name: item.data.name,
                  id: item.data.id,
                  symbol: item.data.symbol,
                  cap: this.getPercent(item.data.quotes),
                };
              })
            );
        })
        // takeWhile((ev: any) => {
        //   if (ev.cap > 0 && ev.cap > 20) return true;
        //   if (ev.cap < 0 && ev.cap < -20) return true;
        // })
      )
      .subscribe((data: any) => {
        if (
          (data.cap < 0 && data.cap < -20) ||
          (data.cap > 0 && data.cap > 20)
        ) {
          this.displayList.push(data);
        }
      });
  }

  getPercent(quotes: any[]) {
    const [old, latest] = quotes;
    const percentValue =
      ((latest.quote.marketCap - old.quote.marketCap) * 100) /
      latest.quote.marketCap;
    return percentValue.toFixed(2);
  }
}
