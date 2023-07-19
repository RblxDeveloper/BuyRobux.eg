// Initialize EmailJS with your Public Key
emailjs.init('sID7xtcPInxddZWqd');

$(document).ready(function () {
   function updateTotal(price) {
      var vat = price * 0.15;
      var subtotal = price;
      var shippingPercentage = 3;
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
      var price = 10;
      $('#position').val('5').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      updateTotal(price);
   });

   $('#pos_2 .refer').click(function () {
      var price = 20;
      $('#position').val('10').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      updateTotal(price);
   });

   $('#pos_3 .refer').click(function () {
      var price = 35;
      $('#position').val('25').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      updateTotal(price);
   });

   $('#pos_4 .refer').click(function () {
      var price = 45;
      $('#position').val('50').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      updateTotal(price);
   });

   $('#pos_5 .refer').click(function () {
      var price = 70;
      $('#position').val('100').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
      updateTotal(price);
   });

   $('#pos_6 .refer').click(function () {
      var price = 90;
      $('#position').val('150').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').show();
      $('#choice option[value="2"]').show();
      updateTotal(price);
   });

   $('#pos_7 .refer').click(function () {
      var price = 130;
      $('#position').val('200').addClass('ui-full');
      $('#choice').val(0).removeClass('empty');
      $('#choice option[value="1"]').hide();
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

         $('#refer_name').html($('#name').val());
         $('#refer_pos').html($('#position').val());
         $('.modal').slideDown().addClass('show').removeClass('shrink');

         submitForm();
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
            price = 10;
            break;
         case "10":
            price = 20;
            break;
         case "25":
            price = 35;
            break;
         case "50":
            price = 45;
            break;
         case "100":
            price = 70;
            break;
         case "150":
            price = 90;
            break;
         case "200":
            price = 130;
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
         username: "Supervisor", // Replace "Supervisor" with the recipient's name or other identifier
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