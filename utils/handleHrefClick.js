import router from 'next/router';

export default function handleHrefClick(event, target) {
  const href = target.getAttribute('href');
  const targetAttr = target.getAttribute('target');

  if (targetAttr === '_blank') {
    return;
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  if (typeof href === 'string' && href.indexOf('/') === 0) {
    console.log(11);
    event.preventDefault();
    router.push(href);
  }
}
