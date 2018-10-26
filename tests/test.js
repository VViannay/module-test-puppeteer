const timeout = 15000

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
    let page
    let user = 'vincent' + Date.now()
    let mail = 'vincent' + Date.now() + '@test.fr'

    // parcrous client avec Sign Up
    test('Sign Up', async ()=>{
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ))
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        await page.waitForSelector('input[name=username]')
        await page.type('input[name=username].form-control.form-field', user)
        await page.waitForSelector('input[type=text]')
        await page.waitForSelector('input[type=password].form-control.form-field')
        await page.type('input[type=password].form-control.form-field', 'lolito')
        await page.waitForSelector('input[type=email].form-control.form-field')
        await page.type('input[type=email].form-control.form-field', mail)
        await page.waitForSelector('input[value=Register]')
        await page.$eval('input[value=Register]', _ => _.click());
        await page.waitFor(300);
        await page.screenshot({path: './tests/img/signUp-Success.png'});


        
    }, timeout)






    // parcours client avec Sign In
    test('Sign In', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "About" de la navigation
        await page.$eval('.dropdown-toggle', dropdown => dropdown.click());
        await page.waitForSelector('input[type=text]')
        await page.type('input[type=text]', 'admin')
        await page.waitForSelector('input[type=password]')
        await page.type('input[type=password]', 'campus')
        await page.screenshot({path: './tests/img/connect.png'});  
        await page.$eval('input.btn.btn-success.form-control.login-form-submit', btn => btn.click());
        await page.waitFor(300);
        await page.screenshot({path: './tests/img/connectSuccess.png'});  

    }, timeout)


    
    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
})
