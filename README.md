This is an attempt to recreate [Astro Rewards](https://rewards.astro.com.my/).
The project is bootstraped with [Create React App](https://rewards.astro.com.my/)

An online demo is presented [here](http://reward-app-client.s3-website-us-east-1.amazonaws.com/)
p.s: just ignore the region of the domain, in real case a CDN will be used to distribute to other region, so it won't matter

`User for testing`

`id: test@user.com`
`password: Passw0rd!`

<H1> Functionality by Route </H1>
This work is based on series of screenshots, so the functionality of the web will be different with the real one.
Here are the functionalities that is available in the project.
<H2> `/` </H2>
[Link](http://reward-app-client.s3-website-us-east-1.amazonaws.com/)

*  This is the home page where user can see the list of rewards.
*  There's a sort button in the left side of the page to sort the list of rewards.
*  There's a link on the top left of the page to let user sign in
*  If the reward is a flash sale, there will be a count down to the flash sale date if it is imminent.

<H2> `/details/{reward_id}/{created_at}` </H2>
[Link](http://reward-app-client.s3-website-us-east-1.amazonaws.com/details/47c2fdb0-c569-11e9-8acb-d74e1b7ed8e1/1566539157771)

*  This is the reward detail, accessible by clicking one of the reward item in the home page
*  Shows the details of the reward
*  User can redeem reward if logged in
*  After redeeming, redemption code (for online store redemption) or qr (participating store redemption) will be shown for 1 hour only
*  If the reward is a flash sale, there will be a count down to the flash sale date if it is imminent. and User will be forbid to redeem until the countdown reach 00:00:00
*  User can login by clicking login button on the top left of the page or by clicking redeem while not logged in

<H2> `/verify` </H2>
[Link](http://reward-app-client.s3-website-us-east-1.amazonaws.com/verify)

* This is the login page
* The button 'why need this' and 'sample' are just for show, the functionality is not deemed useful for this demo
* The dropdown list of 'id number' is also only for show, but user can change it without having any effect
* The checkbox is also only for show, currently user session is always remembered for demo.
* The Id number text field is currently used as a ID textfield, which demo user can input `test@user.com` for demo
* The Account/Smartcard number text field is currently used as a password textfield (which does not use asterisk just like the real version), which demo user can input `Passw0rd!` for demo
* After user logged in, will be redirected to the last page

<H2> `/admin` </H2>
[Link](http://reward-app-client.s3-website-us-east-1.amazonaws.com/admin)

*  This is the admin page, currently for demo the authenticated demo user `test@user.com` can access the admin page. In reality the user pool will be separated.
*  In this page, user can create a reward item.
*  Flash sale date is optional, you can leave it blank.
*  Other functionality of the Admin page such as 'Update' or 'Delete' item has not been implemented, will be implemented if the requirement need it. For now, can update and delete via DB directly by accessing AWS Console.

<H2> `Other functionality` </H2>
*  After logged in, user can log out, then is redirected to home page.
*  The `reward` in the navigation bar can be clicked to redirect the user to the home page


<H1> View Architecture </H1>
This project used [`atomic design` principle by `brad frost`](http://reward-app-client.s3-website-us-east-1.amazonaws.com/verify).
Atomic design is used to separate the responsibilities of the views to make it reusable and easier to maintain

*  The base unit of view is atoms, this is the smallest unit of view which has no dependecies to another view:
    *  Button
    *  Container
    *  Label
    *  Option

*  Molecules depends on atoms, it is usually the combination of atom with other atom or atom with molecule.
    *  Avatar
    *  Card
    *  CardImage
    *  DropdownTextField
    *  TextField
    *  LabeledCheckBox
    *  OptionGroup
    *  TextField

*  Organism depends on combination of Molecules, Atoms, and also their relative positioning to the page
    * CreateRewardForm
    * Footer
    * Modal
        * Container
        * Dialog
        * LoadingDialog
        * OptionGroupDialog
    * NavigationBar
    * RewardDetails
    * SignInForm
    * StickyButton

*   Template is not yet used in this project

*   Pages controls the Organism that lives in the pages (this part is directly linked with the Router)
    *  Admin
    *  Details
    *  Home
    *  NotFound
    *  Verification
