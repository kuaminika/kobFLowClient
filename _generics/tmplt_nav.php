<?php 

class Template_Navigation
{
    public function __construct($configs) {
       $this->navigationItems = $configs["navigationItems"];
       //TODO complain if there are no navigation items
    }

    public function getNavigation( $pageName = "")
    {
          $result = "";
        foreach($this->navigationItems as $navItem )
        {
            $active = $navItem["name"] == $pageName?"active":"";
            $result .= '<li class="nav-item">
                            <a class="nav-link '.$active.'" aria-current="page" href="'.$navItem["url"].'">
                            <span data-feather="home" class="align-text-bottom"></span>
                            '.$navItem["name"].'
                            </a>
                        </li>';
        }
        $result = '<ul class="nav flex-column">'.$result.'</ul>';
        $result = ' <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
                        <div class="position-sticky pt-3 sidebar-sticky">
                        '.$result.'      
                        </div>
                    </nav>';

      return $result;
    }
}
