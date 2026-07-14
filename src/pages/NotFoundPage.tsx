export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-extrabold text-slate-200">404</p>
      <h1 className="mt-4 text-xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 text-sm font-medium text-primary hover:text-primary-dark no-underline">
        &larr; Back to home
      </a>
    </div>
  );
}
