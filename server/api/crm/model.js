"use strict";

let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let logger      = require(`${process.cwd()}/utils/logger`);
// let validate = require('mongoose-validator');

// place for validators
//
// -----------


// MODEL
let companyModel = function() {
    let Company = Schema({
        name : {
            type : String,
            required : true
        },
        login: {
            email: {
                type: String,
                required: true
            },
            pwd : {
                type : String,
                required : true
            }
        },
        vat : {
            prefix : {
                type : String,
                required : true
            },
            num : {
                type : String,
                required : true
            },
            siren : String,
            rcs : String
        },
        clients: [{
            // link to the client collection
            type: Schema.Types.ObjectId,
            ref: 'client'
        }],
        contact : {
            street : {
                type : String,
                required : true
            },
            number : {
                type : Number,
                required : true
            },
            box : String,
            zip : {
                type : String,
                required : true
            },
            town : {
                type : String,
                required : true
            },
            country : {
                type : String,
                required : true
            },
            mail : {
                type : String,
                required : true
            },
            phonemain : {
                type : String,
                required : true
            },
            phonesec : String,
            fax : String,
            web : String
        }, 
        contactperson : {
            civility : {
                type : String,
                required : true
            },
            firstname : {
                type : String,
                required : true
            },
            lastname : {
                type : String,
                required : true
            },
            post : String,
            mail : {
                type : String,
                required : true
            },
            phonemain : {
                type : String,
                required : true
            },
            phonesec : String
        },
        paymentinfo : {
            bank : [{
                name : String,
                iban : String,
                bic : String
            }],
            paypal : [{
                name : String,
                mail : String
            }]
        },
        logo : String,
        billsettings : {
            // link of the file on the server
            template : String,
            // rule for the auto-generated bill number
            rule : String
        },
        bills: [{
            type: Schema.Types.ObjectId,
            ref: 'bill'
        }],
        credits: [{
            bill_id: String,
            amount: Number
        }],
        // Terms of Sales
        terms : String,
        articles : [{
            name : String,
            description : String,
            pricetype : String,
            price : Number,
            vat : Number
        }],
        createdat : {
            type : Date,
            required : true
        },
        updatedat : {
            type : Date,
            default : Date.now
        }
    });

    let Bill = Schema({
        link: String,
        iseditable: {
            type: Boolean,
            required: true
        },
        iscredit: {
            type: Boolean,
            required: true
        },
        iscredited: Boolean,
        number: {
            type: String,
            required : true
        },
        date: {
            type: Date,
            required : true
        },
        creditdate: Date,
        client: {
            type: Schema.Types.ObjectId,
            ref: 'client'
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'company'
        },
        project: {
            name: {
                type: String,
                required : true
            },
            begin: {
                type: Date,
                required : true
            },
            end: {
                type: Date,
                required : true
            }
        },
        details: {
            articles: [{
                name : String,
                description: String,
                pricetype: String,
                quantity: Number,
                price: Number,
                amount: Number,
                vat: Number,
            }],
            totxvat: Number,
            refund: Number,
            // %, €, ...
            refundtype: String,
            utotxvat: Number,
            vat: Number,
            utotal: Number,
            // amount already payed by the client
            advance: Number,
            total: Number,
            credit: Number,
            totcredit: Number
        },
        deadline: {
            type: String,
            required : true
        },
        // can have multiple data type in function of the account type
        primaccount: Schema.Types.Mixed,
        secaccount: Schema.Types.Mixed,

        note: String,
        payedat : Date,
        createdat : {
            type : Date,
            required : true
        },
        updatedat : {
            type : Date,
            default : Date.now
        }
    });

    let Client = Schema({
        name : {
            type : String,
            required : true
        },
        iscompany : {
            type : Boolean,
            required : true
        },
        vat : {
            prefix : String,
            num : String,
            siren : String,
            rcs : String
        },
        billinginfo : {
            civility : String,
            firstname : String,
            lastname : String,
            street : {
                type : String,
                required : true
            },
            number : {
                type : Number,
                required : true
            },
            box : String,
            zip : {
                type : String,
                required : true
            },
            town : {
                type : String,
                required : true
            },
            country : {
                type : String,
                required : true
            },
            mail : {
                type : String,
                required : true
            },
            phonemain : {
                type : String,
                required : true
            },
            phonesec : String,
            fax : String
        },
        deliveryinfo : {
            civility : String,
            firstname : String,
            lastname : String,
            company : String,
            street : {
                type : String,
                required : true
            },
            number : {
                type : Number,
                required : true
            },
            box : String,
            zip : {
                type : String,
                required : true
            },
            town : {
                type : String,
                required : true
            },
            country : {
                type : String,
                required : true
            }
        }, 
        contactperson : {
            civility : {
                type : String,
                required : true
            },
            firstname : {
                type : String,
                required : true
            },
            lastname : {
                type : String,
                required : true
            },
            post : String,
            mail : {
                type : String,
                required : true
            },
            phonemain : {
                type : String,
                required : true
            },
            phonesec : String,
        },
        bills: [{
            type: Schema.Types.ObjectId,
            ref: 'bill'
        }],
        picture : String,
        memo : String,
        createdat : {
            type : Date,
            required : true
        },
        updatedat : {
            type : Date,
            default : Date.now
        }
    });

    let Param = Schema({
        rules : [{
            // Payable au grand comptant
            type : String,
            required : true
        }],
        refunds : [{
            // %, €, $, &
            type : String,
            required : true
        }],
        countries : [{
            type : String,
            required : true
        }],
        vatrate : [{
            // 0, 6, 21
            type : Number,
            required : true
        }],
        vatprefix : [{
            // BE, FR, ...
            type : String,
            required : true
        }],
        types : [{
            type : String,
            required : true
        }]
    });

    var Base = mongoose.model('company', Company, 'companies');
    var exports = module.exports = Base;
    Base.Client = mongoose.model('client', Client, 'clients');
    Base.Bill = mongoose.model('bill', Bill, 'bills');
    Base.Param = mongoose.model('param', Param, 'params');

    return Base;
};
module.exports = new companyModel();