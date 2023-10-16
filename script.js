// Initialize EmailJS with your Public Key
emailjs.init('sID7xtcPInxddZWqd');

$(document).ready(function () {
   function updateTotal(price) {
      var vat = price * 0.15;
      var subtotal = price;
      var shippingPercentage = 4.96;
      var shipping = (price * shippingPercentage / 100).toFixed(2);
      var deliveryFee = 0;

      if ($('#choice').val() == "2") {
         deliveryFee = 15;
      }

      var grandTotal = subtotal + parseFloat(shipping) + vat + deliveryFee;

      if ($('#choice').val() == "1") {
         var discount = grandTotal * 0.05;
         grandTotal -= discount;
      }

      if ($('#choice').val() == "3") {
         var discount = grandTotal * 0.20;
         grandTotal -= discount;
      }

      $('#ST').text(subtotal.toFixed(2) + ' EGP');
      $('#VAT').text(vat.toFixed(2) + ' EGP');
      $('#Ship').text(shipping + ' EGP');
      $('#DeliveryFee').text(deliveryFee.toFixed(2) + ' EGP');
      $('#GT').text(grandTotal.toFixed(2) + ' EGP');
      $('#modalGT').text(grandTotal.toFixed(2) + ' EGP');
   }

   $('.pos-card').click(function () {
      $('.desc').removeClass('reveal');
      $(this).find('.desc').toggleClass('reveal');
   });

   $('.refer').click(function (e) {
      e.stopPropagation();
      $('.positions').addClass('fadeOut');
      $('.refer-card').addClass('fade');
      $('.return').fadeIn('fast');
   });

   $('.return').click(function () {
      $('.refer-card').removeClass('fade');
      $(this).hide();
      $('.positions').delay('200').removeClass('fadeOut');
      $('.desc').removeClass('reveal');
   });

   $('#pos_1 .refer').click(function () {
      var price = 10.50;
      $('#position').val('5').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_2 .refer').click(function () {
      var price = 21;
      $('#position').val('10').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_3 .refer').click(function () {
      var price = 36.75;
      $('#position').val('25').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_4 .refer').click(function () {
      var price = 47.25;
      $('#position').val('50').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_5 .refer').click(function () {
      var price = 73.50;
      $('#position').val('100').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_6 .refer').click(function () {
      var price = 94.50;
      $('#position').val('150').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_7 .refer').click(function () {
      var price = 136.50;
      $('#position').val('200').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('#pos_8 .refer').click(function () {
      var price = 171.99;
      $('#position').val('250').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      $('#choice option[value="2"]').show();
      $('#choice option[value="3"]').hide();
      updateTotal(price);
   });

   $('.btn').click(function () {
      $('.dropdown-menu').toggle();
   });

   $('#choice').change(function () {
      if ($(this).val() == "") {
         $(this).addClass("empty");
      } else {
         $(this).removeClass("empty");
         updateTotal(getPrice());
      }
   });

   $('form > div input, form > div select').change(function () {
      var empty = false;

      $('.req').each(function () {
         if ($(this).val() == "") {
            $(this).removeClass('ui-full');
         } else {
            $(this).addClass('ui-full');
         }
      });

      if ($('#choice').val() == "") {
         empty = true;
      }

      $('form > div input').each(function () {
         if ($(this).val() == '') {
            empty = true;
         }
      });

      if (empty) {
         $('#btn').attr('disabled', 'disabled');
      } else {
         $('#btn').removeAttr('disabled');
      }
   });

   $('.referral').submit(function (e) {
      if (this.checkValidity()) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, 600);
  
        // Fetch user's name and email from the input fields
        var username = $('#name').val();
        var email = $('#email').val();
  
        // Fetch other form data
        var position = $('#position').val();
        var ST = $('#ST').text();
        var Ship = $('#Ship').text();
        var DeliveryFee = $('#DeliveryFee').text();
        var VAT = $('#VAT').text();
        var GT = $('#GT').text();
  
        $('#refer_name').html(username); // Update the name in the modal
        $('#refer_pos').html(position); // You can display the position here if needed
        $('.modal').slideDown().addClass('show').removeClass('shrink');
  
        submitForm(username, email, position, ST, Ship, DeliveryFee, VAT, GT);
      }
   });

   $('.close-modal').click(function () {
      $('.modal').removeClass('show').addClass('shrink').slideUp();
   });

   $('.reset').click(function () {
      $('.modal').removeClass('show').addClass('shrink').slideUp();
      $('.req').val("").removeClass('ui-full');
      $('#choice').val("").addClass('empty');
      $('#btn').attr('disabled', 'disabled');
   });

   $('select').focus(function () {
      $('.dropdown-wrapper').addClass('outline');
   });

   $('select').on('focusout', function () {
      $('.dropdown-wrapper').removeClass('outline');
   });

   function getPrice() {
      var price = 0;
      var selectedPos = $('#position').val();

      switch (selectedPos) {
         case "5":
            price = 10.50;
            break;
         case "10":
            price = 21;
            break;
         case "25":
            price = 36.75;
            break;
         case "50":
            price = 47.25;
            break;
         case "100":
            price = 73.50;
            break;
         case "150":
            price = 94.50;
            break;
         case "200":
            price = 136.50;
            break;
         case "250":
            price = 171.99;
            break;
      }

      return price;
   }

   function submitForm() {
      var username = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var position = document.getElementById('position').value;
      var ST = document.getElementById('ST').textContent;
      var Ship = document.getElementById('Ship').textContent;
      var DeliveryFee = document.getElementById('DeliveryFee').textContent;
      var VAT = document.getElementById('VAT').textContent;
      var GT = document.getElementById('GT').textContent;
   
      // Send email to the user
      emailjs.send("service_l7qskse", "template_yfw3mdg", {
         username: username,
         position: position,
         ST: ST,
         Ship: Ship,
         DeliveryFee: DeliveryFee,
         VAT: VAT,
         GT: GT,
         email: email
      }).then(function (response) {
         console.log("Email sent successfully to the user.");
      }, function (error) {
         console.error("Error sending email to the user:", error);
      });
   
      // Send email to the supervisor
      emailjs.send("service_l7qskse", "template_usctlqk", {
         username: username, // Replace "Supervisor" with the recipient's name or other identifier
         position: position,
         ST: ST,
         Ship: Ship,
         DeliveryFee: DeliveryFee,
         VAT: VAT,
         GT: GT,
         email: "darkshadowplayz1@gmail.com" // Replace with the actual supervisor's email address
      }).then(function (response) {
         console.log("Email sent to supervisor successfully.");
      }, function (error) {
         console.error("Error sending email to supervisor:", error);
      });
   }
});

window.addEventListener('load', function () {
   // Generate a random delay between 6 to 9 seconds (6000ms to 9000ms)
   var randomDelay = Math.floor(Math.random() * 3000) + 6000;
 
   // Simulate delay
   setTimeout(function () {
     var loader = document.getElementById('loader');
     var mainContent = document.getElementById('main-content');
 
     loader.style.display = 'none';
     mainContent.style.display = 'block';
   }, randomDelay);
});

document.getElementById("robux-dropdown").addEventListener("change", function() {
   var selectedValue = this.value;
});

document.getElementById("robux-dropdown").addEventListener("change", function() {
   var selectedValue = this.value;
   if (selectedValue === "sa") {
     window.location.href = "https://rblxdeveloper.github.io/BuyRobux.sa/";
   }
 });