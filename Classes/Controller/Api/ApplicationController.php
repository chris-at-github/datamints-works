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

use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * ApplicationController
 * @package DatamintsWorks
 */
class ApplicationController extends ApiController {

	/**
	 * boardRepository
	 *
	 * @var \Datamints\DatamintsWorks\Domain\Repository\BoardRepository
	 * @inject
	 */
	protected $boardRepository = null;

	/**
	 * Find action
	 *
	 * @return void
	 */
	public function indexAction() {
//		$this->view->setVariablesToRender(['boards']);
//		$this->view->assign('boards', $this->boardRepository->find());

		$this->view->setVariablesToRender(['user', 'boards']);
		$this->view->assign('boards', $this->boardRepository->find());
	}
}