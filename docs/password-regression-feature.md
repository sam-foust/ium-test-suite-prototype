# Password Management Feature


---

## Feature Information

**Specific Details/Edge Cases to include:** 
- **TC-01 - Expired Password Flow:** User login with expired password, forced password change with validation (incorrect current password, password reuse prevention)
- **TC-02 - Authenticated Password Change:** Voluntary password change from user menu while logged in
- **TC-03 - Forgot Password Flow:** Username-based password reset request, email verification code, password reset with password history validation
- **TC-04 - Admin Send Password Reset:** Admin initiates password reset for user, user receives email with reset link, completes password reset flow
- **TC-05 - Admin Temporary Password:** Admin sets temporary password for another user, user forced to change password without current password requirement
- **TC-06 - Tenant Management Impersonation:** ST account generates temporary impersonation password for mobile technician login (no password change required)
- **Platform Coverage:** Web browser (Employee) and Mobile/Android Studio (Technician)
- **Password Validation:** Password history enforcement, incorrect password handling, secure password change flow with logout/re-login

---

## Test Execution Matrix

**Tests for Both Employee (PRE-01) and Technician (PRE-02):**
- TC-01: Expired Password Flow
- TC-02: Authenticated User Password Change
- TC-03: Forgot Password Flow
- TC-04: Admin Send Password Reset
- TC-05: Admin Set Temporary Password

**Note:** When doing manual testing, executing TC-01 through TC-05 with either Employee (Web Browser) OR Technician (Mobile) is sufficient. Both user types follow the same flow.

**Technician-Only Test:**
- TC-06: Tenant Management Impersonation (PRE-02 on Mobile only)

---

## Part 1: Prerequisites Library (Setup Data)

Define the specific user states or data setups required. Complex setups are written once here and referenced in Part 2.

**Important Business Logic:** When a new user is created by supplying a username and password (rather than sending an invite), the system automatically sets that password as expired. This is why PRE-01 and PRE-02 are ideal for testing the expired password flow in TC-01 - the users are created with expired passwords by default.

| ID | Data Object | Steps to Create |
|---|---|---|
| PRE-00 | Tenant Setup | 1. Create or use an existing tenant<br>2. Ensure MFA is disabled on the tenant<br>3. Ensure email is enabled on the tenant |
| PRE-01 | Active New Employee with Admin Role and supplied password (MFA Disabled) | 1. Complete PRE-00 (Tenant Setup)<br>2. Impersonate as owner<br>3. Go to employee add page<br>4. Create a new employee with [EmailAddress1] or [AdminEmailAddress]<br>5. Assign Admin role<br>6. Create user by supplying [Username1] or [AdminUsername] and [Password1]<br>**Note:** Password will be automatically set as expired |
| PRE-02 | Active New Technician with supplied password (MFA Disabled) | 1. Complete PRE-00 (Tenant Setup)<br>2. Impersonate as owner<br>3. Go to technician add page<br>4. Create a new technician with [EmailAddress2]<br>5. Create user by supplying [Username2] and [Password1]<br>**Note:** Password will be automatically set as expired |

---

## Test Variables Tracker

Use this section to document actual values used during test execution.

### PRE-01 Variables (Employee - Web):
| Variable | Actual Value | Notes |
|---|---|---|
| [Username1] | | Employee username |
| [EmailAddress1] | | Employee email address |
| [Password1] | | Initial supplied password |
| [Password2] | | Password set in TC-01.4 |
| [Password3] | | Password set in TC-02.2 |
| [EmailCode1] | | Verification code from forgot password email (TC-03) |
| [Password4] | | Password set in TC-03.5 |
| [ResetEmailCode] | | Verification code from admin-initiated password reset email (TC-04) |
| [Password5] | | Password set in TC-04.5 |
| [Password6] | | Password set in TC-05.4 |

### Admin Variables (Web):
| Variable | Actual Value | Notes |
|---|---|---|
| [AdminUsername] | | Admin username |
| [AdminEmailAddress] | | Admin email address |
| [TempPassword] | | Temporary password set by admin in TC-05.2 |

### PRE-02 Variables (Technician - Mobile):
| Variable | Actual Value | Notes |
|---|---|---|
| [Username2] | | Technician username |
| [EmailAddress2] | | Technician email address |
| [EmailCode2] | | Verification code from forgot password email (TC-03) |
| [ResetEmailCode2] | | Verification code from admin-initiated password reset email (TC-04) |
| [ImpersonationPassword] | | Temporary impersonation password from tenant management |

**Note:** PRE-02 uses the same password variables as PRE-01 ([Password1-6])


---

## Part 2: Test Scenarios

Actual manual test cases that reference prerequisites from Part 1.

### TC-01: Expired Password Flow

Tests the forced password change when a user logs in with an expired password.

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-01.1 | Uses PRE-01 or PRE-02 | 1. Go to root application URL in a new browser session<br>2. Enter [TestUser] and [Password1] from prerequisite<br>3. Submit login | - User is redirected to login page<br>- After login, system prompts that current password is expired<br>- User is presented with password change form | [ ] Pass<br>[ ] Fail | |
| TC-01.2 | Continues from TC-01.1 | 1. Enter INCORRECT current password<br>2. Enter new password (different from [Password1])<br>3. Save | - Error message: "Unable to change password because password is incorrect"<br>- Password is NOT changed<br>- User remains on password change screen | [ ] Pass<br>[ ] Fail | |
| TC-01.3 | Continues from TC-01.1 | 1. Enter [Password1] as current password<br>2. Enter [Password1] as new password (reusing same password)<br>3. Confirm new password ([Password1])<br>4. Save | - Error message: "This password has been used recently and you need to pick a different password"<br>- Password is NOT changed<br>- User remains on password change screen | [ ] Pass<br>[ ] Fail | |
| TC-01.4 | Continues from TC-01.1 | 1. Enter [Password1] as current password<br>2. Enter [Password2] as new password (different from [Password1])<br>3. Confirm new password ([Password2])<br>4. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-01.5 | Continues from TC-01.4 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password2]<br>3. Submit login | - User successfully logs into the application<br>- No password change prompt appears<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-02: Authenticated User Password Change

Tests voluntary password change by an authenticated user via the user menu.

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-02.1 | Continues from TC-01.5 | 1. Click user icon in upper right corner of app<br>2. Select "Change Password" from menu | - User is redirected to change password screen<br>- Form displays current password field and new password fields | [ ] Pass<br>[ ] Fail | |
| TC-02.2 | Continues from TC-02.1 | 1. Enter current password ([Password2])<br>2. Enter [Password3] as new password (different from [Password2])<br>3. Confirm new password ([Password3])<br>4. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-02.3 | Continues from TC-02.2 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password3]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-03: Forgot Password Flow

Tests the forgot password functionality and password reset process.

**Note:** This test case covers the basic forgot password flow with email verification code. It does not cover all flows or comprehensive documentation for the forgot password code sending mechanism, which is quite complex and involves SMS, emails, multiple accounts, multi-code messaging, and verification of multiple sending scenarios. Those flows will be reserved for a dedicated document and test matrix in the future.

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-03.1 | Uses PRE-01 or PRE-02 | 1. Navigate to login page (sign out if logged in)<br>2. Click "Forgot Password" link<br>3. Enter [TestUser] from prerequisite<br>4. Click Submit | - User is redirected to page prompting for username, email, or phone number<br>- After submit, user receives confirmation message | [ ] Pass<br>[ ] Fail | |
| TC-03.2 | Continues from TC-03.1 | 1. Check [TestEmail] inbox for password reset email<br>2. Copy verification code to [TestEmailCode]<br>3. Enter [TestEmailCode] on the screen prompting for code<br>4. Submit | - Email received at [TestEmail]<br>- Screen prompts for verification code<br>- After entering valid code, user is taken to password reset screen | [ ] Pass<br>[ ] Fail | |
| TC-03.3 | Continues from TC-03.2 | 1. On password reset screen, enter [Password3] as new password<br>2. Confirm password ([Password3])<br>3. Save | - Error message: "Password was recently used"<br>- Password is NOT changed<br>- User remains on password reset screen | [ ] Pass<br>[ ] Fail | |
| TC-03.4 | Continues from TC-03.2 | 1. Enter [Password4] as new password (different from previous passwords)<br>2. Confirm password ([Password4])<br>3. Save | - Password reset is successful<br>- User is redirected back to login screen<br>- Confirmation message displayed | [ ] Pass<br>[ ] Fail | |
| TC-03.5 | Continues from TC-03.4 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password4]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-04: Admin Send Password Reset

Tests admin ability to initiate a password reset for a user via email.

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-04.1 | Uses Admin + Target User | 1. Log in with [AdminUsername] and [Password1]<br>2. Complete expired password flow if prompted (set to [Password2] and re-login)<br>3. Navigate to Employees or Technicians section (based on target user)<br>4. Go to detail page of [TestUser] (target user) | - Admin successfully logs in<br>- Admin can access detail page for [TestUser] | [ ] Pass<br>[ ] Fail | |
| TC-04.2 | Continues from TC-04.1 | 1. In actions menu, select "Send Password Reset" or similar option<br>2. Confirm action | - Password reset email is sent successfully<br>- Confirmation message displayed<br>- User ([TestUser]) receives password reset email | [ ] Pass<br>[ ] Fail | |
| TC-04.3 | Continues from TC-04.2 | 1. Sign out as admin<br>2. Check [TestEmail] inbox for password reset email<br>3. Copy verification code to [ResetEmailCode] or click reset link in email<br>4. Follow link/enter code to access password reset screen | - Email received at [TestEmail]<br>- Reset link or code is valid<br>- User is taken to password reset screen | [ ] Pass<br>[ ] Fail | |
| TC-04.4 | Continues from TC-04.3 | 1. On password reset screen, enter [Password5] as new password (different from previous passwords)<br>2. Confirm password ([Password5])<br>3. Save | - Password reset is successful<br>- User is redirected back to login screen<br>- Confirmation message displayed | [ ] Pass<br>[ ] Fail | |
| TC-04.5 | Continues from TC-04.4 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password5]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-05: Admin Set Temporary Password

Tests admin ability to set a temporary password for another user, forcing password change on next login.

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-05.1 | Uses Admin + Target User | 1. Log in with [AdminUsername] and [Password1]<br>2. Complete expired password flow if prompted (set to [Password2] and re-login)<br>3. Navigate to Employees or Technicians section (based on target user)<br>4. Go to detail page of [TestUser] (target user) | - Admin successfully logs in<br>- Admin can access detail page for [TestUser] | [ ] Pass<br>[ ] Fail | |
| TC-05.2 | Continues from TC-05.1 | 1. In actions menu, select "Temporary Password"<br>2. Enter [TempPassword] as new temporary password<br>3. Save | - Temporary password is set successfully<br>- Confirmation message displayed<br>- [TestUser] password is now [TempPassword] | [ ] Pass<br>[ ] Fail | |
| TC-05.3 | Continues from TC-05.2 | 1. Sign out as admin<br>2. Navigate to login page (or mobile app for PRE-02)<br>3. Enter [TestUser]<br>4. Enter [TempPassword]<br>5. Submit login | - User is prompted to change password at login<br>- User is NOT asked for current password<br>- Only new password and confirmation password fields displayed | [ ] Pass<br>[ ] Fail | |
| TC-05.4 | Continues from TC-05.3 | 1. Enter [Password6] as new password<br>2. Confirm password ([Password6])<br>3. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-05.5 | Continues from TC-05.4 | 1. Enter [TestUser]<br>2. Enter [Password6]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-06: Tenant Management Temporary Impersonation Password

Tests the tenant management impersonation feature where a temporary password is provided for mobile technician login. **Note: This test case is only for PRE-02 (Technician on Mobile).**

| Test ID | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|
| TC-06.1 | Uses PRE-02 | 1. Log in to your ST account<br>2. Navigate to Tenant Management<br>3. Find the tenant you are testing<br>4. Locate PRE-02 technician ([Username2])<br>5. Click "Impersonate on Mobile"<br>6. Copy the provided temporary password to [ImpersonationPassword] | - Temporary impersonation password is displayed<br>- Password is copied to [ImpersonationPassword] variable | [ ] Pass<br>[ ] Fail | |
| TC-06.2 | Continues from TC-06.1 | 1. Navigate to login page on mobile device or Android Studio<br>2. Enter [Username2]<br>3. Enter [ImpersonationPassword]<br>4. Submit login | - User is logged in successfully (impersonated)<br>- User is NOT asked to change or reset password<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

---

## Testing Suite Status

- **Created By:** Sam Foust
- **Date Created:** December 9, 2025
- **Last Updated:** December 11, 2025
- **Test Cycle:** Password Management Regression
- **Status:** [x] Draft | [ ] Review | [ ] Approved | [ ] Executed

