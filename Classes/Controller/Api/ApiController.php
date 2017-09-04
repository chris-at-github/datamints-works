<?php
namespace Datamints\DatamintsWorks\Controller\Api;

/***
 *
 * This file is part of the "Datamints Works" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2017 Christian Pschorr <c.pschorr@datamints.com>, datamints GmbH
 *
 ***/

/**
 * ApiController
 * @package DatamintsWorks
 */
class ApiController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {

	/**
	 * @var \TYPO3\CMS\Extbase\Mvc\View\JsonView
	 */
	protected $view;

	/**
	 * @var string
	 */
	protected $defaultViewObjectName = \Datamints\DatamintsWorks\View\JsonView::class;
}