window.ordeloData = {
    products: [{
            code: 'NLS-01',
            name: 'Navy linen shirt',
            price: 68,
            sizes: 'XS–XXL',
            stock: 42
        },
        {
            code: 'SST-02',
            name: 'Sandstone tee',
            price: 32,
            sizes: 'XS–XL',
            stock: 86
        },
        {
            code: 'OFC-03',
            name: 'Olive field coat',
            price: 148,
            sizes: 'S–XL',
            stock: 14
        },
        {
            code: 'CWD-04',
            name: 'Canvas weekend bag',
            price: 84,
            sizes: 'One size',
            stock: 27
        },
        {
            code: 'RKN-05',
            name: 'Rib knit polo',
            price: 74,
            sizes: 'S–XXL',
            stock: 31
        },
        {
            code: 'CSP-06',
            name: 'Cotton stripe pants',
            price: 96,
            sizes: '28–38',
            stock: 19
        },
        {
            code: 'LCT-07',
            name: 'Leather court sneaker',
            price: 126,
            sizes: '7–13',
            stock: 22
        },
        {
            code: 'WCB-08',
            name: 'Wool chore blazer',
            price: 188,
            sizes: 'S–XL',
            stock: 8
        }
    ],
    customers: [{
            id: 'c1',
            name: 'Maya Chen',
            initials: 'MC',
            phone: '+1 (415) 555-0184',
            channels: ['Messenger', 'Website'],
            tags: ['Repeat buyer', 'VIP'],
            address: '245 Valencia St, San Francisco, CA 94103',
            orders: 4,
            spent: 324
        },
        {
            id: 'c2',
            name: 'Jordan Lee',
            initials: 'JL',
            phone: '+1 (312) 555-0112',
            channels: ['Instagram'],
            tags: ['New lead'],
            address: '1884 N Damen Ave, Chicago, IL 60647',
            orders: 1,
            spent: 68
        },
        {
            id: 'c3',
            name: 'Priya Nair',
            initials: 'PN',
            phone: '+1 (718) 555-0169',
            channels: ['WhatsApp', 'Website'],
            tags: ['Sizing help'],
            address: '47-11 39th Ave, Queens, NY 11104',
            orders: 2,
            spent: 212
        },
        {
            id: 'c4',
            name: 'Leo Martins',
            initials: 'LM',
            phone: '+1 (305) 555-0191',
            channels: ['TikTok'],
            tags: ['Creator'],
            address: '920 Brickell Bay Dr, Miami, FL 33131',
            orders: 1,
            spent: 84
        },
        {
            id: 'c5',
            name: 'Elena Rossi',
            initials: 'ER',
            phone: '+1 (206) 555-0146',
            channels: ['Instagram', 'Messenger'],
            tags: ['Returning'],
            address: '1101 E Pike St, Seattle, WA 98122',
            orders: 3,
            spent: 436
        },
        {
            id: 'c6',
            name: 'Theo Brooks',
            initials: 'TB',
            phone: '+1 (512) 555-0133',
            channels: ['Website'],
            tags: ['Wholesale'],
            address: '702 W 5th St, Austin, TX 78701',
            orders: 2,
            spent: 296
        }
    ],
    conversations: [{
            id: 'conv1',
            customerId: 'c1',
            channel: 'Messenger',
            last: 'Do you have the navy linen shirt in medium?',
            time: '2m',
            owner: 'AI answering',
            messages: [{
                from: 'customer',
                text: 'Hi! Do you have the navy linen shirt in medium?',
                time: '10:42 AM'
            }]
        },
        {
            id: 'conv2',
            customerId: 'c2',
            channel: 'Instagram',
            last: 'Thanks, I will check the size guide!',
            time: '18m',
            owner: 'AI answering',
            messages: [{
                from: 'customer',
                text: 'Can you help me find a shirt for a summer wedding?',
                time: '10:24 AM'
            }, {
                from: 'ai',
                text: 'The navy linen shirt is a great pick for that. Want to see details?',
                time: '10:25 AM'
            }]
        },
        {
            id: 'conv3',
            customerId: 'c3',
            channel: 'WhatsApp',
            last: 'Is the rib knit polo machine washable?',
            time: '42m',
            owner: 'AI answering',
            messages: [{
                from: 'customer',
                text: 'Is the rib knit polo machine washable?',
                time: '10:00 AM'
            }]
        },
        {
            id: 'conv4',
            customerId: 'c4',
            channel: 'TikTok',
            last: 'I need the navy linen shirt in a large',
            time: '1h',
            owner: 'AI answering',
            messages: [{
                from: 'customer',
                text: 'Hey! I saw your navy linen shirt on TikTok.',
                time: '9:37 AM'
            }]
        },
        {
            id: 'conv5',
            customerId: 'c5',
            channel: 'Website',
            last: 'My order arrived with the wrong size',
            time: '2h',
            owner: 'Sofia M.',
            messages: [{
                from: 'customer',
                text: 'My order arrived with the wrong size',
                time: '8:41 AM'
            }, {
                from: 'ai',
                text: 'I’m sorry about that. I’ll bring in a teammate to help make this right.',
                time: '8:42 AM'
            }, {
                from: 'event',
                text: 'Sofia M. took over this conversation',
                time: '8:43 AM'
            }]
        },
        {
            id: 'conv6',
            customerId: 'c6',
            channel: 'Messenger',
            last: 'Can I get a wholesale line sheet?',
            time: '3h',
            owner: 'AI answering',
            messages: [{
                from: 'customer',
                text: 'Can I get a wholesale line sheet?',
                time: '7:34 AM'
            }]
        }
    ],
    orders: [{
            id: '#1048',
            customerId: 'c1',
            items: 'Navy linen shirt × 1',
            total: 68,
            payment: 'Paid',
            status: 'Delivered',
            channel: 'Messenger',
            history: ['Order placed · Messenger', 'Packed by warehouse', 'Delivered Oct 18']
        },
        {
            id: '#1047',
            customerId: 'c5',
            items: 'Wool chore blazer × 1',
            total: 188,
            payment: 'Paid',
            status: 'Shipped',
            channel: 'Instagram',
            history: ['Order placed · Instagram', 'Packed by warehouse', 'Shipped Oct 22']
        },
        {
            id: '#1046',
            customerId: 'c3',
            items: 'Cotton stripe pants × 1',
            total: 96,
            payment: 'Paid',
            status: 'Processing',
            channel: 'WhatsApp',
            history: ['Order placed · WhatsApp', 'Payment confirmed']
        },
        {
            id: '#1045',
            customerId: 'c6',
            items: 'Canvas weekend bag × 2',
            total: 168,
            payment: 'Paid',
            status: 'Delivered',
            channel: 'Website',
            history: ['Order placed · Website', 'Delivered Oct 16']
        },
        {
            id: '#1044',
            customerId: 'c2',
            items: 'Navy linen shirt × 1',
            total: 68,
            payment: 'Paid',
            status: 'Processing',
            channel: 'Instagram',
            history: ['Order placed · Instagram', 'Payment confirmed']
        },
        {
            id: '#1043',
            customerId: 'c5',
            items: 'Leather court sneaker × 1',
            total: 126,
            payment: 'Paid',
            status: 'Shipped',
            channel: 'Messenger',
            history: ['Order placed · Messenger', 'Shipped Oct 21']
        },
        {
            id: '#1042',
            customerId: 'c4',
            items: 'Canvas weekend bag × 1',
            total: 84,
            payment: 'Paid',
            status: 'Delivered',
            channel: 'TikTok',
            history: ['Order placed · TikTok', 'Delivered Oct 14']
        },
        {
            id: '#1041',
            customerId: 'c3',
            items: 'Rib knit polo × 1',
            total: 74,
            payment: 'Refunded',
            status: 'Cancelled',
            channel: 'WhatsApp',
            history: ['Order placed · WhatsApp', 'Refund issued Oct 12']
        },
        {
            id: '#1040',
            customerId: 'c6',
            items: 'Olive field coat × 1',
            total: 148,
            payment: 'Paid',
            status: 'Processing',
            channel: 'Website',
            history: ['Order placed · Website', 'Payment confirmed']
        }
    ],
    rules: ['Always confirm the saved address before creating an order.', 'Suggest the navy linen shirt when customers ask for a breathable summer layer.'],
    unanswered: ['Can you send a wholesale line sheet?', 'Do you offer international shipping?', 'Can I change my delivery address?', 'Is this item available in a custom color?']
};