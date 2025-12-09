---
layout: page
title: Password Management Regression Test Suite
---

# Password Management Regression Test Suite


---

## Feature Information

**Feature to Document:** Password Management (Expired Password, Password Change, Forgot Password, Admin Temporary Password, Tenant Impersonation)

**Specific Details/Edge Cases to include:** 
- **TC-01 - Expired Password Flow:** User login with expired password, forced password change with validation (incorrect current password, password reuse prevention)
- **TC-02 - Authenticated Password Change:** Voluntary password change from user menu while logged in
- **TC-03 - Forgot Password Flow:** Username-based password reset request, email verification code, password reset with password history validation
- **TC-04 - Admin Temporary Password:** Admin sets temporary password for another user, user forced to change password without current password requirement
- **TC-05 - Tenant Management Impersonation:** ST account generates temporary impersonation password for mobile technician login (no password change required)
- **Platform Coverage:** Web browser (Employee) and Mobile/Android Studio (Technician)
- **Password Validation:** Password history enforcement, incorrect password handling, secure password change flow with logout/re-login

---

## Power Tester Pre-Setup

**Purpose:** Complete all prerequisite setups before beginning test execution for smooth, uninterrupted testing.

**Tenant Setup:**
- Create or use a tenant with MFA disabled

**User Accounts to Create:**

| Prerequisite | Quantity | Notes |
|---|---|---|
| PRE-01 (Active Employee - Admin - MFA Disabled) | 2 | Create 2 employee accounts with admin role - use [Username1] + [AdminUsername] and [Password1] as variables (document actual values in Test Variables Tracker) |
| PRE-02 (Active Technician - MFA Disabled) | 1 | Create 1 technician account - use [Username2] and [Password1] as variables (document actual values in Test Variables Tracker) |

**Setup Completion Checklist:**
- [ ] Tenant with MFA disabled confirmed
- [ ] 2x PRE-01 Employee accounts (admin role) created with [Username1] + [AdminUsername] and [Password1]
- [ ] 1x PRE-02 Technician account created with [Username2] and [Password1]
- [ ] All usernames and passwords documented in Test Variables Tracker section

---

## Test Execution Matrix

**Important:** All test cases (TC-01, TC-02, TC-03) must be executed for BOTH user types on their respective platforms.

| User Type | Platform | Variable Set | Execution Status |
|---|---|---|---|
| Employee #1 (PRE-01) | Web Browser | [Username1], [EmailAddress1], [Password1-5], [EmailCode1], [TempPassword] | [ ] Complete |
| Technician (PRE-02) | Mobile (Phone or Android Studio) | [Username2], [EmailAddress2], [Password1-5], [EmailCode2], [TempPassword], [ImpersonationPassword] | [ ] Complete |

**Note:** TC-04 requires admin ([AdminUsername]) to set temporary passwords for both [Username1] and [Username2]. TC-05 is only for PRE-02.

**Testing Instructions:**
1. **Select a row** from the Test Execution Matrix below
2. **Map the generic test variables** to your selected user's variables:
   - [TestUser] → [Username1], or [Username2]
   - [TestEmail] → [EmailAddress1], or [EmailAddress2]
   - [TestEmailCode] → [EmailCode1] or [EmailCode2]
3. **Execute test cases** following the matrix instructions
4. Document any platform-specific issues in the Notes column of each test case

**Execution Flow:**
1. **First Pass:** Execute TC-01 through TC-04 using PRE-01 Employee #1 on web browser
2. **Second Pass:** Execute TC-04 using PRE-01 Employee #2 (admin) to set temporary password for Employee #1
3. **Third Pass:** Execute TC-01 through TC-03 using PRE-02 on mobile device or Android Studio
4. **Fourth Pass:** Execute TC-04 using PRE-01 Employee #2 (admin) on web to set temporary password for PRE-02, then test password change on mobile
5. **Fifth Pass:** Execute TC-05 using PRE-02 on mobile device or Android Studio (technician impersonation only)

---

## Part 1: Prerequisites Library (Setup Data)

Define the specific user states or data setups required. Complex setups are written once here and referenced in Part 2.

| ID | Data Object | Steps to Create |
|---|---|---|
| PRE-01 | Active New Employee with Admin Role and supplied password (MFA Disabled) | 1. Ensure tenant has MFA disabled<br>2. Impersonate as owner<br>3. Go to employee add page<br>4. Create a new employee with [EmailAddress1] or [AdminEmailAddress]<br>5. Assign Admin role<br>6. Create user by supplying [Username1] or [AdminUsername] and [Password1] |
| PRE-02 | Active New Technician with supplied password (MFA Disabled) | 1. Ensure tenant has MFA disabled<br>2. Impersonate as owner<br>3. Go to technician add page<br>4. Create a new technician with [EmailAddress2]<br>5. Create user by supplying [Username2] and [Password1] |

---

## Test Variables Tracker

Use this section to document actual values used during test execution.

### PRE-01 Variables (Employee - Web):

| Variable | Actual Value | Notes |
|---|---|---|
| [Username1] | | Employee #1 username |
| [EmailAddress1] | | Employee #1 email address |
| [AdminUsername] | | Employee #2 username (admin) |
| [AdminEmailAddress] | | Employee #2 email address (admin) |
| [Password1] | | Initial supplied password |
| [Password2] | | Password set in TC-01.4 |
| [Password3] | | Password set in TC-02.2 |
| [EmailCode1] | | Verification code from forgot password email |
| [Password4] | | Password set in TC-03.5 |
| [TempPassword] | | Temporary password set by admin in TC-04.2 |
| [Password5] | | Password set in TC-04.4 |

### PRE-02 Variables (Technician - Mobile):

| Variable | Actual Value | Notes |
|---|---|---|
| [Username2] | | Technician username |
| [EmailAddress2] | | Technician email address |
| [EmailCode2] | | Verification code from forgot password email |
| [ImpersonationPassword] | | Temporary impersonation password from tenant management |

**Note:** PRE-02 uses the same password variables as PRE-01 ([Password1-5], [TempPassword])


---

## Part 2: Test Scenarios

Actual manual test cases that reference prerequisites from Part 1.

### TC-01: Expired Password Flow

Tests the forced password change when a user logs in with an expired password.

| Test ID | Title | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|
| TC-01.1 | Login with Expired Password - Initial Login | Uses PRE-01 or PRE-02 | 1. Go to root application URL in a new browser session<br>2. Enter [TestUser] and [Password1] from prerequisite<br>3. Submit login | - User is redirected to login page<br>- After login, system prompts that current password is expired<br>- User is presented with password change form | [ ] Pass<br>[ ] Fail | |
| TC-01.2 | Login with Expired Password - Incorrect Current Password | Continues from TC-01.1 | 1. Enter INCORRECT current password<br>2. Enter new password (different from [Password1])<br>3. Save | - Error message: "Unable to change password because password is incorrect"<br>- Password is NOT changed<br>- User remains on password change screen | [ ] Pass<br>[ ] Fail | |
| TC-01.3 | Login with Expired Password - Reusing Current Password | Continues from TC-01.1 | 1. Enter [Password1] as current password<br>2. Enter [Password1] as new password (reusing same password)<br>3. Confirm new password ([Password1])<br>4. Save | - Error message: "This password has been used recently and you need to pick a different password"<br>- Password is NOT changed<br>- User remains on password change screen | [ ] Pass<br>[ ] Fail | |
| TC-01.4 | Login with Expired Password - Successful Password Change | Continues from TC-01.1 | 1. Enter [Password1] as current password<br>2. Enter [Password2] as new password (different from [Password1])<br>3. Confirm new password ([Password2])<br>4. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-01.5 | Login with Expired Password - Login with New Password | Continues from TC-01.4 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password2]<br>3. Submit login | - User successfully logs into the application<br>- No password change prompt appears<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-02: Authenticated User Password Change

Tests voluntary password change by an authenticated user via the user menu.

| Test ID | Title | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|
| TC-02.1 | Authenticated Password Change - Navigate to Change Password | Continues from TC-01.5 | 1. Click user icon in upper right corner of app<br>2. Select "Change Password" from menu | - User is redirected to change password screen<br>- Form displays current password field and new password fields | [ ] Pass<br>[ ] Fail | |
| TC-02.2 | Authenticated Password Change - Successful Change | Continues from TC-02.1 | 1. Enter current password ([Password2])<br>2. Enter [Password3] as new password (different from [Password2])<br>3. Confirm new password ([Password3])<br>4. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-02.3 | Authenticated Password Change - Login with New Password | Continues from TC-02.2 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password3]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-03: Forgot Password Flow

Tests the forgot password functionality and password reset process.

| Test ID | Title | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|
| TC-03.1 | Forgot Password - Request Reset with Username | Uses PRE-01 or PRE-02 | 1. Navigate to login page (sign out if logged in)<br>2. Click "Forgot Password" link<br>3. Enter [TestUser] from prerequisite<br>4. Click Submit | - User is redirected to page prompting for username, email, or phone number<br>- After submit, user receives confirmation message | [ ] Pass<br>[ ] Fail | |
| TC-03.2 | Forgot Password - Receive Email and Enter Code | Continues from TC-03.1 | 1. Check [TestEmail] inbox for password reset email<br>2. Copy verification code to [TestEmailCode]<br>3. Enter [TestEmailCode] on the screen prompting for code<br>4. Submit | - Email received at [TestEmail]<br>- Screen prompts for verification code<br>- After entering valid code, user is taken to password reset screen | [ ] Pass<br>[ ] Fail | |
| TC-03.3 | Forgot Password - Attempt Reusing Recent Password | Continues from TC-03.2 | 1. On password reset screen, enter [Password3] as new password<br>2. Confirm password ([Password3])<br>3. Save | - Error message: "Password was recently used"<br>- Password is NOT changed<br>- User remains on password reset screen | [ ] Pass<br>[ ] Fail | |
| TC-03.4 | Forgot Password - Successful Password Reset | Continues from TC-03.2 | 1. Enter [Password4] as new password (different from previous passwords)<br>2. Confirm password ([Password4])<br>3. Save | - Password reset is successful<br>- User is redirected back to login screen<br>- Confirmation message displayed | [ ] Pass<br>[ ] Fail | |
| TC-03.5 | Forgot Password - Login with New Password | Continues from TC-03.4 | 1. Enter [TestUser] from prerequisite<br>2. Enter [Password4]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-04: Admin Set Temporary Password

Tests admin ability to set a temporary password for another user, forcing password change on next login.

| Test ID | Title | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|
| TC-04.1 | Admin Login and Navigate to Employee/Technician | Uses Admin + Target User | 1. Log in with [AdminUsername] and [Password1]<br>2. Complete expired password flow if prompted (set to [Password2] and re-login)<br>3. Navigate to Employees or Technicians section (based on target user)<br>4. Go to detail page of [TestUser] (target user) | - Admin successfully logs in<br>- Admin can access detail page for [TestUser] | [ ] Pass<br>[ ] Fail | |
| TC-04.2 | Admin Set Temporary Password | Continues from TC-04.1 | 1. In actions menu, select "Temporary Password"<br>2. Enter [TempPassword] as new temporary password<br>3. Save | - Temporary password is set successfully<br>- Confirmation message displayed<br>- [TestUser] password is now [TempPassword] | [ ] Pass<br>[ ] Fail | |
| TC-04.3 | User Login with Temporary Password | Continues from TC-04.2 | 1. Sign out as admin<br>2. Navigate to login page (or mobile app for PRE-02)<br>3. Enter [TestUser]<br>4. Enter [TempPassword]<br>5. Submit login | - User is prompted to change password at login<br>- User is NOT asked for current password<br>- Only new password and confirmation password fields displayed | [ ] Pass<br>[ ] Fail | |
| TC-04.4 | User Set New Password After Temp Password | Continues from TC-04.3 | 1. Enter [Password5] as new password<br>2. Confirm password ([Password5])<br>3. Save | - Password change is successful<br>- User is logged out<br>- User is redirected back to login screen | [ ] Pass<br>[ ] Fail | |
| TC-04.5 | User Login with New Password After Temp | Continues from TC-04.4 | 1. Enter [TestUser]<br>2. Enter [Password5]<br>3. Submit login | - User successfully logs into the application<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

### TC-05: Tenant Management Temporary Impersonation Password

Tests the tenant management impersonation feature where a temporary password is provided for mobile technician login. **Note: This test case is only for PRE-02 (Technician on Mobile).**

| Test ID | Title | Prerequisite Reference | Action Steps | Expected Result | Pass/Fail | Notes |
|---|---|---|---|---|---|---|
| TC-05.1 | Generate Impersonation Password from Tenant Management | Uses PRE-02 | 1. Log in to your ST account<br>2. Navigate to Tenant Management<br>3. Find the tenant you are testing<br>4. Locate PRE-02 technician ([Username2])<br>5. Click "Impersonate on Mobile"<br>6. Copy the provided temporary password to [ImpersonationPassword] | - Temporary impersonation password is displayed<br>- Password is copied to [ImpersonationPassword] variable | [ ] Pass<br>[ ] Fail | |
| TC-05.2 | Login with Impersonation Password on Mobile | Continues from TC-05.1 | 1. Navigate to login page on mobile device or Android Studio<br>2. Enter [Username2]<br>3. Enter [ImpersonationPassword]<br>4. Submit login | - User is logged in successfully (impersonated)<br>- User is NOT asked to change or reset password<br>- User lands on application home/dashboard | [ ] Pass<br>[ ] Fail | |

---

## Testing Suite Status

- **Created By:** Sam Foust
- **Date Created:** December 9, 2025
- **Last Updated:** December 9, 2025
- **Test Cycle:** Password Management Regression
- **Status:** [x] Draft | [ ] Review | [ ] Approved | [ ] Executed
