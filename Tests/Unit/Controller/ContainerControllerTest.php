<?php
namespace Datamints\DatamintsWorks\Tests\Unit\Controller;

/**
 * Test case.
 *
 * @author Christian Pschorr <c.pschorr@datamints.com>
 */
class ContainerControllerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Datamints\DatamintsWorks\Controller\ContainerController
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = $this->getMockBuilder(\Datamints\DatamintsWorks\Controller\ContainerController::class)
            ->setMethods(['redirect', 'forward', 'addFlashMessage'])
            ->disableOriginalConstructor()
            ->getMock();
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function listActionFetchesAllContainersFromRepositoryAndAssignsThemToView()
    {

        $allContainers = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->disableOriginalConstructor()
            ->getMock();

        $containerRepository = $this->getMockBuilder(\Datamints\DatamintsWorks\Domain\Repository\ContainerRepository::class)
            ->setMethods(['findAll'])
            ->disableOriginalConstructor()
            ->getMock();
        $containerRepository->expects(self::once())->method('findAll')->will(self::returnValue($allContainers));
        $this->inject($this->subject, 'containerRepository', $containerRepository);

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $view->expects(self::once())->method('assign')->with('containers', $allContainers);
        $this->inject($this->subject, 'view', $view);

        $this->subject->listAction();
    }

    /**
     * @test
     */
    public function showActionAssignsTheGivenContainerToView()
    {
        $container = new \Datamints\DatamintsWorks\Domain\Model\Container();

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $this->inject($this->subject, 'view', $view);
        $view->expects(self::once())->method('assign')->with('container', $container);

        $this->subject->showAction($container);
    }
}
