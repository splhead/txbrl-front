export default {
  'xbrli:xbrl': {
    '@_xmlns:xbrli': 'http://www.xbrl.org/2003/instance',
    '@_xmlns:gl-bus': 'http://www.xbrl.org/int/gl/bus/2015-03-25',
    '@_xmlns:gl-cor': 'http://www.xbrl.org/int/gl/cor/2015-03-25',
    '@_xmlns:iso4217': 'http://www.xbrl.org/2003/iso4217',
    '@_xmlns:link': 'http://www.xbrl.org/2003/linkbase',
    '@_xmlns:xlink': 'http://www.w3.org/1999/xlink',
    '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'link:schemaRef': {
      '@_xlink:href':
        'SICONFI/cor/ext/gl/plt/case-c-b-m-u-t-s/gl-plt-all-2015-03-25.xsd',
      '@_xlink:type': 'simple'
    },
    'xbrli:context': {
      'xbrli:entity': {
        'xbrli:identifier': {
          '#text': '1100205EX',
          '@_scheme': 'http://siconfi.tesouro.gov.br'
        }
      },
      'xbrli:period': { 'xbrli:instant': '2022-07-31' },
      '@_id': 'C1'
    },
    'xbrli:unit': [{ 'xbrli:measure': 'iso4217:BRL', '@_id': 'BRL' }],
    'gl-cor:accountingEntries': {
      'gl-cor:documentInfo': {
        'gl-cor:entriesType': { '#text': 'trialbalance', '@_contextRef': 'C1' }
      },
      'gl-cor:entityInformation': {
        'gl-bus:reportingCalendar': {
          'gl-bus:reportingCalendarPeriod': {
            'gl-bus:periodIdentifier': {
              '#text': '2022-07',
              '@_contextRef': 'C1'
            },
            'gl-bus:periodDescription': {
              '#text': '2022-07-01',
              '@_contextRef': 'C1'
            },
            'gl-bus:periodStart': {
              '#text': '2022-07-01',
              '@_contextRef': 'C1'
            },
            'gl-bus:periodEnd': { '#text': '2022-07-31', '@_contextRef': 'C1' }
          }
        }
      },
      'gl-cor:entryHeader': {
        'gl-cor:entryDetail': [
          {
            'gl-cor:lineNumberCounter': {
              '#text': 1,
              '@_contextRef': 'C1',
              '@_decimals': '0',
              '@_unitRef': 'u'
            },
            'gl-cor:account': {
              'gl-cor:accountMainID': {
                '#text': 111110100,
                '@_contextRef': 'C1'
              },
              'gl-cor:accountSub': [
                {
                  'gl-cor:accountSubID': {
                    '#text': 10131,
                    '@_contextRef': 'C1'
                  },
                  'gl-cor:accountSubType': {
                    '#text': 'PO',
                    '@_contextRef': 'C1'
                  }
                }
              ]
            },
            'gl-cor:amount': {
              '#text': 1388187.15,
              '@_contextRef': 'C1',
              '@_decimals': '2',
              '@_unitRef': 'BRL'
            },
            'gl-cor:debitCreditCode': { '#text': 'C', '@_contextRef': 'C1' },
            'gl-cor:xbrlInfo': {
              'gl-cor:xbrlInclude': {
                '#text': 'beginning_balance',
                '@_contextRef': 'C1'
              }
            }
          }
        ]
      }
    }
  }
}
