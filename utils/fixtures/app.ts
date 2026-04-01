import { test as base, expect, Page } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import ProfilePage from '../../pom/pages/ProfilePage';
import ForgotPasswordForm from '../../pom/forms/ForgotPasswordForm';
import SignUpForm from '../../pom/forms/SignUpForm';
import AddCarForm from '../../pom/forms/AddCarForm';
import Sidebar from '../../pom/components/Sidebar';

type App = {
  page: Page;
  signInForm: SignInForm;
  homePage: HomePage;
  garagePage: GaragePage;
  profilePage: ProfilePage;
  forgotPasswordForm: ForgotPasswordForm;
  signUpForm: SignUpForm;
  addCarForm: AddCarForm;
  sidebar: Sidebar;
};

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      page,
      signInForm: new SignInForm(page),
      homePage: new HomePage(page),
      garagePage: new GaragePage(page),
      profilePage: new ProfilePage(page),
      forgotPasswordForm: new ForgotPasswordForm(page),
      signUpForm: new SignUpForm(page),
      addCarForm: new AddCarForm(page),
      sidebar: new Sidebar(page),
    };
    await use(app);
  },
});
