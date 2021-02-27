import React from 'react';

export default function() {
	return (
		<a
			href={`https://twitter.com/${process.env.TWITTER}?ref_src=twsrc%5Etfw`}
			className='twitter-follow-button'
			data-show-count='false'
		>
			Follow @{process.env.TWITTER}
		</a>
	);
}
