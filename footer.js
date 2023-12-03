// <!-- FOOTER SECTION -->

function footer(){
    return `
<footer id="footer">
  <section id="section_1">

      <div id="left">
          <div id="aboutus">
              <h4>About Us</h4>
              <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              At, harum temporibus! Qui, labore libero ipsa quo, atque quas ipsam corporis animi numquam rem quae, 
              error sed aliquid cupiditate?</P>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <p>147 Broadway, FI 2,<br/> New York,NY,10D13</p>
            <p>info@convermax.com</p>
            <p id="underline">800-451-0972</P>
            
          </div>


          <div>
          <h4>Get in Touch</h4>
          <input type="email" placeholder="Email Address" id="footer_input">
          <br>
          <button id="subscribe">Subscribe</button>
         </div>

          
          <div>
              <h4>Quick Links</h4>
              <p>Customer Service</p>
              <p>Return Policy</p>
              <p>Shipping & Delivery</p>
              <p>Our Story</p>
              <p>About Us</p>
              <p>Blog</p>
              </div>
          </div>

      </div>
  

  <div id="down">

      <div>
      <h2>AUTO PART</h2>
      <h3>COMPANY LOGO</h3>
      </div>


      <div>
      <p>Copy right @ 2020  <span> AUTO PART</span><br/>All rights reserved</p>
      </div>

      

      
      <div id="footer_imgdiv">
      <img src="https://www.discoversignage.com/uploads/30-10-23_11:38_7logoPNG.png">
      </div>



 </div>

  </section>
  </footer> `
}

// let footeremail=document.getElementById(footer_email);
// footeremail.innerText="Email Address"

export {footer};
