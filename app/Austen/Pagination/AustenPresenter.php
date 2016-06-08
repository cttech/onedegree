<?php


namespace Austen\Pagination;

use Illuminate\Pagination\Presenter;

class AustenPresenter extends Presenter {


	/**
	 * Get HTML wrapper for a page link.
	 *
	 * @param  string  $url
	 * @param  int  $page
	 * @param  string  $rel
	 * @return string
	 */
	public function getPageLinkWrapper($url, $page, $rel = null)
	{
		$rel = is_null($rel) ? '' : ' rel="'.$rel.'"';

		return '<li><a href="'.$url.'"'.$rel.'>'.$page.'</a></li>';
	}

	/**
	 * Get HTML wrapper for disabled text.
	 *
	 * @param  string  $text
	 * @return string
	 */
	public function getDisabledTextWrapper($text)
	{
		return '<li class="disabled"><span>'.$text.'</span></li>';
	}

	/**
	 * Get HTML wrapper for active text.
	 *
	 * @param  string  $text
	 * @return string
	 */
	public function getActivePageWrapper($text)
	{
		return '<li class="active"><span>'.$text.'</span></li>';
	}

	/**
	 * Get the previous page pagination element.
	 *
	 * @param  string  $text
	 * @return string
	 */
	public function getPrevious($text = '<i class="fa fa-angle-left"></i>')
	{
		// If the current page is less than or equal to one, it means we can't go any
		// further back in the pages, so we will render a disabled previous button
		// when that is the case. Otherwise, we will give it an active "status".
		if ($this->currentPage <= 1)
		{
			return $this->getDisabledTextWrapper($text);
		}

		$url = $this->paginator->getUrl($this->currentPage - 1);

		return $this->getPageLinkWrapper($url, $text, 'prev');
	}

	/**
	 * Get the next page pagination element.
	 *
	 * @param  string  $text
	 * @return string
	 */
	public function getNext($text = '<i class="fa fa-angle-right"></i>')
	{
		// If the current page is greater than or equal to the last page, it means we
		// can't go any further into the pages, as we're already on this last page
		// that is available, so we will make it the "next" link style disabled.
		if ($this->currentPage >= $this->lastPage)
		{
			return $this->getDisabledTextWrapper($text);
		}

		$url = $this->paginator->getUrl($this->currentPage + 1);

		return $this->getPageLinkWrapper($url, $text, 'next');
	}


}