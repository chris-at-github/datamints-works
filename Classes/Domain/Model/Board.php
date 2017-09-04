<?php
namespace Datamints\DatamintsWorks\Domain\Model;

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
 * Board
 */
class Board extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity
{
    /**
     * title
     *
     * @var string
     * @validate NotEmpty
     */
    protected $title = '';

    /**
     * container
     *
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Container>
     * @lazy
     * @cascade remove
     */
    protected $container = null;

    /**
     * __construct
     */
    public function __construct()
    {
        //Do not remove the next line: It would break the functionality
        $this->initStorageObjects();
    }

    /**
     * Initializes all ObjectStorage properties
     * Do not modify this method!
     * It will be rewritten on each save in the extension builder
     * You may modify the constructor of this class instead
     *
     * @return void
     */
    protected function initStorageObjects()
    {
        $this->container = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
    }

    /**
     * Returns the title
     *
     * @return string $title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Sets the title
     *
     * @param string $title
     * @return void
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Adds a Container
     *
     * @param \Datamints\DatamintsWorks\Domain\Model\Container $container
     * @return void
     */
    public function addContainer(\Datamints\DatamintsWorks\Domain\Model\Container $container)
    {
        $this->container->attach($container);
    }

    /**
     * Removes a Container
     *
     * @param \Datamints\DatamintsWorks\Domain\Model\Container $containerToRemove The Container to be removed
     * @return void
     */
    public function removeContainer(\Datamints\DatamintsWorks\Domain\Model\Container $containerToRemove)
    {
        $this->container->detach($containerToRemove);
    }

    /**
     * Returns the container
     *
     * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Container> $container
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * Sets the container
     *
     * @param \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\Datamints\DatamintsWorks\Domain\Model\Container> $container
     * @return void
     */
    public function setContainer(\TYPO3\CMS\Extbase\Persistence\ObjectStorage $container)
    {
        $this->container = $container;
    }
}
