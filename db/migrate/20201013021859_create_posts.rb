class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content #tに続くのがカラムの形形
      t.boolean :checked
      t.timestamps
    end
  end
end
