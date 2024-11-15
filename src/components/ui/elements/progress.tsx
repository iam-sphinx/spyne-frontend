'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Progress() {
  return (
    <div className='relative z-50'>
      <ProgressBar
        height='1px'
        color='rgba(103, 0, 193, 1)'
        options={{ showSpinner: false }}
      />
    </div>
  );
}
