<?php
namespace Datamints\DatamintsWorks\Domain\Repository;

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
 * The repository for Boards
 */
class BoardRepository extends \TYPO3\CMS\Extbase\Persistence\Repository {

	/**
	 * @var array
	 */
	protected $defaultOrderings = [
		'sorting' => \TYPO3\CMS\Extbase\Persistence\QueryInterface::ORDER_ASCENDING
	];

	/**
	 * @param array $options
	 * @return \TYPO3\CMS\Extbase\Persistence\QueryResultInterface
	 */
	public function find($options = []) {
		$query = $this->createQuery();

		return $query->execute(true);
	}
}
