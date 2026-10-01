(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const screens = {
    intro: $("#screen-intro"),
    select: $("#screen-select"),
    draw: $("#screen-draw"),
    loading: $("#screen-loading"),
    result: $("#screen-result")
  };

  const SHAPES = {
    circle:{glyph:"○",name:"동그라미",theme:"사람과 마음을 향하는 나"},
    triangle:{glyph:"△",name:"세모",theme:"방향과 목표를 향하는 나"},
    square:{glyph:"□",name:"네모",theme:"안정과 책임을 지키는 나"},
    s:{glyph:"S",name:"에스",theme:"생각과 의미를 찾는 나"}
  };

  const PATTERN_LABEL = {
    separate:"분리형",
    overlap:"중복형",
    immerse:"몰입형",
    attach:"밀착형",
    align:"일치형",
    rare:"드문형"
  };


  const FREE_THEME = {
    circle:"관계와 감정",
    triangle:"목표와 방향",
    square:"생활과 책임",
    s:"생각과 이해"
  };

  const FREE_TYPE_NAME = {
    separate:{
      circle:"속마음 접어두는형",
      triangle:"출발 준비형",
      square:"천천히 시작형",
      s:"생각 보관형"
    },
    overlap:{
      circle:"마음 복잡형",
      triangle:"목표 한가득형",
      square:"내가 다 챙김형",
      s:"생각 과부하형"
    },
    immerse:{
      circle:"한사람 몰입형",
      triangle:"목표 직진형",
      square:"끝까지 책임형",
      s:"깊이 파는형"
    },
    attach:{
      circle:"눈치 레이더형",
      triangle:"결정 신중형",
      square:"꼼꼼 확인형",
      s:"꼼꼼 분석형"
    },
    align:{
      circle:"관계 선명형",
      triangle:"방향 또렷형",
      square:"생활 안정형",
      s:"생각 또렷형"
    },
    rare:{
      circle:"관계 리셋형",
      triangle:"새길 탐색형",
      square:"일상 리셋형",
      s:"새방법 탐색형"
    }
  };

  const FREE_KEYWORDS = {
    separate:{
      circle:["관계는 이어감","내 마음은 뒤로","조금 거리 두기"],
      triangle:["목표는 있음","시작이 늦음","확신을 기다림"],
      square:["해야 할 건 앎","실행이 늦음","익숙함을 선호"],
      s:["생각은 많음","표현이 늦음","정리 후 움직임"]
    },
    overlap:{
      circle:["여러 감정이 섞임","관계가 신경 쓰임","마음이 지침"],
      triangle:["목표가 많음","우선순위가 흔들림","마음이 급함"],
      square:["책임이 쌓임","여러 일을 챙김","쉽게 지침"],
      s:["생각이 많음","걱정이 이어짐","머릿속이 복잡함"]
    },
    immerse:{
      circle:["한 관계에 집중","상대 반응을 확인","감정이 오래 머묾"],
      triangle:["한 목표에 집중","끝까지 밀어붙임","휴식을 미룸"],
      square:["한 책임을 붙잡음","끝까지 해냄","쉽게 못 놓음"],
      s:["한 생각에 집중","깊이 파고듦","다른 일이 밀림"]
    },
    attach:{
      circle:["반응을 세밀하게 봄","눈치를 많이 봄","내 말은 참음"],
      triangle:["선택지를 비교함","결정을 오래 고민","확신을 찾음"],
      square:["준비를 꼼꼼히 함","실수를 걱정","확인을 반복"],
      s:["세부를 분석함","정보를 많이 확인","결정이 늦어짐"]
    },
    align:{
      circle:["관계 기준이 분명","가까운 사람을 챙김","내 입장을 표현"],
      triangle:["목표가 분명","결정이 빠름","실행력이 있음"],
      square:["할 일이 분명","약속과 기준을 지킴","변화는 불편함"],
      s:["생각이 분명","이유를 설명함","내 기준이 있음"]
    },
    rare:{
      circle:["관계 방식을 바꾸고 싶음","편한 관계를 원함","새로운 만남이 궁금"],
      triangle:["새 방향이 궁금","기존 목표가 덜 끌림","아직은 탐색 중"],
      square:["반복되는 일상이 답답","변화를 원함","안정도 중요함"],
      s:["새 아이디어가 많음","기존 방식에 의문","구상이 먼저 떠오름"]
    }
  };

  function shortFreeDesc(desc){
    const parts = desc.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [desc];
    return parts.slice(0,1).join(" ").trim();
  }

  function currentMindDesc(desc){
    const parts = desc.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [desc];
    return parts.slice(0,2).join(" ").trim();
  }

  const CONTENT = {
    separate:{
      circle:{title:"사람들과 잘 지내고는 있지만, 내 마음은 조금 떨어져 있는 지금",desc:"사람들과 크게 문제없이 지내고 있지만, 속으로는 조금 거리를 두고 싶을 수 있어요. 부탁을 받으면 일단 들어주고, 불편한 일이 있어도 분위기를 깨고 싶지 않아 그냥 넘어갈 때가 있을 수 있습니다. 겉으로는 괜찮아 보여도 혼자 있을 때 ‘나는 사실 어떻게 하고 싶은 걸까?’라는 생각이 들 수 있어요.",q:"나는 요즘 누구에게 맞추느라 내 마음을 뒤로 미루고 있나요?",a:"오늘 한 번만이라도 부탁이나 선택 앞에서 ‘나는 어떻게 하고 싶지?’를 먼저 생각해보세요."},
      triangle:{title:"하고 싶은 건 있는데, 아직 시작이 잘 안 되는 지금",desc:"하고 싶은 일이나 이루고 싶은 목표는 있지만, 막상 시작하려고 하면 자꾸 미뤄질 수 있어요. 준비가 덜 된 것 같거나 실패할까 걱정돼서 ‘조금만 더 있다가 해야지’ 하고 기다릴 수 있습니다. 지금은 완벽한 준비보다 작은 시작이 더 필요한 때일 수 있어요.",q:"내가 자꾸 미루고 있는 일은 무엇인가요?",a:"그 일을 완성하려고 하지 말고 첫 단계만 10분 해보세요. 파일 열기, 신청 페이지 들어가기, 책 2쪽 읽기처럼 아주 작게 시작해보세요."},
      square:{title:"해야 할 일은 알고 있는데, 자꾸 미뤄지는 지금",desc:"해야 할 일이나 맡은 책임은 알고 있지만, 막상 시작하려고 하면 손이 잘 안 갈 수 있어요. 익숙한 일은 괜찮은데 새로운 일은 부담스럽게 느껴지거나, ‘한번 할 거면 제대로 해야지’라는 생각 때문에 시작이 늦어질 수도 있습니다. 지금은 완벽하게 준비하기보다 작게라도 먼저 시작해보는 게 도움이 될 수 있어요.",q:"내가 알고도 자꾸 미루고 있는 일은 무엇인가요?",a:"그 일을 끝내려고 하지 말고 가장 작은 한 단계만 시작해보세요. 파일 열기, 책상 한 칸 정리하기, 전화 한 통 하기 정도면 충분해요."},
      s:{title:"생각은 많은데, 아직 꺼내지 못한 지금",desc:"머릿속에는 하고 싶은 말이나 아이디어가 있지만, 바로 표현하기보다 충분히 생각한 뒤 말하고 싶을 수 있어요. 괜히 잘못 말할까 걱정돼서 의견을 미루거나, 메시지를 여러 번 고치다가 보내는 데 시간이 걸릴 수도 있습니다. 지금은 완벽하게 정리된 생각보다 작은 한마디라도 먼저 꺼내보는 게 도움이 될 수 있어요.",q:"내가 생각만 하고 아직 꺼내지 못한 것은 무엇인가요?",a:"완벽하게 정리하려고 하지 말고 떠오른 생각 하나를 메모하거나 한 사람에게 짧게 말해보세요."}
    },
    overlap:{
      circle:{title:"사람 때문에 마음이 복잡해진 지금",desc:"요즘 누군가를 생각하면 좋은 마음과 서운한 마음이 함께 들 수 있어요. 답장이 늦거나 말투가 달라졌을 때 이유가 자꾸 궁금해지거나, 서운한 일이 있어도 관계가 어색해질까 봐 그냥 넘어갈 수 있습니다. 멀어지고 싶지는 않은데 계속 신경 쓰는 것도 조금 지쳐 있을 수 있어요.",q:"내가 이 관계에서 가장 서운한 것은 정확히 무엇인가요?",a:"마음이 복잡한 사람 한 명을 떠올리고 좋은 마음, 서운한 마음, 걱정되는 마음을 한 단어씩 적어보세요."},
      triangle:{title:"해야 할 것도, 하고 싶은 것도 너무 많은 지금",desc:"여러 목표와 일정이 한꺼번에 겹쳐 있어서 어디부터 손대야 할지 복잡하게 느껴질 수 있어요. 하나를 하면서도 다른 일이 계속 생각나고, 계획이 조금만 밀려도 마음이 급해질 수 있습니다. 지금은 모든 걸 다 하려 하기보다 가장 중요한 한 가지부터 정하는 게 도움이 될 수 있어요.",q:"지금 가장 먼저 해야 할 한 가지는 무엇인가요?",a:"해야 할 일을 전부 적은 뒤 오늘 꼭 해야 하는 것에 동그라미 하나만 쳐보세요. 나머지는 잠시 내려놓아도 괜찮아요."},
      square:{title:"내가 챙겨야 할 일이 너무 많이 쌓인 지금",desc:"해야 할 일과 책임이 한꺼번에 겹쳐 있어서 머릿속이 복잡할 수 있어요. 내 일뿐 아니라 다른 사람이 놓친 부분까지 신경 쓰다 보면, 쉬고 있어도 해야 할 일이 계속 떠오를 수 있습니다. 지금은 모든 걸 직접 챙기기보다 내가 꼭 해야 하는 일과 맡겨도 되는 일을 나눠보는 게 필요할 수 있어요.",q:"지금 내가 너무 많이 책임지고 있는 것은 무엇인가요?",a:"오늘 해야 할 일을 ‘내가 꼭 해야 하는 일 / 맡겨도 되는 일 / 오늘 안 해도 되는 일’로 나눠보세요."},
      s:{title:"생각이 너무 많아 머릿속이 복잡한 지금",desc:"한 가지 고민이 생기면 다른 걱정까지 이어지면서 생각이 점점 많아질 수 있어요. 이미 지나간 일도 다시 떠올리고, 결정을 내린 뒤에도 ‘다른 방법이 더 낫지 않았을까?’ 하고 계속 생각할 수 있습니다. 지금은 더 많이 생각하기보다 확인된 사실과 내 추측을 나눠보는 게 도움이 될 수 있어요.",q:"지금 내 생각 중 사실인 것과 걱정해서 만든 생각은 무엇인가요?",a:"머릿속에 맴도는 걱정 하나를 골라 ‘확인된 사실’과 ‘내가 추측하고 있는 것’ 두 칸으로 나눠보세요."}
    },
    immerse:{
      circle:{title:"한 사람이나 한 관계에 마음이 많이 가 있는 지금",desc:"특정한 사람이나 관계가 평소보다 자주 떠오를 수 있어요. 연락을 기다리거나, 이미 끝난 대화를 다시 생각하거나, 상대의 반응을 자꾸 확인할 수 있습니다. 마음은 많이 쓰고 있는데 정작 내가 원하는 것이 무엇인지는 잘 말하지 못하고 있을 수도 있어요.",q:"나는 이 사람이나 관계에서 무엇을 가장 바라고 있나요?",a:"상대가 어떻게 생각할지를 떠올리기 전에 ‘나는 지금 어떤 기분이지?’를 한 문장으로 적어보세요."},
      triangle:{title:"하나의 목표에 온 힘을 쏟고 있는 지금",desc:"지금 꼭 이루고 싶은 목표가 분명하고, 거기에 에너지를 많이 쓰고 있을 수 있어요. 한번 마음먹으면 집중해서 끝까지 해내려는 힘이 있지만, 쉬는 시간이나 주변 사람들과의 관계가 뒤로 밀릴 수도 있습니다. 목표만 보는 동안 내가 얼마나 지치고 있는지도 함께 살펴볼 필요가 있어요.",q:"이 목표를 이루기 위해 내가 너무 뒤로 미루고 있는 것은 무엇인가요?",a:"오늘 일정에서 20~30분 정도는 목표와 상관없는 시간으로 남겨보세요. 쉬기, 산책하기, 가족과 이야기하기처럼요."},
      square:{title:"하나의 책임을 끝까지 붙잡고 있는 지금",desc:"한번 맡은 일은 중간에 놓기보다 끝까지 해내야 마음이 편할 수 있어요. 힘들어도 ‘이것만 끝내고 쉬자’ 하면서 계속 버틸 수 있고, 다른 사람이 도와준다고 해도 내가 마무리하고 싶을 수 있습니다. 책임감은 큰 장점이지만, 혼자 다 감당하고 있지는 않은지 살펴볼 필요가 있어요.",q:"내가 끝까지 붙잡고 있는 일 중, 조금 내려놓아도 되는 것은 무엇인가요?",a:"오늘 한 가지 일은 ‘여기까지만 해도 충분하다’고 정하고 멈춰보세요."},
      s:{title:"하나의 생각에 깊이 빠져 있는 지금",desc:"관심이 생긴 주제는 대충 넘기기보다 충분히 이해할 때까지 깊게 파고들 수 있어요. 궁금한 게 생기면 관련 자료를 계속 찾아보거나, 한 가지 생각을 오래 붙잡고 있을 수 있습니다. 깊이 생각하는 힘은 장점이지만, 생각하는 동안 해야 할 일이나 실제 행동이 뒤로 밀리고 있지는 않은지 살펴볼 필요가 있어요.",q:"나는 지금 더 생각해야 할까요, 이제 한번 해봐야 할까요?",a:"요즘 계속 알아보고 생각하고 있는 일 하나를 골라 신청하기, 사용해보기, 만들어보기처럼 작은 행동 하나로 바꿔보세요."}
    },
    attach:{
      circle:{title:"상대의 반응을 너무 많이 살피고 있는 지금",desc:"사람의 표정이나 말투가 조금만 달라져도 바로 알아차리고 신경이 쓰일 수 있어요. ‘내가 뭘 잘못했나?’ 하고 생각하거나, 상대가 불편할까 봐 하고 싶은 말을 한 번 더 참을 수 있습니다. 상대의 마음을 많이 살피느라 내 감정은 뒤로 밀리고 있을 수도 있어요.",q:"나는 지금 확인된 사실보다 상대의 마음을 더 많이 추측하고 있지는 않나요?",a:"오늘 신경 쓰였던 관계 하나를 떠올리고 ‘실제로 확인한 것’과 ‘내가 추측한 것’을 나눠보세요."},
      triangle:{title:"결정을 앞두고 계속 비교하고 있는 지금",desc:"선택을 잘하고 싶어서 여러 가능성을 계속 비교하고 있을 수 있어요. 충분히 알아봤는데도 ‘혹시 더 좋은 방법이 있지 않을까?’ 하고 결정을 미룰 수 있습니다. 지금은 더 많은 정보보다 어느 정도 괜찮은 선택을 실제로 해보는 게 필요할 수 있어요.",q:"나는 정보가 부족해서 못 정하는 걸까요, 확신이 부족해서 못 정하는 걸까요?",a:"지금 고민 중인 선택 하나에 대해 ‘더 알아야 할 것 1개’와 ‘이미 충분히 아는 것 1개’를 적어보세요."},
      square:{title:"준비는 충분한데, 계속 확인하고 있는 지금",desc:"실수하지 않으려고 순서와 과정을 꼼꼼하게 확인하는 편일 수 있어요. 이미 준비가 되어 있는데도 빠진 게 없는지 다시 보고, 계획이 바뀌면 처음부터 다시 정리하고 싶어질 수 있습니다. 지금은 더 확인하기보다 실제로 한번 해보는 것이 더 도움이 될 수 있어요.",q:"나는 충분히 준비했는데도 계속 확인하고 있지는 않나요?",a:"지금 반복해서 확인하고 있는 일 하나를 골라 확인 횟수를 한 번 줄이고 바로 실행해보세요."},
      s:{title:"작은 부분까지 꼼꼼하게 따지고 있는 지금",desc:"무언가를 결정할 때 세세한 부분까지 확인해야 마음이 놓일 수 있어요. 물건을 살 때 여러 조건을 비교하거나, 중요한 말을 하기 전에 상대가 어떻게 받아들일지 여러 번 생각할 수 있습니다. 충분히 확인했는데도 계속 분석하고 있다면 지금은 더 알아보기보다 한 번 결정해보는 게 필요할 수 있어요.",q:"나는 충분히 알아봤는데도 불안해서 계속 확인하고 있지는 않나요?",a:"오늘 하나만큼은 확인하는 횟수를 정해두고 그 이후에는 결정해보세요. 가격은 세 곳까지만, 문서는 두 번까지만 확인하는 식으로요."}
    },
    align:{
      circle:{title:"누구와 어떻게 지내고 싶은지가 비교적 분명한 지금",desc:"지금은 어떤 사람과 가까이 지내고 싶은지, 어떤 관계가 편한지가 비교적 분명할 수 있어요. 내가 중요하게 생각하는 관계의 기준도 있고, 가까운 사람은 잘 챙기는 편일 수 있습니다. 다만 내 기준이 분명한 만큼 상대에게도 같은 방식을 기대하고 있지는 않은지 살펴볼 필요가 있어요.",q:"내가 중요하게 생각하는 관계의 기준을 상대에게도 똑같이 기대하고 있지는 않나요?",a:"가까운 사람 한 명을 떠올리고 ‘나와 이 사람은 무엇을 중요하게 생각하는 방식이 다를까?’를 하나 찾아보세요."},
      triangle:{title:"목표와 방향이 비교적 분명한 지금",desc:"지금은 무엇을 해야 하는지, 어디로 가고 싶은지가 비교적 또렷할 수 있어요. 계획을 세우고 빠르게 움직이는 힘도 있지만, 다른 사람이 내 속도만큼 따라오지 못하면 답답하게 느낄 수 있습니다. 혼자 다 하기보다 역할을 나누는 것이 더 도움이 되는 순간도 있어요.",q:"지금 내가 혼자 다 하려고 하고 있는 일은 무엇인가요?",a:"오늘 해야 할 일 중 하나만 다른 사람과 나눠보세요. 자료 준비를 부탁하거나 의견을 물어보는 정도면 충분해요."},
      square:{title:"해야 할 일과 기준이 비교적 분명한 지금",desc:"지금은 무엇을 해야 하는지, 어떤 순서로 해야 하는지가 비교적 또렷할 수 있어요. 약속이나 규칙을 잘 지키고 정해진 방식대로 움직일 때 마음이 편할 수 있습니다. 다만 갑작스러운 변화나 예상과 다른 방식이 불편하게 느껴질 수 있어서 상황에 따라 방법을 조금 바꾸는 여유도 필요할 수 있어요.",q:"내가 꼭 지켜야 한다고 생각하는 기준 중, 조금 바꿔도 되는 것은 무엇인가요?",a:"오늘 계획 중 하나는 순서를 바꾸거나 다른 사람의 방식을 한번 따라보는 식으로 원래와 조금 다르게 해보세요."},
      s:{title:"내 생각과 기준이 비교적 또렷한 지금",desc:"지금은 내가 무엇을 중요하게 생각하는지, 어떤 기준으로 판단하는지가 비교적 분명할 수 있어요. 내 생각을 이유와 함께 설명하기도 하고, 관심 있는 분야에서는 나만의 기준이 뚜렷할 수 있습니다. 다만 내 생각이 분명한 만큼 다른 사람의 관점도 충분히 들어보고 있는지 살펴보면 좋아요.",q:"내 생각과 다른 의견에서 받아들일 수 있는 부분은 무엇인가요?",a:"오늘 누군가와 의견이 달랐다면 ‘저 사람의 말에서 맞는 부분은 뭐지?’를 하나만 찾아보세요."}
    },
    rare:{
      circle:{title:"사람들과 예전과 다른 방식으로 지내고 싶은 지금",desc:"예전에는 괜찮았던 관계나 모임이 요즘은 조금 피곤하거나 답답하게 느껴질 수 있어요. 많은 사람을 만나기보다 편한 몇 사람만 만나고 싶거나, 새로운 사람이나 새로운 관계 방식이 궁금해질 수도 있습니다. 지금은 관계를 끊기보다 나에게 맞는 거리와 방식을 다시 찾고 있는 시기일 수 있어요.",q:"지금 내 관계에서 줄이고 싶은 것과 늘리고 싶은 것은 무엇인가요?",a:"관계를 끊을지 말지를 정하기 전에 연락 횟수 줄이기, 싫은 부탁 한 번 거절하기처럼 거리나 방식을 작게 조절해보세요."},
      triangle:{title:"지금까지와 다른 길이 궁금해진 지금",desc:"예전에는 중요했던 목표가 요즘은 덜 끌리고, 새로운 방향이나 다른 일을 해보고 싶은 마음이 생길 수 있어요. 아이디어는 많지만 아직 현실적인 계획까지 이어지지는 않았을 수 있습니다. 지금은 새로운 가능성을 더 찾기보다 작게라도 한번 시험해보는 게 도움이 될 수 있어요.",q:"새롭게 해보고 싶은 것 중 실제로 가능한 것은 무엇인가요?",a:"떠오른 아이디어 하나를 고르고 이번 주에 할 수 있는 가장 작은 행동 하나를 정해보세요. 체험하기나 정보 문의 정도면 충분해요."},
      square:{title:"익숙한 생활을 조금 바꾸고 싶은 지금",desc:"그동안 해오던 방식이나 반복되는 생활이 요즘은 조금 답답하게 느껴질 수 있어요. 새로운 방법을 써보고 싶거나 다른 생활방식을 생각할 수 있지만, 익숙한 걸 바꾸는 건 불안하게 느껴질 수도 있습니다. 지금은 모든 걸 바꾸기보다 한 가지부터 다르게 해보는 게 도움이 될 수 있어요.",q:"내 생활에서 가장 먼저 바꾸고 싶은 한 가지는 무엇인가요?",a:"큰 변화를 만들기보다 하루 일정, 일하는 방식, 취미처럼 익숙한 일 하나만 조금 다르게 해보세요."},
      s:{title:"남들과 다른 새로운 생각이 떠오르는 지금",desc:"기존 방식보다 새로운 방법이나 다른 아이디어가 자꾸 떠오를 수 있어요. 남들이 그냥 지나가는 부분에서 새로운 가능성을 보거나, 익숙한 방식을 바꿔보고 싶을 수 있습니다. 생각은 흥미롭지만 아직 현실적인 방법까지 정리되지 않았을 수 있어서 작은 형태로 먼저 시험해보는 게 도움이 될 수 있어요.",q:"지금 떠오른 새로운 생각 중 실제로 한번 시험해볼 수 있는 것은 무엇인가요?",a:"아이디어 하나를 선택해서 간단한 시안, 샘플, 짧은 테스트처럼 아주 작은 형태로 만들어보세요."}
    }
  };

  const SECONDARY_TEXT = {
    circle:["사람과 관계","요즘은 일이나 계획 자체보다 사람과의 관계, 상대의 반응, 감정적인 부분이 더 신경 쓰일 수 있어요. 가까운 사람과 잘 지내고 싶은 마음이 커졌거나, 누군가와의 관계를 다시 생각하고 있을 수도 있습니다."],
    triangle:["목표와 앞으로의 방향","요즘은 앞으로 무엇을 할지, 어떤 결과를 만들지, 다음에는 어디로 가야 할지를 많이 생각하고 있을 수 있어요. 새로운 계획을 세우거나 미뤄둔 일을 시작하고 싶은 마음이 커질 수도 있습니다."],
    square:["해야 할 일과 현실적인 책임","요즘은 일, 생활, 약속, 가족이나 직장에서 내가 맡고 있는 역할이 마음을 많이 차지하고 있을 수 있어요. 지금 해야 할 일을 정리하고 생활을 안정적으로 유지하는 것이 중요하게 느껴질 수도 있습니다."],
    s:["생각과 이해","요즘은 어떤 일을 바로 결정하기보다 왜 그런지 이해하고 싶고 충분히 생각해보고 싶은 마음이 커질 수 있어요. 새로운 아이디어가 떠오르거나 혼자 정리할 시간이 필요할 수도 있습니다."]
  };

  const THIRD_TEXT = {
    circle:["사람과 연결되는 힘","혼자 해결하려고 하기보다 누군가와 이야기하고 도움을 주고받는 것이 지금의 나에게 도움이 될 수 있어요. 가까운 사람에게 내 마음을 말하거나 혼자 고민하던 일을 함께 나눠보세요."],
    triangle:["결정하고 움직이는 힘","생각만 오래 하기보다 목표를 하나 정하고 실제로 움직이는 것이 지금의 나에게 도움이 될 수 있어요. 아주 작은 일이라도 ‘오늘은 이것부터 해보자’ 하고 방향을 정해보세요."],
    square:["차근차근 정리하는 힘","복잡한 상황일수록 해야 할 일을 하나씩 정리하고 익숙한 생활 리듬을 되찾는 것이 도움이 될 수 있어요. 미뤄둔 것 하나를 끝내는 작은 정리가 마음의 안정으로 이어질 수 있습니다."],
    s:["생각을 정리하고 새로운 방법을 찾는 힘","바로 답을 내리기보다 잠시 멈춰 생각해보고 다른 방법은 없는지 살펴보는 것이 도움이 될 수 있어요. 글로 적거나 조용히 생각하는 시간을 가지면 놓친 부분이 보일 수도 있습니다."]
  };

  const FOURTH_TEXT = {
    circle:["사람과 마음을 나누는 힘","지금은 혼자 해결하거나 내 일에 집중하는 편일 수 있지만, 사람에게 마음을 열고 도움을 주고받는 힘도 활용해볼 수 있어요. 힘든 일을 혼자 참고 있기보다 가까운 사람에게 이야기해보세요."],
    triangle:["목표를 정하고 도전하는 힘","생각하거나 준비하는 데 익숙하다면 방향을 정하고 움직이는 힘은 아직 충분히 쓰지 않고 있을 수 있어요. 꼭 큰 목표가 아니어도 ‘이건 한번 해보자’ 하고 작은 결정을 내려보세요."],
    square:["꾸준히 이어가는 힘","새로운 생각이나 계획은 많지만 그것을 생활 속에서 꾸준히 이어가는 힘은 덜 쓰고 있을 수 있어요. 작은 규칙을 만들거나 한 가지 일을 일정하게 반복해보는 것이 도움이 될 수 있습니다."],
    s:["다르게 보고 새롭게 생각하는 힘","지금은 현실적인 일이나 해야 할 일에 집중하고 있더라도 다른 관점에서 생각하고 새로운 방법을 떠올리는 힘을 더 활용해볼 수 있어요. ‘다른 방법은 없을까?’를 한번 떠올려보세요."]
  };

  const state = {
    primary:null,
    sequence:[],
    currentIndex:0,
    currentStrokes:[],
    saved:[],
    isDrawing:false,
    currentStroke:null
  };

  function updateProgress(pct, label) {
    $("#progressBar").style.width = pct + "%";
    $("#progressText").textContent = pct + "%";
    $("#progressLabel").textContent = label;
  }

  function show(name, pct, label) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
    document.body.classList.toggle("draw-mode", name === "draw");
    updateProgress(pct, label);
    window.scrollTo({top:0,behavior:"auto"});
    if (name === "draw") {
      requestAnimationFrame(() => {
        resizeCanvas();
      });
    }
  }

  $("#startBtn").onclick = () => show("select", 20, "도형 선택");

  $("#backToIntroBtn").onclick = () => show("intro", 0, "시작 전");

  const SHAPE_SVG = {
    circle:`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="15"/></svg>`,
    triangle:`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M24 8 L40 38 H8 Z"/></svg>`,
    square:`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect x="9" y="9" width="30" height="30" rx="1"/></svg>`,
    s:`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M36 12 C31 8 17 8 13 15 C9 22 17 25 24 26 C31 27 39 30 35 37 C31 44 16 43 11 38"/></svg>`
  };

  const shapeIcon = key => `<span class="ui-shape" aria-hidden="true">${SHAPE_SVG[key]}</span>`;
  $("#brandShape").innerHTML = shapeIcon("circle");

  const shapeGrid = $("#shapeGrid");
  Object.entries(SHAPES).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.className = "shape-option";
    b.setAttribute("aria-label", v.name);
    b.innerHTML = `<span class="shape-glyph ui-shape">${SHAPE_SVG[key]}</span>`;
    b.addEventListener("click", () => {
      $$(".shape-option").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      state.primary = key;
      $("#toDrawBtn").disabled = false;
      $("#selectedHint").classList.add("on");
      $("#selectedHint").innerHTML = `<div class="selected-shape-row">${shapeIcon(key)}<span><strong>${v.name}</strong>을 골랐어요. 이 모양부터 그려볼게요.</span></div>`;
    });
    shapeGrid.appendChild(b);
  });

  $("#toDrawBtn").onclick = () => {
    const others = Object.keys(SHAPES).filter(x => x !== state.primary);
    state.sequence = [state.primary, state.primary, state.primary, ...others];
    state.currentIndex = 0;
    state.currentStrokes = [];
    state.saved = [];
    show("draw", 40, "도형 그리기");
    resizeCanvas();
    renderDrawUI();
    redraw();
  };

  const canvas = $("#drawCanvas");
  const ctx = canvas.getContext("2d");
  const wrap = $("#canvasWrap");

  function resizeCanvas() {
    const r = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    redraw();
  }
  window.addEventListener("resize", resizeCanvas);

  function pointFromEvent(e) {
    const r = canvas.getBoundingClientRect();
    return {x:e.clientX-r.left, y:e.clientY-r.top};
  }

  canvas.addEventListener("pointerdown", e => {
    if (state.currentIndex >= state.sequence.length) return;

    // 한 단계에서는 도형 하나만 허용합니다.
    // 이미 그린 상태에서 다시 그리기 시작하면, 현재 단계의 이전 그림만 자동으로 지웁니다.
    if (!state.isDrawing && state.currentStrokes.flat().length) {
      state.currentStrokes = [];
      redraw();
    }

    state.isDrawing = true;
    canvas.setPointerCapture(e.pointerId);
    const p = pointFromEvent(e);
    state.currentStroke = [p];
    state.currentStrokes.push(state.currentStroke);
    redraw();
    syncSaveBtn();
  });

  canvas.addEventListener("pointermove", e => {
    if (!state.isDrawing) return;
    state.currentStroke.push(pointFromEvent(e));
    redraw();
  });

  function endDraw() {
    state.isDrawing = false;
    state.currentStroke = null;
    syncSaveBtn();
  }
  canvas.addEventListener("pointerup", endDraw);
  canvas.addEventListener("pointercancel", endDraw);

  function drawStroke(stroke) {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i=1;i<stroke.length;i++) ctx.lineTo(stroke[i].x, stroke[i].y);
    ctx.stroke();
  }

  function redraw() {
    const r = wrap.getBoundingClientRect();
    ctx.clearRect(0,0,r.width,r.height);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#26322d";
    [...state.saved.map(x => x.strokes), state.currentStrokes].forEach(group => group.forEach(drawStroke));
  }

  function syncSaveBtn() {
    $("#saveBtn").disabled = !state.currentStrokes.flat().length;
  }


  $("#restartBtn").onclick = () => {
    if (confirm("처음부터 다시 시작할까요?")) {
      state.currentIndex = 0;
      state.saved = [];
      state.currentStrokes = [];
      renderDrawUI();
      redraw();
      syncSaveBtn();
    }
  };

  function getMetrics(strokes) {
    const pts = strokes.flat();
    const r = wrap.getBoundingClientRect();
    if (!pts.length) return null;
    const xs = pts.map(p=>p.x), ys = pts.map(p=>p.y);
    const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys);
    const w=maxX-minX, h=maxY-minY;
    return {
      minX,minY,maxX,maxY,w,h,
      cx:(minX+maxX)/2, cy:(minY+maxY)/2,
      nx:((minX+maxX)/2)/r.width,
      ny:((minY+maxY)/2)/r.height,
      nw:w/r.width, nh:h/r.height,
      size:Math.max(w/r.width,h/r.height)
    };
  }

  $("#saveBtn").onclick = () => {
    if (!state.currentStrokes.flat().length) {
      alert("먼저 도형을 그려주세요.");
      return;
    }
    const m = getMetrics(state.currentStrokes);
    if (Math.max(m.w,m.h) < 18) {
      alert("도형을 조금 더 크게 그려주세요.");
      return;
    }

    state.saved.push({
      shape: state.sequence[state.currentIndex],
      strokes: JSON.parse(JSON.stringify(state.currentStrokes)),
      metrics: m
    });

    state.currentStrokes = [];
    state.currentIndex++;

    if (state.currentIndex >= state.sequence.length) {
      show("loading", 85, "결과 분석 중");
      setTimeout(() => {
        buildResult();
        show("result", 100, "결과 확인");
      }, 900);
    } else {
      renderDrawUI();
      redraw();
      syncSaveBtn();
    }
  };

  function renderDrawUI() {
    const key = state.sequence[state.currentIndex];
    const total = state.sequence.length;
    const current = state.currentIndex + 1;
    const chosenPhase = state.currentIndex < 3;
    const chosenCount = state.currentIndex + 1;
    const overallPct = 40 + Math.round((state.currentIndex / total) * 40);

    updateProgress(overallPct, "도형 그리기");
    $("#phaseBadge").textContent = `${current} / ${total}`;

    if (chosenPhase) {
      const wording = chosenCount === 1 ? "하나" : chosenCount === 2 ? "한 번 더" : "마지막으로 하나 더";
      $("#missionMain").innerHTML = `${shapeIcon(key)}<span>를 ${wording} 그려주세요</span>`;
      $("#missionSub").textContent = chosenCount === 1
        ? "크기와 위치는 마음 가는 대로 자유롭게 그려주세요."
        : "앞에서 그린 모양과 겹쳐도, 떨어져 있어도 괜찮아요.";
    } else {
      $("#missionMain").innerHTML = `${shapeIcon(key)}<span>를 하나 그려주세요</span>`;
      $("#missionSub").textContent = "지금 마음 가는 위치에 자유롭게 그려주세요.";
    }

    $("#currentStepTitle").textContent = `전체 진행 ${current} / ${total}`;
    $("#currentStepDesc").textContent = "도형을 다 그렸다면 ‘다음’을 눌러주세요.";

    const list = $("#miniList");
    list.innerHTML = "";
    state.sequence.forEach((k, i) => {
      const d = document.createElement("div");
      let cls = "mini-item";
      if (i < state.currentIndex) cls += " done";
      if (i === state.currentIndex) cls += " now";
      d.className = cls;
      d.innerHTML = `<strong><span>${i+1}.</span>${shapeIcon(k)}<span>${SHAPES[k].name}</span></strong>`;
      list.appendChild(d);
    });
  }

  function bboxOverlap(a,b){
    const ix=Math.max(0,Math.min(a.maxX,b.maxX)-Math.max(a.minX,b.minX));
    const iy=Math.max(0,Math.min(a.maxY,b.maxY)-Math.max(a.minY,b.minY));
    const inter=ix*iy;
    const areaA=Math.max(1,a.w*a.h), areaB=Math.max(1,b.w*b.h);
    return inter/Math.min(areaA,areaB);
  }
  function centerDistRatio(a,b){
    const d=Math.hypot(a.cx-b.cx,a.cy-b.cy);
    const avgDiameter=((Math.max(a.w,a.h)+Math.max(b.w,b.h))/2)||1;
    return d/avgDiameter;
  }
  function contains(outer,inner){
    return inner.minX>=outer.minX && inner.maxX<=outer.maxX && inner.minY>=outer.minY && inner.maxY<=outer.maxY;
  }

  function classifyPattern(primaryItems){
    const m=primaryItems.map(x=>x.metrics);
    const pairs=[[0,1],[0,2],[1,2]].map(([i,j])=>({
      d:centerDistRatio(m[i],m[j]),
      o:bboxOverlap(m[i],m[j])
    }));
    const avgD=pairs.reduce((s,x)=>s+x.d,0)/3;
    const sizeVals=m.map(x=>Math.max(x.w,x.h));
    const sizeSpread=(Math.max(...sizeVals)-Math.min(...sizeVals))/Math.max(...sizeVals);
    const nestedCount=[[0,1],[0,2],[1,2]].filter(([i,j])=>contains(m[i],m[j])||contains(m[j],m[i])).length;

    if(avgD<0.18 && sizeSpread<0.18) return "align";
    if(avgD<0.35 && sizeSpread>=0.18 && nestedCount>=2) return "immerse";
    if(pairs.filter(x=>x.o>=0.20).length>=2) return "overlap";
    if(avgD<1.05 && (pairs.filter(x=>x.o>0).length>=1 || avgD<0.8)) return "attach";
    if(pairs.every(x=>x.d>1.0 && x.o===0)) return "separate";
    return "rare";
  }

  function zone(m){
    const col=m.nx<1/3 ? 0 : m.nx<2/3 ? 1 : 2;
    const row=m.ny<1/3 ? 0 : m.ny<2/3 ? 1 : 2;
    const map=[[4,2,1],[7,5,3],[9,8,6]];
    return map[row][col];
  }

  function rankedNonPrimary(nonPrimary){
    return [...nonPrimary].sort((a,b)=>{
      const za=zone(a.metrics), zb=zone(b.metrics);
      if(za!==zb) return za-zb;
      if(Math.abs(a.metrics.size-b.metrics.size)>.01) return b.metrics.size-a.metrics.size;
      if(Math.abs(a.metrics.ny-b.metrics.ny)>.01) return a.metrics.ny-b.metrics.ny;
      return b.metrics.nx-a.metrics.nx;
    });
  }

  const SIGNAL_SHAPE = {
    circle:{
      burden:"사람이나 관계에서 평소보다 신경 쓰이는 일이 있는지 돌아보세요.",
      center:"사람과 어울리고 관계를 이어가는 힘을 비교적 자연스럽게 쓰고 있을 수 있어요.",
      large:"사람과 관계가 지금 내 삶에서 큰 비중을 차지하고 있을 수 있어요."
    },
    triangle:{
      burden:"목표나 앞으로 해야 할 일 때문에 마음이 급하거나 부담스럽지는 않은지 돌아보세요.",
      center:"방향을 정하고 움직이는 힘을 비교적 자연스럽게 쓰고 있을 수 있어요.",
      large:"목표나 앞으로의 계획이 지금 마음에서 크게 자리 잡고 있을 수 있어요."
    },
    square:{
      burden:"책임이나 현실적으로 챙겨야 할 일이 너무 많지는 않은지 돌아보세요.",
      center:"책임을 지고 꾸준히 해내는 힘을 비교적 자연스럽게 쓰고 있을 수 있어요.",
      large:"책임이나 해야 할 일을 비교적 적극적으로 감당하고 있을 수 있어요."
    },
    s:{
      burden:"생각이나 고민을 혼자 너무 오래 붙잡고 있지는 않은지 돌아보세요.",
      center:"",
      large:"생각하고 이해하고 아이디어를 내는 힘을 많이 사용하고 있을 수 있어요."
    }
  };

  function signal(){
    const all=state.saved;
    const nonPrimary=all.slice(3);
    const messages=[];

    const burden=nonPrimary.find(x=>zone(x.metrics)===7);
    if(burden){
      messages.push(`요즘 조금 부담스럽게 느껴지는 부분이 있을 수 있어요. ${SIGNAL_SHAPE[burden.shape].burden}`);
    }

    const centered=nonPrimary.find(x=>zone(x.metrics)===5 && x.shape!=="s");
    if(centered && messages.length<2){
      messages.push(`지금 비교적 가까이 쓰고 있는 힘이 보여요. ${SIGNAL_SHAPE[centered.shape].center}`);
    }

    const avgSize=all.reduce((s,x)=>s+x.metrics.size,0)/all.length;
    const large=[...all].sort((a,b)=>b.metrics.size-a.metrics.size).find(x=>x.metrics.size>avgSize*1.25);
    if(large && messages.length<2){
      messages.push(`${SIGNAL_SHAPE[large.shape].large} 이것이 힘이 되고 있는지, 반대로 부담이 되고 있는지도 함께 살펴보세요.`);
    }

    if(!messages.length){
      return "이번 그림에서는 특정 위치나 크기가 강하게 두드러지기보다 전체 흐름이 비교적 고르게 나타났어요. 한 가지 신호만으로 의미를 정하기보다, 위의 결과를 지금의 생활과 연결해 천천히 살펴보세요.";
    }
    return messages.join(" ");
  }


  const COMFORT = {
    separate:{
      circle:"말하지 못한 마음도 있었구나. 혼자 오래 담아두느라 애썼겠다.",
      triangle:"아직 시작 전이지만 마음속에서는 참 많이 준비했구나.",
      square:"조금 천천히 움직여도 괜찮아. 너만의 속도가 있는 거니까.",
      s:"꺼내지 못한 생각을 오래 품고 있었구나. 혼자 많이 생각했겠다."
    },
    overlap:{
      circle:"마음이 여러 갈래로 엉켜 있었구나. 많이 복잡했겠다.",
      triangle:"하고 싶은 게 정말 많구나. 마음속 에너지가 가득한가 봐.",
      square:"참 많은 걸 챙겨왔구나. 정말 고생 많았어.",
      s:"머릿속이 참 쉴 틈이 없었구나. 많이 지쳤겠다."
    },
    immerse:{
      circle:"그 사람에게 마음을 참 많이 썼구나. 그만큼 진심이었나 봐.",
      triangle:"정말 열심히 달려왔구나. 여기까지 온 것도 대단해.",
      square:"끝까지 놓지 않고 버텨왔구나. 참 애썼다.",
      s:"쉽게 지나치지 않고 오래 바라봤구나. 참 깊이 생각하는 사람이네."
    },
    attach:{
      circle:"참 많이 살피고 있었구나. 신경 쓰느라 마음이 바빴겠다.",
      triangle:"쉽게 정하지 못한 만큼 많이 고민했구나. 그만큼 소중한 선택이었나 봐.",
      square:"잘해내고 싶어서 여러 번 살펴봤구나. 마음을 많이 썼겠다.",
      s:"하나라도 놓치지 않으려고 참 많이 들여다봤구나."
    },
    align:{
      circle:"내 마음이 원하는 관계를 잘 알고 있구나. 그 마음이 참 단단해 보여.",
      triangle:"내가 어디로 가고 싶은지 잘 알고 있구나. 참 든든해 보여.",
      square:"하루하루 묵묵히 잘 지켜왔구나. 그 꾸준함이 참 든든해.",
      s:"내 생각을 이렇게 잘 알고 있구나. 마음속 기준이 참 또렷하네."
    },
    rare:{
      circle:"이제는 조금 다르게 지내고 싶은 거구나. 마음도 변할 수 있어.",
      triangle:"새로운 길이 자꾸 눈에 들어오는구나. 마음이 다시 움직이고 있나 봐.",
      square:"매일 같은 방식이 조금 답답했구나. 마음에도 새로운 바람이 필요한가 봐.",
      s:"다른 방법을 계속 떠올리고 있었구나. 새로운 걸 보는 눈이 있네."
    }
  };

  const CHARACTER_COLORS = {
    circle:{fill:"#F7C9C6",soft:"#FFF0ED",line:"#5B302A",accent:"#E98179"},
    triangle:{fill:"#F7D88B",soft:"#FFF6D9",line:"#5A3B20",accent:"#D99B2B"},
    square:{fill:"#D5E2C8",soft:"#F0F5EA",line:"#42513B",accent:"#7E9A68"},
    s:{fill:"#C9DDF0",soft:"#EEF5FB",line:"#31475B",accent:"#6C97BD"}
  };

  function characterSvg(shape, pattern, small=false){
    const c=CHARACTER_COLORS[shape];
    const size=small?112:210;
    const cheeks=`<circle cx="69" cy="66" r="5" fill="${c.accent}" opacity=".24"/><circle cx="111" cy="66" r="5" fill="${c.accent}" opacity=".24"/>`;
    const face=`<circle cx="78" cy="59" r="3.4" fill="${c.line}"/><circle cx="102" cy="59" r="3.4" fill="${c.line}"/><path d="M82 70 Q90 78 98 70" fill="none" stroke="${c.line}" stroke-width="3" stroke-linecap="round"/>${cheeks}`;
    const heart=`<path d="M90 101 C82 92 67 96 69 108 C71 118 90 128 90 128 C90 128 109 118 111 108 C113 96 98 92 90 101Z" fill="${c.accent}" stroke="${c.line}" stroke-width="2.6"/>`;
    const arms=`<path d="M61 103 Q73 116 82 109 M119 103 Q107 116 98 109" fill="none" stroke="${c.line}" stroke-width="3" stroke-linecap="round"/>`;
    const feet=`<path d="M73 137 Q67 143 60 140 M107 137 Q113 143 120 140" fill="none" stroke="${c.line}" stroke-width="3" stroke-linecap="round"/>`;
    let body="";
    if(shape==="circle") body=`<circle cx="90" cy="82" r="57" fill="${c.fill}" stroke="${c.line}" stroke-width="4"/>`;
    if(shape==="triangle") body=`<path d="M90 23 L147 126 Q149 131 143 131 H37 Q31 131 34 125 L84 25 Q87 19 90 23Z" fill="${c.fill}" stroke="${c.line}" stroke-width="4" stroke-linejoin="round"/>`;
    if(shape==="square") body=`<rect x="36" y="29" width="108" height="108" rx="13" fill="${c.fill}" stroke="${c.line}" stroke-width="4"/>`;
    if(shape==="s") body=`<path d="M123 31 C104 18 65 21 55 42 C46 61 61 75 83 78 C106 81 128 86 123 105 C118 125 79 135 55 119 C42 110 42 92 56 85 C66 80 78 85 79 95 C79 104 69 110 61 105" fill="${c.fill}" stroke="${c.line}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    const sparkle = pattern==="align" || pattern==="rare" ? `<path d="M145 40 l4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" fill="${c.accent}" opacity=".8"/>` : `<path d="M145 45 q10 5 12 15" fill="none" stroke="${c.accent}" stroke-width="3" stroke-linecap="round" opacity=".65"/>`;
    return `<svg class="result-character-svg" width="${size}" height="${size}" viewBox="0 0 180 160" role="img" aria-label="${FREE_THEME[shape]} 캐릭터">${sparkle}${body}${face}${arms}${heart}${feet}</svg>`;
  }

  function buildResult(){
    const primaryItems=state.saved.slice(0,3);
    const pattern=classifyPattern(primaryItems);
    const primary=state.primary;
    const c=CONTENT[pattern][primary];

    $("#resultCharacter").innerHTML=characterSvg(primary, pattern, false);
    $("#comfortCharacter").innerHTML=characterSvg(primary, pattern, true);
    $("#resultShapeLine").textContent=FREE_THEME[primary];
    $("#resultTitle").textContent=FREE_TYPE_NAME[pattern][primary];
    $("#resultDesc").textContent=shortFreeDesc(c.desc);
    $("#resultMind").textContent=currentMindDesc(c.desc);
    $("#comfortMessage").textContent=COMFORT[pattern][primary];

    const chips=$("#resultChips");
    chips.innerHTML="";
    FREE_KEYWORDS[pattern][primary].forEach(word=>{
      const span=document.createElement("span");
      span.className="free-result-chip";
      span.textContent=word;
      chips.appendChild(span);
    });
  }

  $("#detailBtn").onclick = () => {
    alert("상세결과는 유료 버전에서 연결할 예정이에요.");
  };

  $("#retryBtn").onclick = () => {
    state.primary = null;
    state.sequence = [];
    state.currentIndex = 0;
    state.currentStrokes = [];
    state.saved = [];
    state.isDrawing = false;
    state.currentStroke = null;
    $("#selectedHint").classList.remove("on");
    $("#selectedHint").innerHTML = "";
    $$(".shape-option").forEach(x => x.classList.remove("selected"));
    $("#toDrawBtn").disabled = true;
    syncSaveBtn();
    show("intro", 0, "시작 전");
  };
})();
