## Stripe payment integration demo
### Site: https://stripe-demo-emre.vercel.app/

---

### Test info
- Billing address: `random`
- Card `4242 4242 4242 4242` (visa)
- Card Expiration: `any valid future date`
- Card security code: `any 3 digit`
- ZIP Code: `any six digit`
- Discount code: `DEMO20` for 20% off

---

### Tech stack

- [Next.js v13](https://nextjs.org)
- [React v18](https://reactjs.org)
- [Redux](https://redux.js.org) + [Redux Toolkit](https://redux-toolkit.js.org) for state management
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com/)
- [NextUI v2](https://nextui.org) for UI components
- [Framer Motion](https://www.framer.com/motion)
- [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup) for form validation
- [Vercel](https://vercel.com/) for hosting + serverless functions

### What can be improved
- Harden validation for API endpoints
- Display total subscription amount with tax included in frontend

---

To build locally:

```sh
# update values in .env
cp .env.example .env
# start app with docker
npm run dev
```

http://localhost:3000
