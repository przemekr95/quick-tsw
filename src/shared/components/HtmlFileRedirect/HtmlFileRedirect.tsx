import { Outlet, useLocation } from 'react-router-dom';
import { pathFromHtmlFile } from '../../utils/sitePages';
import { PathRedirect } from '../PathRedirect';

// Hosts that serve /mezczyzni/druzyna from mezczyzni/druzyna.html also answer
// the file's own address; this sends it to the app's address before anything
// below it renders.
export function HtmlFileRedirect() {
  const target = pathFromHtmlFile(useLocation().pathname);

  return target ? <PathRedirect pathname={target} /> : <Outlet />;
}
