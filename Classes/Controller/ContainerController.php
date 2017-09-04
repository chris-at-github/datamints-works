<?php
namespace Datamints\DatamintsWorks\Controller;

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
 * ContainerController
 */
class ContainerController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * containerRepository
     * 
     * @var \Datamints\DatamintsWorks\Domain\Repository\ContainerRepository
     * @inject
     */
    protected $containerRepository = null;

    /**
     * action list
     * 
     * @return void
     */
    public function listAction()
    {
        $containers = $this->containerRepository->findAll();
        $this->view->assign('containers', $containers);
    }

    /**
     * action show
     * 
     * @param \Datamints\DatamintsWorks\Domain\Model\Container $container
     * @return void
     */
    public function showAction(\Datamints\DatamintsWorks\Domain\Model\Container $container)
    {
        $this->view->assign('container', $container);
    }
}
