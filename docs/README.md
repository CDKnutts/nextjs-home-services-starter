# Documentation

Welcome to the Home Services Template documentation!

## 📖 Available Guides

### [Customization Guide](./CUSTOMIZATION.md)
Complete guide on how to customize the template for your business:
- Editing brand configuration
- Changing colors (automatic injection from brand.ts)
- Modifying sections
- Adding new features
- Database setup (Supabase)
- Email notifications (Resend)
- Environment variables
- Multi-client deployment strategy
- Section IDs for navigation
- Deployment instructions

### [Variables Reference](./VARIABLES_REFERENCE.md)
Comprehensive reference showing:
- Every variable available in `brand.ts`
- Where each variable is used in the template
- Line-by-line code references
- Usage examples

## 🎯 Start Here

1. **New to the template?** → Start with [Customization Guide](./CUSTOMIZATION.md)
2. **Looking for a specific variable?** → Check [Variables Reference](./VARIABLES_REFERENCE.md)
3. **Ready to deploy?** → See deployment section in [Customization Guide](./CUSTOMIZATION.md)

## 💡 Quick Tips

- Edit `src/config/brand.ts` to change ALL business details
- Colors are automatically injected from `brand.ts` - no manual CSS editing required!
- All arrays (`services`, `features`, `reviews`, `serviceAreas`) can be freely modified
- The template supports 200+ client deployments sharing one Supabase database
- Email notifications sent via Resend with non-blocking error handling
- The dev server hot-reloads when you save changes

## 🆘 Need Help?

- **Next.js Issues**: [Next.js Docs](https://nextjs.org/docs)
- **Tailwind Questions**: [Tailwind Docs](https://tailwindcss.com/docs)
- **Icon Selection**: [Lucide Icons](https://lucide.dev/icons)
