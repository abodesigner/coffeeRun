// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = Stripe('pk_test_8MNcbxfE9pHh7cnfcOaKn9Dp00kWdR2uPW');
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
const style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: '#32325d',
    },
};

// Create an instance of the card Element.
const card = elements.create('cardNumber', {

    classes: {
        base: "form-control",
        // focus: 'green',
        invalid: 'error'
    },

    // style: {
    //     base: {
    //         color: "green"
    //     }

    // }
});


const cvc = elements.create('cardCvc', {
    classes: {
        base: "form-control",
        invalid: 'error'
    },

});

const exp = elements.create('cardExpiry', {
    classes: {
        base: "form-control",
        invalid: 'error'
    },
});



// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-number');
cvc.mount('#card-cvc');
exp.mount('#card-exp');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle form submission.
var form = document.getElementById('payment-form');
if (form) {

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the user if there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                stripeTokenHandler(result.token);
            }
        });
    });
}

// Submit the form with the token ID.
function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', '_stripe_token');  // <-- important
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    // Submit the form
    form.submit();
}