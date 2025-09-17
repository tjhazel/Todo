using TodoCore.Domain.Models;

namespace TodoCore.Domain.DataAccess;

/// <summary>
/// class used to create demo data.  
/// </summary>
public static class SeedData
{
   public static TodoItem[] GetSeedTodoList()
   {
      List<TodoItem> todoList = new();
      for (int i = 0; i < _sampleTasks.Length; i++)
      {
         todoList.Add(GetTodo(i, _sampleTasks[i]));
      }
      return todoList.ToArray();
   }

   static TodoItem GetTodo(int index, string title)
   {
      var createdOn = DateTime.UtcNow.AddHours(-index).AddMinutes(-index);
      bool isComplete = index % 5 == 0; //every 5th is complete

      return new TodoItem
      {
         Id = index,
         Title = title,
         CreatedOn = createdOn,
         IsComplete = isComplete,
         CompletedOn = isComplete ? createdOn.AddMinutes(5) : null
      };
   }

   static string[] _sampleTasks = [
      "Do something nice for someone you care about",
      "Memorize a poem",
      "Watch a classic movie",
      "Watch a documentary",
      "Invest in cryptocurrency",
      "Contribute code or a monetary donation to an open-source software project",
      "Solve a Rubik's cube",
      "Bake pastries for yourself and neighbor",
      "Go see a Broadway production",
      "Write a thank you letter to an influential person in your life",
      "Invite some friends over for a game night",
      "Have a football scrimmage with some friends",
      "Text a friend you haven't talked to in a long time",
      "Organize pantry",
      "Buy a new house decoration",
      "Plan a vacation you've always wanted to take",
      "Clean out car",
      "Draw and color a Mandala",
      "Create a cookbook with favorite recipes",
      "Bake a pie with some friends",
      "Create a compost pile",
      "Take a hike at a local park",
      "Take a class at local community center that interests you",
      "Research a topic interested in",
      "Plan a trip to another country",
      "Improve touch typing",
      "Learn Express.js",
      "Learn calligraphy",
      "Have a photo session with some friends",
      "Go to the gym",
      "Make own LEGO creation",
      "Take cat on a walk",
      "Find a charity and donate to it",
      "Donate to local food bank",
      "Uninstall unused apps from devices",
      "Write a handwritten letter to somebody",
      "Fill out a basketball bracket",
      "Do yoga",
      "Make a scrapbook with pictures of favorite memories",
      "Have a bonfire with close friends",
      "Go for a run",
      "Host a movie marathon with some friends",
      "Go see a movie in theaters with a few friends",
      "Wash car",
      "Patronize a local independent restaurant",
      "Watch a Khan Academy lecture on a subject of choosing",
      "Learn Javascript",
      "Volunteer at a local animal shelter",
      "Volunteer at local food pantry",
      "Start a book you've never gotten around to reading",
      "Mow neighbor's lawn",
      "Start a band",
      "Organize music collection",
      "Organize a cluttered drawer",
      "Learn a new recipe",
      "Start a daily journal",
      "Clean out closet and donate the clothes you've outgrown",
      "Go on a fishing trip with some friends",
      "Learn Morse code",
      "Listen to a new podcast",
      "Color",
      "Take dog on a walk",
      "Start a blog for something I'm passionate about",
      "Listen to a new music genre",
      "Learn how to write in shorthand",
      "Practice coding in favorite language",
      "Read a formal research paper on an interesting subject",
      "Learn how to whistle with fingers",
      "Make a couch fort",
      "Take a caffeine nap",
      "Find a DIY to do",
      "Go to a concert with some friends",
      "Give pet ten minutes of focused attention",
      "Rearrange and organize room",
      "Learn how to play a new sport",
      "Make homemade ice cream",
      "Hold a yard sale",
      "Learn to play a new instrument",
      "Resolve a problem you've been putting off",
      "Bake something you've never tried before",
      "Organize dresser",
      "Fix something that's broken in house",
      "Play a video game",
      "Listen to music you haven't heard in a while",
      "Look at finances and find one way to save money",
      "Learn the periodic table",
      "Make a budget",
      "Donate blood at a local blood center",
      "Go to the library and find an interesting book",
      "Configure two-factor authentication on accounts",
      "Take a nap",
      "Create or update resume",
      "Prepare a 72-hour kit",
      "Go on a long drive with no music",
      "Learn the NATO phonetic alphabet",
      "Have a jam session with friends",
      "Hold a video game tournament with some friends",
      "Catch up on world news",
      "Do a jigsaw puzzle",
      "Learn about the Golden Ratio"
      ];
}
